const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.98]";

const variants = {
  primary:
    "bg-ink text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.18),0_6px_16px_-6px_rgb(0_0_0/0.35)] hover:bg-ink-hover",
  secondary:
    "border border-black/[0.08] bg-white text-foreground shadow-[0_1px_2px_rgb(15_15_25/0.05)] hover:border-black/[0.14] hover:bg-subtle",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-[18px] text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonClass(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}
