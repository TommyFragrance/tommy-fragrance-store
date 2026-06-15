import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/admin/AdminNav";
import { deleteProduct } from "@/app/admin/products/actions";
import { formatRub } from "@/lib/utils";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ include: { brand: true }, orderBy: { updatedAt: "desc" } });

  return (
    <main className="min-h-screen bg-graphite-50 p-4 lg:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <AdminNav />
        <section className="rounded-[2rem] border border-graphite-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-graphite-900">Товары</h1>
            <Link href="/admin/products/new" className="btn-primary">Добавить</Link>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-graphite-400">
                <tr className="border-b border-graphite-100">
                  <th className="py-3">Товар</th><th>Цена / мл</th><th>Флакон</th><th>Остаток</th><th>Статус</th><th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-graphite-100">
                    <td className="py-4"><div className="font-semibold text-graphite-900">{p.brand.name} {p.name}</div><div className="text-graphite-400">/{p.slug}</div></td>
                    <td>{formatRub(p.pricePerMlCents)}</td>
                    <td>{formatRub(p.fullBottlePriceCents)}</td>
                    <td>{p.stockMl} мл · {p.stockBottles} фл.</td>
                    <td>{p.isPublished ? "Опубликован" : "Черновик"}</td>
                    <td className="flex gap-2 py-4">
                      <Link className="rounded-full border border-graphite-200 px-4 py-2" href={`/admin/products/${p.id}`}>Править</Link>
                      <form action={deleteProduct}><input type="hidden" name="id" value={p.id} /><button className="rounded-full border border-graphite-200 px-4 py-2 text-red-700">Удалить</button></form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
