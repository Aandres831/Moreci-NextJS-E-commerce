import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export default async function DashboardPage() {
  // Verifica sesión del usuario (SSR)
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login"); // si NO está autenticado -> redirige al login
    }

    return (
        <main className="flex flex-col gap-6 p-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>

        <section className="p-4 rounded-lg border shadow-sm bg-white dark:bg-neutral-900">
            <h2 className="text-xl font-medium">Bienvenido/a</h2>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
            Usuario: <strong>{session.user?.name}</strong>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
            Email: <strong>{session.user?.email}</strong>
            </p>
            {session.user?.role && (
            <p className="text-gray-600 dark:text-gray-300">
                Rol: <strong>{session.user?.role}</strong>
            </p>
            )}
        </section>
        </main>
    );
}
