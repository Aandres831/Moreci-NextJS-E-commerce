"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    // Verificar autenticación manualmente (opcional)
    useEffect(() => {
        // Puedes verificar si hay token en localStorage
        const token = localStorage.getItem('auth-token');
        if (!token) {
            router.push("/dashboard/products");
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600">
            {/* Mismo contenido del layout pero sin useSession */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 py-4 px-6 shadow-lg">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Admin Dashboard
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/"
                            className="px-4 py-2 border border-green-300 text-green-100 rounded-lg hover:bg-white/10 transition text-sm"
                        >
                            View Store
                        </Link>
                    </div>
                </div>
            </div>

            {/* Resto del layout igual... */}
            <div className="max-w-7xl mx-auto py-6 px-4">
                <div className="flex flex-wrap gap-3 mb-8">
                    <Link
                        href="/dashboard/products"
                        className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition shadow-lg text-sm font-medium"
                    >
                        📦 Products
                    </Link>
                    <Link
                        href="/dashboard/products/create"
                        className="px-5 py-2.5 border-2 border-green-300 text-green-100 rounded-lg hover:bg-white/10 transition text-sm font-medium"
                    >
                        ＋ New Product
                    </Link>
                    <Link
                        href="/products"
                        className="px-5 py-2.5 border-2 border-green-300 text-green-100 rounded-lg hover:bg-white/10 transition text-sm font-medium"
                    >
                        🛍️ Public Store
                    </Link>
                    <Link
                        href="/"
                        className="px-5 py-2.5 border-2 border-green-300 text-green-100 rounded-lg hover:bg-white/10 transition text-sm font-medium"
                    >
                        🏠 Home
                    </Link>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl">
                    {children}
                </div>
            </div>
        </div>
    );
}