import type { Metadata } from "next";

export const metadata: Metadata = { title: "Админ-панель" };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
