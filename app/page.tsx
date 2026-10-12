import {
  ContactSection,
  Experience,
  FeaturedProjects,
  Hero,
  OtherWork,
  Skills,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <OtherWork />
      <Skills />
      <Experience />
      <ContactSection />
    </>
  );
}
