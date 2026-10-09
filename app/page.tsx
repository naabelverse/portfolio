import {
  Background,
  ContactSection,
  FeaturedProjects,
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
      <FeaturedProjects />
      <OtherWork />
      <Skills />
      <Background />
      <ContactSection />
    </>
  );
}
