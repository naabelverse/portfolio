import { FooterReveal } from "@/components/layout/footer-reveal";
import { Container } from "@/components/ui/primitives";
import { footerMotto, profile } from "@/content/site";

/** Start delay for .footer-line / .footer-rise in globals.css. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const words = footerMotto.split(" ");

/** Motto, then the copyright row. Lines draw in, then text fades in. */
export function Footer() {
  return (
    <FooterReveal className="relative mt-auto bg-white pt-12 pb-8 text-[15px] text-ink-3">
      {/* Top rule matches the header's border-b-2; a div so it can draw in. */}
      <div aria-hidden="true" className="footer-line absolute inset-x-0 top-0 h-0.5 bg-ink" />
      <Container>
        {/* Words rise in one by one, then the full stop drops in.
            The last word gets a hand-drawn circle that keeps redrawing itself. */}
        <p className="mx-auto max-w-[24ch] text-center font-display text-[clamp(24px,3.4vw,36px)] leading-[1.15] font-bold tracking-[-0.03em] text-balance text-ink">
          {words.map((word, i) => (
            <span key={i}>
              {i > 0 && " "}
              <span
                className={i === words.length - 1 ? "footer-word relative inline-block" : "footer-word inline-block"}
                style={delay(400 + i * 130)}
              >
                {word}
                {i === words.length - 1 && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                    className="footer-scribble pointer-events-none absolute -top-[0.26em] -left-[0.16em] h-[calc(100%+0.48em)] w-[calc(100%+0.32em)] overflow-visible text-cobalt"
                  >
                    <path
                      d="M30 10 C 80 0, 170 2, 192 22 C 205 42, 150 56, 95 56 C 35 56, 2 46, 6 28 C 9 14, 50 6, 120 6"
                      pathLength={1}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}
              </span>
            </span>
          ))}
          <span className="footer-dot ml-[0.1em] inline-block" style={delay(400 + words.length * 130 + 80)}>
            .
          </span>
        </p>

        <div aria-hidden="true" className="footer-line mt-10 h-px bg-line" style={delay(1100)} />
        {/* Three columns so the copyright sits on the true centre, not between its neighbours. */}
        <div
          className="footer-rise grid justify-items-center gap-3 pt-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center"
          style={delay(1400)}
        >
          <p className="sm:col-start-2">
            &copy; {new Date().getFullYear()} {profile.shortName}
          </p>
          <a href="#" className="group text-ink-2 transition-colors duration-150 hover:text-cobalt sm:justify-self-end">
            Back to top{" "}
            <span aria-hidden="true" className="inline-block group-hover:animate-bounce">
              ↑
            </span>
          </a>
        </div>
      </Container>
    </FooterReveal>
  );
}
