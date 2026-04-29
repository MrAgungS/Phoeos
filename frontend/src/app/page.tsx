import { FeaturesGrid, HeroSection, HowItWorks, NavBar, QuoteBlock, SectionDivider, SiteFooter, StatsBar } from "@/components/landing";

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <NavBar />
      <HeroSection />
      <StatsBar />
      <FeaturesGrid />
      <SectionDivider label="how it works" />
      <HowItWorks />
      <QuoteBlock
        quote="I'm just experimenting with how cloud-based storage works — and maybe you can use it too."
        attribution="Selphos, 2026"
      />
      <SiteFooter />
    </main>
  );
}
