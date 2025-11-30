"use client";
import { useRouter } from "next/navigation";

interface ButtonProps {
    label: string;
    href?: string;
    className?: string;
    disabled?: boolean;
}

export default function Button({ label, href, className, disabled }: ButtonProps) {
    const router = useRouter();

    return (
        <button
        onClick={() => href && !disabled && router.push(href)}
        disabled={disabled}
        style={{
            backgroundColor: disabled ? "#9ca3af" : "#22c55e",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: disabled ? "not-allowed" : "pointer",
            fontWeight: "600",
            transition: "0.2s",
            opacity: disabled ? 0.6 : 1,
        }}
        onMouseOver={(e) => {
            if (!disabled) {
                (e.target as HTMLButtonElement).style.backgroundColor = "#16a34a";
            }
        }}
        onMouseOut={(e) => {
            if (!disabled) {
                (e.target as HTMLButtonElement).style.backgroundColor = "#22c55e";
            }
        }}
        className={className}
        >
        {label}
        </button>
    );
}