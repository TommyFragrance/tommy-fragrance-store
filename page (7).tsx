import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";
import { getCatalogProducts, getFilters } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Каталог оригинальной парфюмерии",
  description: "Каталог Tommy Fragrance: оригинальные люксовые и нишевые ароматы, полные флаконы и распив от 1 мл."
};

export default async function CatalogPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const [products, filters] = await Promise.all([getCatalogProducts(params), getFilters()]);

  return (
    <>
      <Header />
      <main className="container-lux py-16">
        <div className="max-w-3xl">
          <div className="eyebrow">Каталог</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-graphite-900">Оригинальная парфюмерия</h1>
          <p className="mt-5 text-lg leading-8 text-graphite-600">Полные флаконы и распив от 1 мл. Используйте фильтры по бренду, цене, полу, сезону, концентрации и типу аромата.</p>
        </div>

        <div className="mt-10">
          <ProductFilters filters={filters} searchParams={params} />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        {products.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-graphite-100 bg-graphite-50 p-10 text-center text-graphite-500">По этому запросу ароматов пока нет.</div>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
