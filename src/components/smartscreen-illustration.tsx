import type { ReactNode } from "react";

/**
 * A drawing of the Windows "Windows protected your PC" (Microsoft Defender SmartScreen) dialog, used on the
 * install steps. It is recreated in HTML rather than copied from a screenshot, so it stays sharp and can show
 * the app's real installer name. `step` picks which of the two screens to show and which button is circled.
 */
export function SmartScreenIllustration({
  step,
  fileName,
  caption,
}: {
  step: "more-info" | "run-anyway";
  fileName: string;
  /** "Illustration", in the page's language. The dialog itself stays in English, as Windows shows it. */
  caption: string;
}) {
  const expanded = step === "run-anyway";
  const label = expanded
    ? `Illustration of the expanded SmartScreen dialog showing App: ${fileName} and Publisher: Unknown publisher, with the Run anyway button circled`
    : "Illustration of the Windows protected your PC dialog, with the More info link circled";

  return (
    <figure className="mx-auto w-full max-w-[420px]">
      <div
        role="img"
        aria-label={label}
        className="relative overflow-hidden bg-[#0f6cbd] font-['Segoe_UI',system-ui,sans-serif] text-white shadow-[0_8px_24px_rgb(15_15_25/0.25)]"
      >
        <span aria-hidden="true" className="absolute top-2 right-3 text-sm leading-none opacity-90">
          ✕
        </span>
        <div className="px-5 pt-7 pb-4 sm:px-6">
          <p className="text-[22px] leading-tight font-light sm:text-[26px]">Windows protected your PC</p>
          <p className="mt-4 text-[12.5px] leading-snug">
            Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put your PC
            at risk.
          </p>
          {expanded ? (
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12.5px] leading-snug">
              <dt>App:</dt>
              <dd className="break-all">{fileName}</dd>
              <dt>Publisher:</dt>
              <dd>Unknown publisher</dd>
            </dl>
          ) : (
            <p className="mt-3 text-[12.5px]">
              <Circled>
                <span className="underline underline-offset-2">More info</span>
              </Circled>
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2 px-5 pt-6 pb-4 sm:px-6">
          {expanded && (
            <Circled>
              <WinButton>Run anyway</WinButton>
            </Circled>
          )}
          <WinButton>Don&apos;t run</WinButton>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-[11px] text-faint">{caption}</figcaption>
    </figure>
  );
}

function WinButton({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block min-w-[96px] border-2 border-white/80 px-4 py-1 text-center text-[12.5px]">
      {children}
    </span>
  );
}

/** A hand-drawn-looking red ellipse around the thing to click, matching the circled macOS screenshots. */
function Circled({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-3 -inset-y-2 -rotate-2 rounded-[50%] border-2 border-[#e5332a]"
      />
    </span>
  );
}
