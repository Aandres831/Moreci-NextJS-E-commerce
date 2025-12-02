import Link from 'next/link';
export default function Footer() {
    return (
        <footer className="w-full bg-green-900/80 text-green-200 py-6 mt-10 border-t border-green-700/40 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-green-300/80">
                    © {new Date().getFullYear()} Moreci Shop — All rights reserved
                </p>
                <div className="flex gap-6 text-sm">
                    <Link href="/" className="hover:text-white transition">
                        Home
                    </Link>
                    <Link href="/products" className="hover:text-white transition">
                        Products
                    </Link>
                    <Link href="/contact" className="hover:text-white transition">
                        Contact
                    </Link>
                    <Link
                        href="/dashboard/products"
                        className="hover:text-white transition"
                    >
                        Admin Dashboard
                    </Link>
                </div>
            </div>
        </footer>
    );
}
