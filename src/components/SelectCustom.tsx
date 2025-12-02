"use client";
import { useState } from "react";

interface CustomSelectProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: any) => void;
    options: string[];
    error?: string;
}

export default function CustomSelect({
    label,
    name,
    value,
    onChange,
    options,
    error
}: CustomSelectProps) {
    const [open, setOpen] = useState(false);

    const handleSelect = (val: string) => {
        onChange({ target: { name, value: val } });
        setOpen(false);
    };

    const containerClassName = `relative ${error ? 'mb-2' : ''}`;

    const selectClassName = `
    w-full px-4 py-2 rounded-lg border text-white cursor-pointer 
    flex justify-between items-center select-none transition-colors
    ${error
            ? 'bg-red-500/20 border-red-500 hover:bg-red-500/30'
            : 'bg-green-700/50 border-green-400/40 hover:bg-green-600/50'
        }
  `;

    return (
        <div className={containerClassName}>
            <label className="block mb-1 text-sm text-green-100">{label}</label>

            <div
                onClick={() => setOpen(!open)}
                className={selectClassName}
            >
                <span className={error ? 'text-red-200' : 'text-white'}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
                <svg
                    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""} ${error ? 'text-red-200' : 'text-white'
                        }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {error && (
                <p className="text-red-300 text-sm mt-1">{error}</p>
            )}

            {open && (
                <div
                    className="absolute z-20 mt-1 w-full rounded-lg overflow-hidden bg-green-800/95 border border-green-500/60 
                    backdrop-blur-sm shadow-lg max-h-60 overflow-y-auto"
                >
                    {options.map((option: string) => (
                        <div
                            key={option}
                            onClick={() => handleSelect(option)}
                            className={`
                px-4 py-2 cursor-pointer transition-colors
                ${option === value
                                    ? 'bg-green-600/70 text-white'
                                    : 'text-green-100 hover:bg-green-600/40'
                                }
            `}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </div>
                    ))}
                </div>
            )}

            {/* Overlay para cerrar al hacer clic fuera */}
            {open && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
}