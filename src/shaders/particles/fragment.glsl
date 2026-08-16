// Hero Particle System — Fragment Shader
// Theme-driven coloring: Brutalist(white) → Luxury(gold) → Future(cyan/violet)

uniform float uThemeProgress;
uniform vec3 uProjectColor;
uniform float uProjectMode;
uniform float uGlobalOpacity;

varying float vAlpha;
varying float vTheme;
varying vec3 vWorldPosition;
varying float vDepth;
varying float vMaskIntensity;

void main() {
  // Extreme soft gaussian-like bokeh shape
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  // Gaussian-like falloff for blown-out macro lens look
  float softEdge = exp(-dist * dist * 15.0);
  // Give it a subtle hard edge ring at the very boundary like real bokeh
  float ring = smoothstep(0.4, 0.45, dist) * smoothstep(0.5, 0.45, dist) * 0.2;
  softEdge += ring;

  // === THEME-DRIVEN COLOR ===
  // Hero: signature burnt-orange accent (#e94d31) mixed with white
  vec3 colorHero = mix(
    vec3(1.0, 0.9, 0.8),       // Warm white core
    vec3(0.914, 0.302, 0.192), // Burnt orange
    smoothstep(-1.0, 2.0, vWorldPosition.x + vWorldPosition.y)
  );

  // Dynamic project color based on world position (simulating atmosphere)
  vec3 projectAtmosphere = mix(
    uProjectColor + vec3(0.2), // Bright core
    uProjectColor * 0.5,       // Deep shadows
    smoothstep(-2.0, 2.0, vWorldPosition.y - vWorldPosition.x)
  );

  // Blend from Hero to Project Worlds
  vec3 color = mix(colorHero, projectAtmosphere, uProjectMode);

  // Depth-based glow for Project mode
  float glow = 0.0;
  if (uProjectMode > 0.0) {
    glow = uProjectMode * softEdge * 0.3;
  }

  float alpha = vAlpha * softEdge * 1.5; // Boost overall opacity for the blown-out look
  // Increase opacity in project mode slightly for better background presence
  alpha = mix(alpha, alpha * 1.2, uProjectMode);
  
  // Fade out globally for the 'quiet' contact conclusion
  alpha *= uGlobalOpacity;

  // --- TYPOGRAPHY AS LIGHT ---
  // The typography mask dramatically boosts opacity and pushes color towards bright white.
  // This makes particles look like they are illuminated by or emitting from the text.
  float maskGlow = vMaskIntensity * 2.5; // Powerful boost multiplier
  
  // Mix color towards a very bright core if inside the text mask
  vec3 finalColor = color + glow;
  finalColor = mix(finalColor, vec3(1.0, 0.95, 0.9), vMaskIntensity * 0.85);
  
  // Boost alpha based on mask intensity, but cap at 1.0
  float finalAlpha = min(1.0, alpha + (maskGlow * softEdge * 2.0));

  gl_FragColor = vec4(finalColor, finalAlpha);
}
