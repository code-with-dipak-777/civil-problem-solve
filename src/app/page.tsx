import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ImpactStats } from "@/components/landing/ImpactStats";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { AIAutoMerge } from "@/components/landing/AIAutoMerge";
import { IssueTrackingSection } from "@/components/landing/IssueTrackingSection";
import { DistrictStatsPreviewSection } from "@/components/landing/DistrictStatsPreviewSection";
import { CivicMapPreviewSection } from "@/components/landing/CivicMapPreviewSection";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#03111F] text-white selection:bg-primary/30 relative overflow-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Navbar */}
      <LandingNavbar />

      <main className="relative z-10">
        <HeroSection />
        <ImpactStats />
        <HowItWorks />
        <FeatureGrid />
        <AIAutoMerge />
        <IssueTrackingSection />
        <DistrictStatsPreviewSection />
        <CivicMapPreviewSection />
        <CommunitySection />
        <FinalCTA />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
