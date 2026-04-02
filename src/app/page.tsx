import { Navbar } from "@/components/home/navbar";
import { Hero } from "@/components/home/hero";
import { TrustStats } from "@/components/home/trust-stats";
import { CorporateSpecialty } from "@/components/home/corporate-specialty";
import { Services } from "@/components/home/services";
import { RetailInsurance } from "@/components/home/retail-insurance";
import { Industry } from "@/components/home/industry";
import { WhyChoose } from "@/components/home/why-choose";
import { PartnersSlider } from "@/components/home/partners-slider";
import { BlogSection } from "@/components/home/blog-section";
import { CtaSection } from "@/components/home/cta-section";
import { Footer } from "@/components/home/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CorporateSpecialty />
        <TrustStats />
        <Services />
        <RetailInsurance />
        <Industry />
        <WhyChoose />
        <PartnersSlider />
        <BlogSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
