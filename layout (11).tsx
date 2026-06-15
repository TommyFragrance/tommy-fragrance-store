import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getBrands } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Бренды",
  description: "Автоматические страницы брендов в Tommy Fragrance."
};

export default async function BrandsPage() {
  const brands = await getBrands();
  return (
    <>
      <Header />
      <main className="container-lux py-16">
        <div className="eyebrow">Бренды</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-graphite-900">Парфюмерные дома</h1>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.slug}`} className="rounded-[2rem] border border-graphite-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-soft">
              <div className="text-xs uppercase tracking-luxury text-graphite-400">{brand.country || "Страна не указана"}</div>
              <h2 className="mt-4 text-2xl font-semibold text-graphite-900">{brand.name}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-graphite-500">{brand.description || "Описание бренда появится после проверки источников."}</p>
              <div className="mt-6 text-sm font-semibold text-graphite-900">{brand._count.products} ароматов</div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
