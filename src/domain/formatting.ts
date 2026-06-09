import type { Team } from "./types";

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US")}`;
}

export function getTeamBadge(team: Team): string {
  if (team === "ct") return "CT";
  if (team === "t") return "T";
  return "CT / T";
}
