"use client";

import Link from "next/link";

export interface ButtonProps {
    label: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function Button({
    label,
    href,
    onClick,
    disabled = false,
    className = "",
    type = "button",
}: ButtonProps) {
    const baseClass = `
        px-4 py-2 rounded-lg font-medium transition
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
    `;

    // Si el botón es un link
    if (href) {
        return (
            <Link href={href} className={baseClass}>
                {label}
            </Link>
        );
    }

    // Si es botón normal
    return (
        <button
            type={type}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            className={baseClass}
        >
            {label}
        </button>
    );
}
