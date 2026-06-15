import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/admin/AdminNav";
import { formatRub } from "@/lib/utils";
import { updateOrderStatus } from "@/app/admin/orders/actions";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({ include: { product: { include: { brand: true } } }, orderBy: { createdAt: "desc" } });
  return (
    <main className="min-h-screen bg-graphite-50 p-4 lg:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <AdminNav />
        <section className="rounded-[2rem] border border-graphite-100 bg-white p-6 shadow-soft">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-graphite-900">Заказы / заявки</h1>
          <div className="mt-6 grid gap-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-graphite-100 p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <div className="font-semibold text-graphite-900">{order.product.brand.name} {order.product.name}</div>
                    <div className="mt-1 text-sm text-graphite-500">{order.volumeLabel} · {formatRub(order.priceCents)} · {order.channel} · {new Intl.DateTimeFormat("ru-RU").format(order.createdAt)}</div>
                  </div>
                  <form action={updateOrderStatus} className="flex gap-2">
                    <input type="hidden" name="id" value={order.id} />
                    <select name="status" defaultValue={order.status} className="rounded-full border border-graphite-200 px-4 py-2 text-sm">
                      {['NEW','CONTACTED','PAID','SHIPPED','DONE','CANCELLED'].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button className="rounded-full bg-graphite-900 px-4 py-2 text-sm text-white">Сохранить</button>
                  </form>
                </div>
              </div>
            ))}
            {orders.length === 0 ? <div className="text-sm text-graphite-500">Заявок пока нет.</div> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
