import type { Metadata } from "next";
import { Exo_2, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/i18n";
import { getSeoContent, getSiteUrl, SITE_NAME } from "@/lib/seo";
import { SeoJsonLd } from "@/shared/components/SeoJsonLd";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo2",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = getSiteUrl();
const seo = getSeoContent("en");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "games",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ru: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: seo.ogLocale,
    alternateLocale: ["ru_RU", "en_US"],
    url: siteUrl,
    siteName: SITE_NAME,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: "/bg/inferno-background.jpg",
        width: 1200,
        height: 630,
        alt: "CS2 Random Weapon — Inferno themed background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/bg/inferno-background.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageBg = "url('/bg/inferno-background.jpg')";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SeoJsonLd />
      </head>
      <body
        className={`${exo2.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ ["--page-bg" as string]: pageBg }}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
