import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-graphite-50 p-4">
      <div className="mx-auto flex min-h-screen max-w-md items-center">
        <Suspense fallback={<div className="text-sm text-graphite-500">Загрузка...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
