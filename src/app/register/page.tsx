"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("User registered successfully! ");
            setTimeout(() => router.push("/login"), 1500);
        } else {
            setMessage(data.message || "Error registering user ");
        }
        } catch (error) {
        setMessage("Server error, please try again later ");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md text-center border border-green-400/40">
            <h1 className="text-3xl font-bold mb-6 text-green-200">
            Create an Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
                <label className="block mb-1 text-sm text-green-100">
                Full Name
                </label>
                <input
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                value={form.name}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40 placeholder-green-200 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm text-green-100">
                Email Address
                </label>
                <input
                type="email"
                name="email"
                placeholder="you@domain.com"
                onChange={handleChange}
                value={form.email}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40 placeholder-green-200 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
                />
            </div>

            <div>
                <label className="block mb-1 text-sm text-green-100">Password</label>
                <input
                type="password"
                name="password"
                placeholder="*******"
                onChange={handleChange}
                value={form.password}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-green-400/40 placeholder-green-200 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
                />
            </div>

            <Button  label="Register" href="/" className="w-full mt-4" />
            </form>

            {message && (
            <p
                className={`mt-4 text-sm ${
                message.includes("successfully")
                    ? "text-green-300"
                    : "text-red-400"
                }`}
            >
                {message}
            </p>
            )}

            <div className="mt-6">
            <Button label="Back to Home" href="/" />
            </div>
        </div>
        </div>
    );
}

