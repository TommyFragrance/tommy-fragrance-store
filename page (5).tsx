import Link from "next/link";
import { ArrowRight, Check, Sparkles, Truck, ShieldCheck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/site/JsonLd";
import { getCatalogProducts } from "@/lib/catalog";
import { site } from "@/lib/site";
import { normalizePhone } from "@/lib/utils";

export default async function HomePage() {
  const products = (await getCatalogProducts()).slice(0, 4);

  return (
    <>
      <Header />
      <main>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            sameAs: [`https://t.me/${site.telegramUsername}`, `https://instagram.com/${site.instagramUsername}`]
          }}
        />

        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 luxury-grid opacity-70" />
          <div className="container-lux relative grid min-h-[calc(100vh-80px)] items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="eyebrow">Оригинальная парфюмерия</div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-graphite-900 sm:text-7xl lg:text-8xl">
                Полные флаконы и распив от 1 мл.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-graphite-600">
                Tommy Fragrance — экспертный бутик оригинальной парфюмерии. Подбираем аромат под ваши предпочтения, стиль и ситуацию. Бесплатная доставка по России.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/catalog" className="btn-primary gap-2">Смотреть каталог <ArrowRight size={16} /></Link>
                <Link href="/aroma-selection" className="btn-secondary">Подобрать аромат</Link>
                <a href={`https://t.me/${site.telegramUsername}`} target="_blank" rel="noreferrer" className="btn-secondary">Telegram</a>
                <a href={`https://wa.me/${normalizePhone(site.whatsappPhone)}`} target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp</a>
              </div>
            </div>

            <div className="panel noise p-5">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-graphite-900 p-8 text-white">
                <div className="absolute right-6 top-6 text-xs uppercase tracking-luxury text-graphite-500">Tommy</div>
                <div className="mt-28">
                  <div className="text-sm uppercase tracking-luxury text-graphite-400">Premium selection</div>
                  <div className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Аромат, который работает на ваш образ.</div>
                </div>
                <div className="mt-12 grid gap-3 text-sm text-graphite-300">
                  {[
                    "Только оригинальная продукция",
                    "Распив от 1 мл для точного знакомства",
                    "Прозрачные источники по каждому аромату",
                    "Заказ в Telegram и WhatsApp"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3"><Check size={16} /> {item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-graphite-100 bg-graphite-50 py-6">
          <div className="container-lux grid gap-4 md:grid-cols-3">
            <Feature icon={<ShieldCheck size={20} />} title="Оригинал" text="В карточках товара фиксируются источники: бренд, Fragrantica, Parfumo." />
            <Feature icon={<Truck size={20} />} title="Доставка" text="Бесплатная доставка по России — уже заложена в сервис." />
            <Feature icon={<Sparkles size={20} />} title="Подбор" text="Поможем выбрать аромат под характер, образ и бюджет." />
          </div>
        </section>

        <section className="container-lux py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="eyebrow">Каталог</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-graphite-900 md:text-5xl">Выбранные ароматы</h2>
            </div>
            <Link href="/catalog" className="btn-secondary gap-2">Весь каталог <ArrowRight size={16} /></Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>

        <section className="bg-graphite-900 py-24 text-white">
          <div className="container-lux grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-luxury text-graphite-400">Философия</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Доверие важнее громких обещаний.</h2>
            </div>
            <p className="text-lg leading-9 text-graphite-300">
              Мы не выдумываем ноты, историю, стойкость и шлейф. Если подтверждённых данных нет, поле остаётся пустым. Tommy Fragrance строится на прозрачности, оригинальности и грамотном подборе.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-graphite-100 bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-graphite-900 text-white">{icon}</div>
      <div className="mt-5 text-lg font-semibold text-graphite-900">{title}</div>
      <p className="mt-2 text-sm leading-6 text-graphite-500">{text}</p>
    </div>
  );
}
