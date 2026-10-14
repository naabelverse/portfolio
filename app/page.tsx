import {
  ContactSection,
  Experience,
  FeaturedProjects,
  Hero,
  Skills,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Skills />
      <Experience />
      <ContactSection />
    </>
  );
}
