"use client";
import { useState } from "react";

export default function CustomSelect({ label, name, value, onChange, options }: any) {

    const [open, setOpen] = useState(false);

    const handleSelect = (val: string) => {
        onChange({ target: { name, value: val } });
        setOpen(false);
    };

    return (
        <div className="relative">
            <label className="block mb-1 text-sm text-green-100">{label}</label>

            <div
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-2 rounded-lg bg-green-700/50 border border-green-400/40 text-white cursor-pointer 
                           flex justify-between items-center select-none"
            >
                <span>{value}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {open && (
                <div
                    className="absolute z-20 mt-1 w-full rounded-lg overflow-hidden bg-green-800/90 border border-green-500/60 
                                backdrop-blur-sm shadow-lg"
                >
                    {options.map((option: string) => (
                        <div
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-2 text-green-100 cursor-pointer hover:bg-green-600/40"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
