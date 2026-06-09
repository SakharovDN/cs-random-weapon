import { WEAPON_CATEGORIES } from "./constants";
import type { TeamSide, Weapon, WeaponCategory } from "./types";

export const WEAPONS: Weapon[] = [
  { id: "glock", name: "Glock-18", team: "t", category: "pistol", price: 0, imagePath: "/images/9f000fb2395bec0baec0d1eaf15f81fdbf35eca4d465a46dca2a30ff67318e24.webp" },
  {
    id: "usp_p2000",
    name: "USP-S / P2000",
    team: "ct",
    category: "pistol",
    price: 0,
    imagePath: "/images/48df093fc2428d27045f0ccecb0512773f77291978942f28942bc94c95189ba3.webp",
    variants: [
      { id: "usp", name: "USP-S", imagePath: "/images/48df093fc2428d27045f0ccecb0512773f77291978942f28942bc94c95189ba3.webp" },
      { id: "p2000", name: "P2000", imagePath: "/images/7df9de0d59f3e4e4bd83aa97334a35b79044249bc99437e1e7cce791aefac106.webp" },
    ],
  },
  { id: "dualies", name: "Dual Berettas", team: "both", category: "pistol", price: 300, imagePath: "/images/0e81e2a15b598845dee5176ad8edd584b2d8aa017e0e22147f6d49f752ab2993.webp" },
  { id: "p250", name: "P250", team: "both", category: "pistol", price: 300, imagePath: "/images/b3f78b183ac37f76a4f2151c8e3689893716e40cf64c1fbba4d53c23f10c57d9.webp" },
  { id: "cz75", name: "CZ75-Auto", team: "both", category: "pistol", price: 500, imagePath: "/images/fb39b5b4612c8e16ce922b85053b86243f72b793ac13cd23a686b2858076d3fb.webp" },
  { id: "fiveseven", name: "Five-SeveN", team: "ct", category: "pistol", price: 500, imagePath: "/images/d4de3dbae6164cb9d153cb7bce31d2a82d75f5c003e08bd398e87a5bc7871627.webp" },
  { id: "tec9", name: "Tec-9", team: "t", category: "pistol", price: 500, imagePath: "/images/feadbd1e8c97c387821e839b6248da61c0aa609f50c0b4de95bfee605d59c53e.webp" },
  { id: "deagle", name: "Desert Eagle", team: "both", category: "pistol", price: 700, imagePath: "/images/765b2400b343dce1c1b6442be3fa2786cdb455f91136b149deee65892298d782.webp" },
  { id: "r8", name: "R8 Revolver", team: "both", category: "pistol", price: 600, imagePath: "/images/a1bd45e40e3d71f1a305f810fef2ce4babff308704b0ca89ed8db3f953ead2f7.webp" },
  { id: "mac10", name: "MAC-10", team: "t", category: "smg", price: 1050, imagePath: "/images/462975f8c6eb56e115f1201c9664303ca3699dc0fd2285cfe384612eeb413f3a.webp" },
  { id: "mp9", name: "MP9", team: "ct", category: "smg", price: 1250, imagePath: "/images/2899043e0dc09dbbf9e628630caa7573f4504f482ab8a3a13e6f213520823761.webp" },
  { id: "mp7", name: "MP7", team: "both", category: "smg", price: 1500, imagePath: "/images/3e6e8ef1bc8867dc22a666957f209e0ef1730df9bcf06f92fecd1350e4902228.webp" },
  { id: "ump45", name: "UMP-45", team: "both", category: "smg", price: 1200, imagePath: "/images/9816fe3f44576da09900b5ec08c1ffcd462bde7f63a4b90d792a41b28525f777.webp" },
  { id: "p90", name: "P90", team: "both", category: "smg", price: 2350, imagePath: "/images/5acb9c78f88df4a2fb06b8b0b6a21f48589a9c4856469bf61c55397b8a104767.webp" },
  { id: "bizon", name: "PP-Bizon", team: "both", category: "smg", price: 1400, imagePath: "/images/415230bb7c06d4e9d43460f11cd5f8ccc9764218823c2558dd4fa257eb9817ed.webp" },
  { id: "mp5sd", name: "MP5-SD", team: "both", category: "smg", price: 1500, imagePath: "/images/ea4801cfb93d218cdbd93f10e58f72500033373a3fa8beb9283c6e106878abfa.webp" },
  { id: "nova", name: "Nova", team: "both", category: "shotgun", price: 1050, imagePath: "/images/eece4009c3b5db0070fbd0b1880ad23ebcc815048b7bb3a6371c22fe6f27e9da.webp" },
  { id: "xm1014", name: "XM1014", team: "both", category: "shotgun", price: 2000, imagePath: "/images/d56f8fbe816ec8cdedb616303319d686a226474a90c20404c04c21575aa519c2.webp" },
  { id: "sawedoff", name: "Sawed-Off", team: "t", category: "shotgun", price: 1100, imagePath: "/images/d41d707690ce56fafcdbd7d4c75c40abd7a2fc02718ba18db4844913017b6c08.webp" },
  { id: "mag7", name: "MAG-7", team: "ct", category: "shotgun", price: 1300, imagePath: "/images/a685250ba165d3b77dab013e10d7e56fbc16a31b21a569d64763959340099d39.webp" },
  { id: "ssg08", name: "SSG 08", team: "both", category: "sniper", price: 1700, imagePath: "/images/b3d950914aa71b3607603d700ff85c9b88a34b5079608e4cc95ce90f30623e82.webp" },
  { id: "awp", name: "AWP", team: "both", category: "sniper", price: 4750, imagePath: "/images/11da1c1254a078318e16ba18b8206622e7d20f2d3e4de40158b0c382675ae8d3.webp" },
  { id: "g3sg1", name: "G3SG1", team: "both", category: "sniper", price: 5000, imagePath: "/images/0ba7098fbde2cb1cb91924b71c0ea68c5b6619f170b34dd1dfde739a3fd38479.webp" },
  { id: "scar20", name: "SCAR-20", team: "both", category: "sniper", price: 5000, imagePath: "/images/1c27a0e1b0a3c92574b5d911373a65372f68559ad3dfd08296a3c07877367e51.webp" },
  { id: "galil", name: "Galil AR", team: "t", category: "rifle", price: 1800, imagePath: "/images/bf2ce050ea5d18e3668dac4d64d423b3e5ab8183cb1e6c92bf5758f8fd4fc259.webp" },
  { id: "famas", name: "FAMAS", team: "ct", category: "rifle", price: 1950, imagePath: "/images/b6d935c3ee498a170184fb07284b65c32cb586d955f9b53c88f717df1f56ae0c.webp" },
  { id: "ak47", name: "AK-47", team: "t", category: "rifle", price: 2700, imagePath: "/images/e4dc4049f3d28f95a279f5f40bcd2d30df5b74e5745e0edfdaa9c556a076a5cd.webp" },
  { id: "m4a4", name: "M4A4", team: "ct", category: "rifle", price: 2900, imagePath: "/images/594b33eebd2656c17ae835bbacfb9f5cc250619e1e910a960ab96a6c7ddf75a1.webp" },
  { id: "m4a1s", name: "M4A1-S", team: "ct", category: "rifle", price: 2900, imagePath: "/images/7ad899266a153b191872257b2cd33ae77acce2b0e9656496ebc66b478cdba326.webp" },
  { id: "aug", name: "AUG", team: "ct", category: "rifle", price: 3300, imagePath: "/images/a04c9bcf938fabad11c5ebe0feb1433d23042d8f482c66d8760d9168e9b5e2d9.webp" },
  { id: "sg553", name: "SG 553", team: "t", category: "rifle", price: 3000, imagePath: "/images/21f789016d8c766b09a1916c5646308a9a8baaba2743ce1342cc19ae28079204.webp" },
  { id: "m249", name: "M249", team: "both", category: "lmg", price: 5200, imagePath: "/images/93350ad085fde7f3aa1202c2ddbe610258fa41ba9fd5f1247b70ad75ac0242c9.webp" },
  { id: "negev", name: "Negev", team: "both", category: "lmg", price: 1700, imagePath: "/images/ff04e6944965eadaa48d530394893a0e5542ea917b42b3126069a43dc178924f.webp" },
];

export function getWeaponPoolId(weapon: Weapon): string {
  return weapon.poolId ?? weapon.id;
}

export function getWeaponTeams(weapon: Weapon): TeamSide[] {
  if (weapon.team === "both") return ["ct", "t"];
  return [weapon.team];
}

export function groupWeaponsByCategory(): Record<WeaponCategory, Weapon[]> {
  return WEAPON_CATEGORIES.reduce(
    (groups, category) => {
      groups[category] = WEAPONS.filter((weapon) => weapon.category === category);
      return groups;
    },
    {} as Record<WeaponCategory, Weapon[]>
  );
}

export function buildWeaponImagePathMap(): Map<string, string> {
  const paths = new Map<string, string>();

  for (const weapon of WEAPONS) {
    paths.set(weapon.id, weapon.imagePath);
    weapon.variants?.forEach((variant) => {
      paths.set(variant.id, variant.imagePath);
    });
  }

  return paths;
}
