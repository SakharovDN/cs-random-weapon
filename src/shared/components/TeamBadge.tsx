import type { TeamSide } from "@/domain";

interface TeamBadgeProps {
  team: TeamSide;
}

export function TeamBadge({ team }: TeamBadgeProps) {
  const styles =
    team === "ct"
      ? "border-[#5d79ae]/50 bg-[#5d79ae]/10 text-[#9eb6e0]"
      : "border-[#c4a35a]/50 bg-[#c4a35a]/10 text-[#e8d098]";

  return (
    <span
      className={[
        "rounded border px-1.5 py-0.5 text-[11px] font-bold uppercase leading-none",
        styles,
      ].join(" ")}
    >
      {team}
    </span>
  );
}
