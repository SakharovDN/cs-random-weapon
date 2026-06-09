import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/** Minimal abstract AK + dice, drawn for 32px canvas */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0a0e14"/>
  <rect x="3" y="13" width="14" height="4" rx="1.5" fill="#f0a500"/>
  <rect x="7" y="16" width="4" height="9" rx="1.5" fill="#f0a500"/>
  <rect x="3" y="14" width="6" height="3.5" rx="1.5" fill="#c48400" transform="rotate(-32 3 14)"/>
  <rect x="18" y="8" width="12" height="12" rx="2.5" fill="#f4f4f5"/>
  <circle cx="21" cy="11" r="1.6" fill="#0a0e14"/>
  <circle cx="24" cy="14" r="1.6" fill="#0a0e14"/>
  <circle cx="27" cy="17" r="1.6" fill="#0a0e14"/>
</svg>`;

const svgBuffer = Buffer.from(svg);

async function renderPng(size) {
  return sharp(svgBuffer).resize(size, size).png().toBuffer();
}

async function main() {
  const appDir = path.join(root, "src", "app");
  const icoSizes = [16, 32, 48];
  const pngBuffers = await Promise.all(icoSizes.map(renderPng));
  const ico = await toIco(pngBuffers);

  fs.writeFileSync(path.join(appDir, "favicon.ico"), ico);
  fs.writeFileSync(path.join(appDir, "apple-icon.png"), await renderPng(180));

  console.log("Generated src/app/favicon.ico and src/app/apple-icon.png");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
