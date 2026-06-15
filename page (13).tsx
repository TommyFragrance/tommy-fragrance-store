import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/site/JsonLd";
import { getBrandBySlug } from "@/lib/catalog";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: "Бренд не найден" };
  return {
    title: `${brand.name} — ароматы, распив и полные флаконы`,
    description: brand.description || `Оригинальные ароматы ${brand.name} в Tommy Fragrance.`
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  return (
    <>
      <Header />
      <main className="container-lux py-16">
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Brand", name: brand.name, url: `${site.url}/brands/${brand.slug}` }} />
        <div className="eyebrow">{brand.country || "Brand"}</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-graphite-900">{brand.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite-600">{brand.description || "Описание бренда появится после проверки официальных источников."}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brand.products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
