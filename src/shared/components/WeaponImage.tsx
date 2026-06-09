"use client";

import type { Weapon } from "@/domain";
import { trackImageLoadError } from "@/lib/analytics";
import { getWeaponImageUrl } from "@/lib/image-urls";

interface WeaponImageProps {
  weapon: Weapon;
  size?: number;
  className?: string;
  grayscale?: boolean;
}

export function WeaponImage({
  weapon,
  size = 48,
  className = "",
  grayscale = false,
}: WeaponImageProps) {
  const src = getWeaponImageUrl(weapon);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={weapon.name}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      onError={() =>
        trackImageLoadError({
          kind: "weapon",
          id: weapon.id,
          src,
        })
      }
      className={[
        "object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]",
        grayscale ? "grayscale opacity-50" : "",
        className,
      ].join(" ")}
    />
  );
}
