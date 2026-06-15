import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  productSlug: z.string(),
  volumeLabel: z.string(),
  volumeMl: z.number().nullable().optional(),
  priceCents: z.number().int().nonnegative(),
  channel: z.enum(["TELEGRAM", "WHATSAPP"])
});

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  const product = await prisma.product.findUnique({ where: { slug: body.productSlug } });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const order = await prisma.order.create({
    data: {
      productId: product.id,
      volumeLabel: body.volumeLabel,
      volumeMl: body.volumeMl ?? null,
      priceCents: body.priceCents,
      channel: body.channel
    }
  });

  return NextResponse.json({ ok: true, id: order.id });
}
