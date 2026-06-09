"use client";

import { FilterChip } from "@/shared/components/FilterChip";

interface FilterGroupProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
}

export function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: FilterGroupProps<T>) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterChip
            key={option.value}
            active={value === option.value}
            disabled={disabled}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}
