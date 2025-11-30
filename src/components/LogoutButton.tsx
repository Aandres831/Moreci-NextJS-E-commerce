"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/"); // Te lleva al home después del logout
    };

    return (
        <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-400 hover:bg-red-300 text-emerald-950 font-bold rounded-full transition-transform transform hover:scale-105 shadow-lg"
        >
        Logout
        </button>
    );
}
