import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 max-w-2xl text-display-md text-ink">
        That page doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 max-w-xl text-body-lg text-ink-subtle">
        The link may be out of date, or I may have moved something. The work and
        the contact form are both on the home page.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/projects/forgeroom" variant="secondary">
          Read the ForgeRoom case study
        </ButtonLink>
      </div>
    </Container>
  );
}
