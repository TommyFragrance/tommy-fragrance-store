import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — оригинальная парфюмерия и распив от 1 мл`,
    template: `%s — ${site.name}`
  },
  description: site.description,
  keywords: ["оригинальная парфюмерия", "распив духов", "нишевая парфюмерия", "Tommy Fragrance"],
  openGraph: {
    title: `${site.name} — оригинальная парфюмерия`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "ru_RU",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
