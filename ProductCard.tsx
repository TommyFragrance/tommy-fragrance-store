import { AdminNav } from "@/components/admin/AdminNav";

export default function ImportPage() {
  return (
    <main className="min-h-screen bg-graphite-50 p-4 lg:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <AdminNav />
        <section className="rounded-[2rem] border border-graphite-100 bg-white p-6 shadow-soft">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-graphite-900">Импорт Excel / CSV</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-graphite-500">Загрузите .xlsx или .csv. Поддерживаемые колонки: brand, name, slug, pricePerMl, fullBottlePrice, fullBottleMl, concentration, gender, aromaType, seasonality, topNotes, heartNotes, baseNotes, sources, isPublished.</p>
          <form action="/api/admin/import" method="post" encType="multipart/form-data" className="mt-8 grid gap-4">
            <input name="file" type="file" accept=".csv,.xlsx" className="rounded-2xl border border-dashed border-graphite-200 bg-graphite-50 px-4 py-5" />
            <button className="btn-primary w-fit">Импортировать</button>
          </form>
          <a href="/import-template.csv" className="mt-6 inline-flex text-sm font-semibold text-graphite-900 underline">Скачать шаблон CSV</a>
        </section>
      </div>
    </main>
  );
}
