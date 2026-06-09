import type { ButtonHTMLAttributes } from "react";

type FilterChipTone = "default" | "exclude";

interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  tone?: FilterChipTone;
}

const BASE =
  "rounded-md border px-3 py-1.5 text-sm font-semibold uppercase tracking-wide transition-all disabled:cursor-not-allowed disabled:opacity-50";

const TONE_STYLES: Record<FilterChipTone, { active: string; idle: string }> = {
  default: {
    active:
      "border-amber-400 bg-amber-400/15 text-amber-300 shadow-[0_0_12px_rgba(240,165,0,0.25)]",
    idle: "border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-500 hover:text-slate-200",
  },
  exclude: {
    active: "border-red-500/70 bg-red-950/30 text-red-300 line-through",
    idle: "border-slate-700 bg-slate-900/60 text-slate-400 hover:border-red-900/50 hover:text-red-200",
  },
};

export function FilterChip({
  active,
  tone = "default",
  className = "",
  ...props
}: FilterChipProps) {
  const styles = TONE_STYLES[tone];

  return (
    <button
      type="button"
      className={[BASE, active ? styles.active : styles.idle, className].join(" ")}
      {...props}
    />
  );
}
