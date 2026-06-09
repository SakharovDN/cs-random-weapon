import { AppHeader } from "@/shared/components/AppHeader";
import { WeaponRandomizer } from "@/features/randomizer/WeaponRandomizer";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <AppHeader />
      <WeaponRandomizer />
    </main>
  );
}
