/**
 * Decorative art for the analyzer's problem section: a general-purpose AI
 * chat regenerating the same answer. It types, scores the resume 72 with
 * generic advice, regenerates to 58, then fails with an error. The states
 * share one slot and take turns on a 12s loop (globals.css, delays below);
 * reduced motion shows only the final error.
 */
const STATES = [
  { kind: "typing", delay: 0.4 },
  { kind: "reply", delay: 1.4, score: "72/100", advice: "Add more action verbs.", page: 1 },
  { kind: "typing", delay: 4 },
  { kind: "reply", delay: 5, score: "58/100", advice: "Add more keywords.", page: 2 },
  { kind: "typing", delay: 7.6 },
  { kind: "error", delay: 8.6, page: 3 },
] as const;

function Toolbar({ page }: { page: number }) {
  return (
    <p className="mt-1.5 flex gap-4 text-[13px] text-ink-3">
      <span>↻ Regenerate</span>
      <span>‹ {page}/3 ›</span>
    </p>
  );
}

export function ChatDrift() {
  return (
    <div className="w-full max-w-measure overflow-hidden rounded-diagram border-[2.5px] border-ink bg-white">
      <div className="flex items-center gap-1.5 border-b-2 border-ink bg-[#ddf1ff] px-4 py-2.5">
        {["bg-rose", "bg-sun", "bg-[#3ccf6e]"].map((colour) => (
          <span key={colour} className={`size-2.5 rounded-full border-[1.5px] border-ink ${colour}`} />
        ))}
        <span className="ml-2 text-[13px] text-ink-2">General-purpose AI chat</span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-end gap-2">
          <span className="flex items-center gap-1.5 rounded-md border-2 border-ink/15 px-2 py-1 text-[13px] text-ink-2">
            <svg viewBox="0 0 12 14" className="h-3.5 w-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
              <path d="M1 1h6.5L11 4.5V13H1z M7.5 1v3.5H11" />
            </svg>
            resume.pdf
          </span>
          <span className="rounded-full border-2 border-ink bg-paper px-3.5 py-1 text-small">Score my resume</span>
        </div>

        <div className="mt-4 flex gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-[13px] text-white">✦</span>
          <div className="relative h-[68px] flex-1">
            {STATES.map((state) => (
              <div
                key={state.delay}
                className={`chat-state chat-state-${state.kind} absolute inset-0`}
                style={{ animationDelay: `${state.delay}s` }}
              >
                {state.kind === "typing" && (
                  <span className="flex h-7 items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="chat-dot size-1.5 rounded-full bg-ink-3" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </span>
                )}
                {state.kind === "reply" && (
                  <>
                    <p className="h-7 text-small leading-7">
                      Your resume scores <strong className="font-display">{state.score}</strong>. {state.advice}
                    </p>
                    <Toolbar page={state.page} />
                  </>
                )}
                {state.kind === "error" && (
                  <>
                    <p className="w-fit rounded-lg border-2 border-rose-line bg-wash-rose px-3 py-1 text-small">
                      Something went wrong. The service is busy.
                    </p>
                    <Toolbar page={state.page} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
