"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
        });

        if (res?.error) {
        setError("Invalid email or password");
        } else {
        router.push("/dashboard/products");
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 p-6">

        {/* Caja del login */}
        <div className="w-full max-w-md bg-emerald-700 bg-opacity-30 backdrop-blur-md rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-extrabold mb-6 text-center drop-shadow-lg">
            Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                required
                className="w-full px-4 py-3 rounded-lg bg-emerald-800 placeholder-green-200 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
                required
                className="w-full px-4 py-3 rounded-lg bg-emerald-800 placeholder-green-200 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
                type="submit"
                className="w-full py-3 bg-green-400 hover:bg-green-300 text-emerald-950 font-bold rounded-full transition-transform transform hover:scale-105 shadow-lg"
            >
                Login
            </button>

            {/* Botones debajo del Login */}
            <div className="mt-4 flex gap-4 justify-center">
                <button
                type="button"
                onClick={() => signIn("google",{ callbackUrl: "/registerProduct" }, { prompt: "select_account" })}
                className="px-4 py-2 bg-green-400 hover:bg-green-300 text-emerald-950 font-bold rounded-full transition-transform transform hover:scale-105 shadow-lg"
                >
                Sign in with Google
                </button>

                <Button label="Back to Home" href="/" />
            </div>
            </form>

            {error && (
            <p className="mt-4 text-red-400 text-center">{error}</p>
            )}
        </div>
        </main>
    );
}
