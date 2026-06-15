import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Подбор аромата",
  description: "Подбор оригинального аромата под ваши предпочтения, стиль, сезон и бюджет."
};

export default function AromaSelectionPage() {
  const text = encodeURIComponent("Здравствуйте. Хочу подобрать аромат. Мой бюджет: ____. Люблю: ____. Не люблю: ____. Нужен аромат для: ____.");
  return (
    <>
      <Header />
      <main className="container-lux py-16">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="eyebrow">Подбор аромата</div>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-graphite-900 md:text-7xl">Аромат под человека, а не под рейтинг.</h1>
            <p className="mt-6 text-lg leading-8 text-graphite-600">Ответьте на несколько вопросов — и мы подберём варианты под образ, сезон, бюджет и ваши предпочтения.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="btn-primary" target="_blank" rel="noreferrer" href={`https://t.me/share/url?url=${encodeURIComponent(site.url)}&text=${text}`}>Написать в Telegram</a>
              <a className="btn-secondary" target="_blank" rel="noreferrer" href={`https://wa.me/${site.whatsappPhone}?text=${text}`}>Написать в WhatsApp</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-graphite-100 bg-graphite-50 p-6">
            {[
              "Какой бюджет на аромат?",
              "Для себя или в подарок?",
              "Какие ароматы уже нравятся?",
              "Что точно не любите: сладость, табак, кожу, уд, цитрус?",
              "Нужен на каждый день, вечер, работу или особый выход?",
              "Полный флакон или распив для теста?"
            ].map((q, i) => (
              <div key={q} className="border-b border-graphite-200 py-5 last:border-0">
                <div className="text-xs uppercase tracking-luxury text-graphite-400">0{i + 1}</div>
                <div className="mt-2 text-lg font-medium text-graphite-900">{q}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
