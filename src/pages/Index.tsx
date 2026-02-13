import HeroSection from "@/components/landing/HeroSection";
import LogoCloudSection from "@/components/landing/LogoCloudSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PersonaSection from "@/components/landing/PersonaSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TrustSection from "@/components/landing/TrustSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import ScrollToTop from "@/components/landing/ScrollToTop";

const Divider = () => (
  <div className="max-w-5xl mx-auto px-4">
    <div className="glow-line opacity-40" />
  </div>
);

const Index = () => (
  <main>
    <HeroSection />
    <LogoCloudSection />
    <Divider />
    <ProblemSection />
    <Divider />
    <SolutionSection />
    <Divider />
    <FeaturesSection />
    <PersonaSection />
    <Divider />
    <HowItWorksSection />
    <Divider />
    <TrustSection />
    <Divider />
    <PricingSection />
    <Divider />
    <FAQSection />
    <CTASection />
    <Footer />
    <ScrollToTop />
  </main>
);

export default Index;
