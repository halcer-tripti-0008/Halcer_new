import { Clients } from "@/components/Clients";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { PageEffects } from "@/components/PageEffects";
import { Testimonials } from "@/components/Testimonials";
import { Who } from "@/components/Who";
import { WhyHalcer } from "@/components/WhyHalcer";
import { Work } from "@/components/Work";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Who />
        <Clients />
        <Work />
        <Testimonials />
        <WhyHalcer />
        <Industries />
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
