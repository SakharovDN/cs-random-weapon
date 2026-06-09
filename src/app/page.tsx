import { AppHeader } from "@/shared/components/AppHeader";
import { SeoHiddenSummary } from "@/shared/components/SeoJsonLd";
import { WeaponRandomizer } from "@/features/randomizer/WeaponRandomizer";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <SeoHiddenSummary />
      <AppHeader />
      <WeaponRandomizer />
    </main>
  );
}
