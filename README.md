export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import * as XLSX from "xlsx";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSlug } from "@/lib/utils";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: "" });

  let imported = 0;
  for (const row of rows) {
    const brandName = String(row.brand || row.Brand || "").trim();
    const name = String(row.name || row.Name || "").trim();
    if (!brandName || !name) continue;

    const brand = await prisma.brand.upsert({
      where: { slug: toSlug(brandName) },
      update: { name: brandName },
      create: { name: brandName, slug: toSlug(brandName), country: row.brandCountry || row.country || null }
    });

    const slug = String(row.slug || "").trim() || toSlug(`${brandName}-${name}`);
    await prisma.product.upsert({
      where: { slug },
      update: mapRow(row, brand.id, name, slug),
      create: mapRow(row, brand.id, name, slug)
    });
    imported++;
  }

  return NextResponse.redirect(new URL(`/admin/products?imported=${imported}`, request.url));
}

function list(value: any) {
  return String(value || "").split(/[,;\n]/).map((v) => v.trim()).filter(Boolean);
}

function intList(value: any) {
  return list(value).map((v) => Number.parseInt(v, 10)).filter((n) => Number.isFinite(n));
}

function rub(value: any) {
  if (value === "" || value === null || value === undefined) return null;
  const n = Number(String(value).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? Math.round(n * 100) : null;
}

function integer(value: any) {
  if (value === "" || value === null || value === undefined) return null;
  const n = Number.parseInt(String(value), 10);
  return Number.isFinite(n) ? n : null;
}

function nullable(value: any) {
  const v = String(value || "").trim();
  return v.length ? v : null;
}

function mapRow(row: Record<string, any>, brandId: string, name: string, slug: string) {
  return {
    brandId,
    name,
    slug,
    year: integer(row.year),
    perfumer: nullable(row.perfumer),
    concentration: nullable(row.concentration),
    brandCountry: nullable(row.brandCountry || row.country),
    gender: nullable(row.gender),
    aromaType: nullable(row.aromaType || row.type),
    description: nullable(row.description),
    history: nullable(row.history),
    longevity: nullable(row.longevity),
    sillage: nullable(row.sillage),
    seasonality: list(row.seasonality || row.season),
    topNotes: list(row.topNotes),
    heartNotes: list(row.heartNotes),
    baseNotes: list(row.baseNotes),
    similarAromas: list(row.similarAromas),
    sources: list(row.sources),
    imageUrl: nullable(row.imageUrl),
    pricePerMlCents: rub(row.pricePerMl),
    fullBottleMl: integer(row.fullBottleMl),
    fullBottlePriceCents: rub(row.fullBottlePrice),
    availableVolumesMl: intList(row.availableVolumesMl).length ? intList(row.availableVolumesMl) : [1,2,3,5,10,15,20,30,50],
    stockMl: integer(row.stockMl) || 0,
    stockBottles: integer(row.stockBottles) || 0,
    isPublished: String(row.isPublished).toLowerCase() === "true" || String(row.isPublished) === "1"
  };
}
