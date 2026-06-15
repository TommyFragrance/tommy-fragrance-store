import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/admin/AdminNav";
import { formatRub } from "@/lib/utils";

export default async function AdminPage() {
  const [products, orders, brands] = await Promise.all([
    prisma.product.count(),
    prisma.order.findMany({ include: { product: { include: { brand: true } } }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.brand.count()
  ]);

  return (
    <main className="min-h-screen bg-graphite-50 p-4 lg:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <AdminNav />
        <section className="grid gap-6">
          <div className="rounded-[2rem] bg-graphite-900 p-8 text-white">
            <div className="text-xs uppercase tracking-luxury text-graphite-400">Dashboard</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Админ-панель Tommy Fragrance</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Stat label="Товаров" value={products.toString()} />
            <Stat label="Брендов" value={brands.toString()} />
            <Stat label="Последних заявок" value={orders.length.toString()} />
          </div>
          <div className="rounded-[2rem] border border-graphite-100 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-graphite-900">Последние заявки</h2>
            <div className="mt-5 grid gap-3">
              {orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-graphite-100 p-4 text-sm">
                  <div className="font-semibold text-graphite-900">{order.product.brand.name} {order.product.name}</div>
                  <div className="mt-1 text-graphite-500">{order.volumeLabel} · {formatRub(order.priceCents)} · {order.channel} · {order.status}</div>
                </div>
              ))}
              {orders.length === 0 ? <div className="text-sm text-graphite-500">Заявок пока нет.</div> : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-graphite-100 bg-white p-6 shadow-soft">
      <div className="text-xs uppercase tracking-luxury text-graphite-400">{label}</div>
      <div className="mt-3 text-4xl font-semibold text-graphite-900">{value}</div>
    </div>
  );
}
