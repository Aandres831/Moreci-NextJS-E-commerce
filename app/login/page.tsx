"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
        router.push("/");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
            />
            <button type="submit" style={{ width: "100%" }}>
            Login
            </button>
        </form>
        {error && <p>{error}</p>}
        </div>
    );
}
