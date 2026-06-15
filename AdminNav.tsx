"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "@prisma/client";

export async function updateOrderStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "NEW") as OrderStatus;
  if (!id) return;
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
}
