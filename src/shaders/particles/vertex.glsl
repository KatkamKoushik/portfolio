// Hero Particle System — Vertex Shader
// Drives instanced particles with noise-based motion, pointer interaction, and theme morphing

uniform float uTime;
uniform float uThemeProgress;
uniform float uScrollVelocity;
uniform vec2 uPointer;
uniform float uPointerSpeed;
uniform float uDPR;
uniform sampler2D uTextMask;
uniform vec2 uResolution;
uniform float uTextActive;

attribute vec3 aOffset;        // Instance offset position
attribute float aScale;        // Instance scale
attribute float aSpeed;        // Instance animation speed multiplier
attribute float aPhase;        // Instance phase offset for variation

varying float vAlpha;
varying float vTheme;
varying vec3 vWorldPosition;
varying float vDepth;
varying float vMaskIntensity;

// Inline simplex noise (simplified 2D for performance)
vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permutev3(vec3 x) { return mod289v3(((x * 34.0) + 10.0) * x); }

float snoise2d(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permutev3(permutev3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec3 pos = aOffset;
  float t = uTime * aSpeed + aPhase;

  // === NOISE-BASED MOTION ===
  // Reduce background noise slightly when text is very active to give text center stage
  float activeFactor = 1.0 - (uTextActive * 0.3);
  float noiseX = snoise2d(vec2(pos.x * 0.3 + t * 0.2, pos.y * 0.3)) * activeFactor;
  float noiseY = snoise2d(vec2(pos.y * 0.3 + t * 0.15, pos.z * 0.3)) * activeFactor;
  float noiseZ = snoise2d(vec2(pos.z * 0.3, pos.x * 0.3 + t * 0.1)) * activeFactor;

  // Motion amplitude increases in project mode (uThemeProgress > 0.8)
  float motionAmp = mix(0.3, 0.6, smoothstep(0.8, 1.2, uThemeProgress));
  pos += vec3(noiseX, noiseY, noiseZ) * motionAmp;

  // === SCROLL VELOCITY RESPONSE ===
  float scrollInfluence = uScrollVelocity * 0.02;
  // Scatter particles when scrolling fast
  float scatter = abs(uScrollVelocity) * 0.015;
  pos.x += snoise2d(vec2(pos.y, t)) * scatter;
  pos.y += snoise2d(vec2(pos.z, t)) * scatter + scrollInfluence;
  pos.z += snoise2d(vec2(pos.x, t)) * scatter;

  // === POINTER INTERACTION ===
  vec3 pointerPos = vec3(uPointer.x * 3.0, uPointer.y * 3.0, 0.0);
  vec3 toPointer = pos - pointerPos;
  float dist = length(toPointer);
  float pointerForce = smoothstep(2.5, 0.0, dist) * (0.8 + uPointerSpeed * 0.5);

  // In Hero (0.0): repel. In Projects (>1.0): gentle attract/orbit
  float repelOrAttract = mix(-1.0, 0.3, smoothstep(0.0, 1.2, uThemeProgress));
  pos += normalize(toPointer + 0.001) * pointerForce * repelOrAttract;

  // Snap to grid in Hero, flow freely in Projects
  float gridSnap = mix(0.3, 0.0, smoothstep(0.0, 1.0, uThemeProgress));
  pos = mix(pos, round(pos * 3.0) / 3.0, gridSnap);

  // === SCALE ===
  float scale = aScale;
  // Smaller in Luxury, varied in Future
  scale *= mix(1.0, mix(0.6, 1.2 + sin(t * 2.0) * 0.3, smoothstep(1.0, 2.0, uThemeProgress)),
               smoothstep(0.0, 1.0, uThemeProgress));

  // Distance-based fade
  float depthFade = smoothstep(8.0, 3.0, length(pos));
  vAlpha = depthFade * mix(0.8, 1.2, smoothstep(0.0, 1.2, uThemeProgress));

  vTheme = uThemeProgress;
  vWorldPosition = pos;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;

  // Calculate screen space UV coordinates (0 to 1)
  vec2 ndc = gl_Position.xy / gl_Position.w;
  vec2 screenUv = ndc * 0.5 + 0.5;

  // Sample the text mask texture
  float mask = 0.0;
  if (screenUv.x >= 0.0 && screenUv.x <= 1.0 && screenUv.y >= 0.0 && screenUv.y <= 1.0) {
    mask = texture2D(uTextMask, screenUv).r;
  }
  vMaskIntensity = mask;

  // Massively increase point size for the macro bokeh effect
  gl_PointSize = scale * uDPR * (1500.0 / -mvPosition.z);
  
  // Swell the particles slightly when they are over the light source (text)
  gl_PointSize += mask * 50.0 * uDPR;
}
