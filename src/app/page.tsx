import AppProviders from "@/components/AppProviders";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/sections/WorkSection";
import ExperimentsSection from "@/components/sections/ExperimentsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Scene from "@/scenes/Scene";

export default function Home() {
  return (
    <AppProviders>
      {/* WebGL Layer — fixed behind DOM */}
      <Scene />

      {/* DOM Content Layer */}
      <div className="content-layer">
        <Header />
        <main id="main-content">
          <HeroSection />
          <WorkSection />
          <ExperimentsSection />
          <AboutSection />
          <ContactSection />
        </main>
      </div>
    </AppProviders>
  );
}
