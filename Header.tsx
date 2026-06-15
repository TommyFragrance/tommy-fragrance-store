import { notFound } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAdminProductById } from "@/lib/catalog";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getAdminProductById(id);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-graphite-50 p-4 lg:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <AdminNav />
        <section>
          <h1 className="mb-6 text-3xl font-semibold tracking-[-0.04em] text-graphite-900">Редактировать товар</h1>
          <ProductForm product={product} />
        </section>
      </div>
    </main>
  );
}
