"use client";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = [];
    const showPages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
        startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            {/* Botón Anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/20 border border-green-400/40 text-green-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition"
            >
                Anterior
            </button>

            {/* Números de página */}
            <div className="flex gap-2">
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center border rounded-lg transition ${currentPage === page
                                ? 'bg-green-600 text-white border-green-500'
                                : 'bg-white/20 border-green-400/40 text-green-200 hover:bg-white/30'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Botón Siguiente */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/20 border border-green-400/40 text-green-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition"
            >
                Siguiente
            </button>
        </div>
    );
}