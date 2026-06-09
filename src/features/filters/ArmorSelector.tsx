"use client";

import { ARMOR_OPTIONS, formatPrice, type ArmorOption } from "@/domain";
import { useTranslations } from "next-intl";
import { getArmorImageUrl } from "@/lib/image-urls";

interface ArmorSelectorProps {
  value: ArmorOption;
  onChange: (value: ArmorOption) => void;
  disabled?: boolean;
  compact?: boolean;
}

function NoArmorIcon({ active }: { active: boolean }) {
  return (
    <div
      className={[
        "flex h-12 w-12 items-center justify-center rounded-md border border-dashed",
        active ? "border-amber-400/60 bg-slate-900/80" : "border-slate-600 bg-slate-950/60",
      ].join(" ")}
      aria-hidden="true"
    >
      <span className={active ? "text-amber-400/70" : "text-slate-600"}>—</span>
    </div>
  );
}

function ArmorIcon({ type, active }: { type: ArmorOption; active: boolean }) {
  const imageUrl = getArmorImageUrl(type);

  if (!imageUrl) {
    return <NoArmorIcon active={active} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt=""
      width={48}
      height={48}
      loading="lazy"
      decoding="async"
      className={[
        "h-12 w-12 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]",
        active ? "brightness-110" : "opacity-75 saturate-75",
      ].join(" ")}
    />
  );
}

export function ArmorSelector({
  value,
  onChange,
  disabled = false,
  compact = false,
}: ArmorSelectorProps) {
  const tFilters = useTranslations("filters");
  const tArmor = useTranslations("armor");

  return (
    <div className="space-y-2">
      <p
        className={[
          "font-semibold uppercase tracking-widest text-slate-500",
          compact ? "text-[11px]" : "text-xs",
        ].join(" ")}
      >
        {tFilters("equipment")}
      </p>
      <div className="flex flex-wrap gap-2">
        {ARMOR_OPTIONS.map((option) => {
          const active = value === option.value;
          const label = tArmor(option.value);
          const priceLabel = option.price > 0 ? formatPrice(option.price) : "$0";

          return (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              title={label}
              aria-label={`${label}${option.price > 0 ? `, ${priceLabel}` : ""}`}
              onClick={() => onChange(option.value)}
              className={[
                "flex min-w-[76px] cursor-pointer flex-col items-center gap-1.5 rounded-lg border px-3 py-2.5 transition-all",
                "disabled:cursor-not-allowed disabled:opacity-50",
                active
                  ? "border-amber-400 bg-amber-400/10 shadow-[0_0_12px_rgba(240,165,0,0.2)]"
                  : "border-slate-700 bg-slate-900/60 hover:border-slate-500",
              ].join(" ")}
            >
              <ArmorIcon type={option.value} active={active} />
              <span
                className={[
                  "font-mono text-[11px] leading-none",
                  active ? "text-amber-300" : "text-slate-500",
                ].join(" ")}
              >
                {priceLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
