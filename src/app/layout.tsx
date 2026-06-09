import type { Metadata } from "next";
import { Exo_2, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/i18n";
import { MESSAGES } from "@/i18n/messages";
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

export const metadata: Metadata = {
  title: MESSAGES.en.meta.title,
  description: MESSAGES.en.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageBg = "url('/bg/inferno-background.jpg')";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${exo2.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ ["--page-bg" as string]: pageBg }}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
