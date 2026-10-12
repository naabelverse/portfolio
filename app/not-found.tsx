import { Button } from "@/components/ui/button";
import { Badge, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-section">
      <Badge className="self-start">404</Badge>
      <h1 className="mt-[18px] max-w-[13ch]">That page doesn&rsquo;t exist.</h1>
      <p className="mt-6 max-w-lede text-lede text-ink-2">
        The link may be out of date, or I may have moved something. The work and
        the contact form are both on the home page.
      </p>
      <div className="mt-9 flex flex-wrap gap-3.5">
        <Button href="/">Back to home</Button>
        <Button variant="ghost" href="/projects/forgeroom">
          Read the ForgeRoom case study
        </Button>
      </div>
    </Container>
  );
}
