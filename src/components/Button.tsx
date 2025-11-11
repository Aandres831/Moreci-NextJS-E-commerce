"use client";
import { useRouter } from "next/navigation";

interface ButtonProps {
    label: string;
    href?: string;
    className?: string;
}

export default function Button({ label, href, className }: ButtonProps) {
    const router = useRouter();

    return (
        <button
        onClick={() => href && router.push(href)}
        style={{
            backgroundColor: "#22c55e",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.2s",
        }}
        onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#16a34a")
        }
        onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#22c55e")
        }
        >
        {label}
        </button>
    );
}
