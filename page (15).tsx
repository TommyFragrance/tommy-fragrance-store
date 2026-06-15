import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Распивы от 1 мл",
  description: "Распив оригинальной парфюмерии от 1 мл в Tommy Fragrance."
};

export default function DecantsPage() {
  const volumes = [1, 2, 3, 5, 10, 15, 20, 30, 50];
  return (
    <>
      <Header />
      <main>
        <section className="container-lux py-16">
          <div className="eyebrow">Распивы</div>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-graphite-900 md:text-7xl">Попробуйте аромат до покупки флакона.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite-600">Распив от 1 мл помогает понять, как аромат раскрывается именно на вашей коже, в вашем ритме и климате.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {volumes.map((ml) => <span key={ml} className="rounded-full border border-graphite-200 px-5 py-3 text-sm font-medium">{ml} мл</span>)}
          </div>
          <div className="mt-10 flex gap-3">
            <Link href="/catalog" className="btn-primary">Выбрать аромат</Link>
            <Link href="/aroma-selection" className="btn-secondary">Нужен подбор</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
