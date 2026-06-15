import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { EmptyField } from "@/components/ui/EmptyField";
import { OrderActions } from "@/components/product/OrderActions";
import { getProductBySlug } from "@/lib/catalog";
import { formatRub } from "@/lib/utils";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Аромат не найден" };
  const title = product.metaTitle || `${product.brand.name} ${product.name}`;
  const description = product.metaDescription || product.description || `${product.brand.name} ${product.name} в Tommy Fragrance. Оригинал, распив и полный флакон.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand.name} ${product.name}`,
    brand: { "@type": "Brand", name: product.brand.name },
    image: product.imageUrl ? [product.imageUrl] : undefined,
    description: product.description || undefined,
    offers: product.fullBottlePriceCents
      ? {
          "@type": "Offer",
          priceCurrency: "RUB",
          price: Math.round(product.fullBottlePriceCents / 100),
          availability: product.stockBottles > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
          url: `${site.url}/catalog/${product.slug}`
        }
      : undefined
  };

  return (
    <>
      <Header />
      <main>
        <JsonLd data={productJsonLd} />
        <section className="container-lux grid gap-12 py-16 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-graphite-50">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={`${product.brand.name} ${product.name}`} fill className="object-cover" priority />
            ) : (
              <div className="flex h-full items-center justify-center luxury-grid">
                <div className="text-center">
                  <div className="eyebrow">Original</div>
                  <div className="mt-4 text-4xl font-semibold text-graphite-900">{product.brand.name}</div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:pt-10">
            <div className="eyebrow">{product.brand.name}</div>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-graphite-900 md:text-7xl">{product.name}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite-600">{product.description || "Описание появится после проверки данных по официальным источникам."}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Info label="Цена за 1 мл" value={product.pricePerMlCents ? formatRub(product.pricePerMlCents) : null} />
              <Info label="Полный флакон" value={product.fullBottlePriceCents ? formatRub(product.fullBottlePriceCents) : null} />
            </div>
            <div className="mt-8"><OrderActions product={product} /></div>
          </div>
        </section>

        <section className="border-t border-graphite-100 bg-graphite-50 py-16">
          <div className="container-lux grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="eyebrow">Досье аромата</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-graphite-900">Только подтверждённые данные.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Info label="Год выпуска" value={product.year?.toString()} />
              <Info label="Парфюмер" value={product.perfumer} />
              <Info label="Концентрация" value={product.concentration} />
              <Info label="Страна бренда" value={product.brandCountry} />
              <Info label="Пол" value={product.gender} />
              <Info label="Тип аромата" value={product.aromaType} />
              <Info label="Стойкость" value={product.longevity} />
              <Info label="Шлейф" value={product.sillage} />
              <Info label="Сезонность" value={product.seasonality.join(", ")} />
            </div>
          </div>
        </section>

        <section className="container-lux grid gap-8 py-16 lg:grid-cols-3">
          <Block title="Пирамида нот">
            <Notes title="Верхние" items={product.topNotes} />
            <Notes title="Сердце" items={product.heartNotes} />
            <Notes title="База" items={product.baseNotes} />
          </Block>
          <Block title="История создания">
            {product.history ? <p className="leading-8 text-graphite-600">{product.history}</p> : <EmptyField />}
          </Block>
          <Block title="Похожие ароматы">
            {product.similarAromas.length ? <div className="flex flex-wrap gap-2">{product.similarAromas.map((item) => <span key={item} className="rounded-full bg-graphite-100 px-3 py-1 text-sm text-graphite-700">{item}</span>)}</div> : <EmptyField />}
          </Block>
        </section>

        <section className="container-lux pb-20">
          <div className="rounded-[2rem] border border-graphite-100 bg-white p-8">
            <div className="eyebrow">Источники информации</div>
            {product.sources.length ? (
              <ul className="mt-5 grid gap-3 text-sm text-graphite-600">
                {product.sources.map((source) => <li key={source}>{source}</li>)}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-graphite-500">Источники не добавлены. Товар лучше не публиковать до проверки.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-[1.5rem] border border-graphite-100 bg-white p-5">
      <div className="text-xs uppercase tracking-luxury text-graphite-400">{label}</div>
      <div className="mt-2 text-sm font-medium text-graphite-900">{value || <EmptyField />}</div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-graphite-100 bg-white p-7 shadow-soft">
      <h3 className="text-xl font-semibold text-graphite-900">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Notes({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-b border-graphite-100 py-4 last:border-0">
      <div className="text-xs uppercase tracking-luxury text-graphite-400">{title}</div>
      <div className="mt-2 text-sm text-graphite-700">{items.length ? items.join(", ") : <EmptyField />}</div>
    </div>
  );
}
