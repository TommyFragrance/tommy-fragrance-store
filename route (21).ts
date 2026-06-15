import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Telegram",
  description: "Telegram Tommy Fragrance: подборы, наличие, цены и заказ оригинальной парфюмерии."
};

export default function TelegramPage() {
  return (
    <>
      <Header />
      <main className="container-lux py-16">
        <div className="rounded-[2.5rem] bg-graphite-900 p-8 text-white md:p-12">
          <div className="text-xs font-semibold uppercase tracking-luxury text-graphite-400">Telegram</div>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.05em] md:text-7xl">Каталог, наличие и подбор — в Telegram.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite-300">Переходите в Telegram, чтобы быстро уточнить наличие, получить подбор или оформить заказ.</p>
          <a href={`https://t.me/${site.telegramUsername}`} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-graphite-900">Открыть Telegram</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
