"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

        const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        });

        const data = await res.json();
        if (res.ok) {
        setMessage("User registered successfully");
        router.push("/login");
        } else {
        setMessage(data.message || "Error registering user");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
            />
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
            Register
            </button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
}
