import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "О нас",
  description: "Философия Tommy Fragrance: оригинальность, прозрачность, подбор под клиента."
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container-lux py-16">
        <div className="eyebrow">О нас</div>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-graphite-900 md:text-7xl">Экспертный бутик оригинальной парфюмерии.</h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            ["Оригинальность", "Мы работаем только с оригинальной продукцией и строим доверие через прозрачные карточки товара."],
            ["Распив от 1 мл", "Можно познакомиться с ароматом без покупки полного флакона."],
            ["Подбор", "Помогаем выбрать аромат под характер, стиль, сезон и бюджет."],
            ["Бесплатная доставка", "Доставка по России включена в сервис."],
            ["Источники", "Для описаний используются официальный сайт бренда, Fragrantica и Parfumo."],
            ["Без выдумок", "Если данных нет, поле остаётся пустым. Это часть редакционной политики."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[2rem] border border-graphite-100 bg-white p-7 shadow-soft">
              <h2 className="text-xl font-semibold text-graphite-900">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-graphite-600">{text}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
