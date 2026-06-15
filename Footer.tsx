"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseIntOrNull, rubToCents, splitList, toSlug } from "@/lib/utils";

export async function saveProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const brandName = String(formData.get("brandName") || "").trim();
  if (!name || !brandName) throw new Error("Название и бренд обязательны");

  const brandSlug = toSlug(brandName);
  const brand = await prisma.brand.upsert({
    where: { slug: brandSlug },
    update: { name: brandName },
    create: { name: brandName, slug: brandSlug }
  });

  const slug = String(formData.get("slug") || "").trim() || toSlug(`${brandName}-${name}`);
  const availableVolumesMl = splitList(formData.get("availableVolumesMl")).map((v) => Number.parseInt(v, 10)).filter((n) => Number.isFinite(n));

  const data = {
    name,
    slug,
    brandId: brand.id,
    year: parseIntOrNull(formData.get("year")),
    perfumer: nullable(formData.get("perfumer")),
    concentration: nullable(formData.get("concentration")),
    brandCountry: nullable(formData.get("brandCountry")),
    gender: nullable(formData.get("gender")),
    aromaType: nullable(formData.get("aromaType")),
    description: nullable(formData.get("description")),
    history: nullable(formData.get("history")),
    longevity: nullable(formData.get("longevity")),
    sillage: nullable(formData.get("sillage")),
    seasonality: splitList(formData.get("seasonality")),
    topNotes: splitList(formData.get("topNotes")),
    heartNotes: splitList(formData.get("heartNotes")),
    baseNotes: splitList(formData.get("baseNotes")),
    similarAromas: splitList(formData.get("similarAromas")),
    sources: splitList(formData.get("sources")),
    imageUrl: nullable(formData.get("imageUrl")),
    pricePerMlCents: rubToCents(formData.get("pricePerMl")),
    fullBottleMl: parseIntOrNull(formData.get("fullBottleMl")),
    fullBottlePriceCents: rubToCents(formData.get("fullBottlePrice")),
    availableVolumesMl: availableVolumesMl.length ? availableVolumesMl : [1, 2, 3, 5, 10, 15, 20, 30, 50],
    stockMl: parseIntOrNull(formData.get("stockMl")) || 0,
    stockBottles: parseIntOrNull(formData.get("stockBottles")) || 0,
    isPublished: formData.get("isPublished") === "on",
    metaTitle: nullable(formData.get("metaTitle")),
    metaDescription: nullable(formData.get("metaDescription"))
  };

  if (id) await prisma.product.update({ where: { id }, data });
  else await prisma.product.create({ data });

  revalidatePath("/");
  revalidatePath("/catalog");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (id) await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

function nullable(value: FormDataEntryValue | null) {
  const v = String(value || "").trim();
  return v.length ? v : null;
}
