import type { Weapon } from "@/domain";
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
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getWeaponImageUrl(weapon)}
      alt={weapon.name}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={[
        "object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]",
        grayscale ? "grayscale opacity-50" : "",
        className,
      ].join(" ")}
    />
  );
}
