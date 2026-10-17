import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function AppleLogo(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

export function WindowsLogo(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M1 1h10.5v10.5H1zM12.5 1H23v10.5H12.5zM1 12.5h10.5V23H1zM12.5 12.5H23V23H12.5z" />
    </svg>
  );
}

export function OSLogo({ os, ...props }: IconProps & { os: "mac" | "windows" }) {
  return os === "mac" ? <AppleLogo {...props} /> : <WindowsLogo {...props} />;
}

/** Base Store mark: a grid of app tiles in the colours of DocBase, SheetBase and SlideBase, plus one for apps to come. */
export function BaseStoreMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="13" height="13" rx="3.5" fill="#2563eb" />
      <rect x="17" y="2" width="13" height="13" rx="3.5" fill="#16a34a" />
      <rect x="2" y="17" width="13" height="13" rx="3.5" fill="#ea580c" />
      <rect x="17" y="17" width="13" height="13" rx="3.5" fill="#4f46e5" />
      <path d="M23.5 20.5v6M20.5 23.5h6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
