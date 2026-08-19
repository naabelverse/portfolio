import {
  Background,
  ContactSection,
  FeaturedProject,
  Hero,
  OtherWork,
  ProofStrip,
  Skills,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <FeaturedProject />
      <OtherWork />
      <Skills />
      <Background />
      <ContactSection />
    </>
  );
}
