import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Связь с Tommy Fragrance: Telegram, WhatsApp, Instagram."
};

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="container-lux py-16">
        <div className="eyebrow">Контакты</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-graphite-900 md:text-7xl">Связаться с Tommy Fragrance.</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Contact label="Telegram" value={`@${site.telegramUsername}`} href={`https://t.me/${site.telegramUsername}`} />
          <Contact label="WhatsApp" value="Написать" href={`https://wa.me/${site.whatsappPhone}`} />
          <Contact label="Instagram" value={`@${site.instagramUsername}`} href={`https://instagram.com/${site.instagramUsername}`} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function Contact({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="rounded-[2rem] border border-graphite-100 bg-white p-7 shadow-soft transition hover:-translate-y-1">
      <div className="text-xs uppercase tracking-luxury text-graphite-400">{label}</div>
      <div className="mt-4 text-2xl font-semibold text-graphite-900">{value}</div>
    </a>
  );
}
