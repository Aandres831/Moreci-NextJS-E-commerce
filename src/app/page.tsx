'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/Card'
import { productService } from '@/services/product'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts(1, 4) // Mostrar solo 4 productos en home
        setProducts(data.products || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide mb-6 drop-shadow-lg">
          Welcome to <span className="text-green-300">Moreci Shop</span>
        </h1>
        <p className="text-lg text-green-100 mb-10 leading-relaxed max-w-2xl">
          Discover the power of natural style. Shop with purpose, live with elegance.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link
            href="/login"
            className="bg-green-400 hover:bg-green-300 text-emerald-950 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="border border-green-300 hover:bg-green-300 hover:text-emerald-950 text-green-100 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>


      {/* Featured Products Section */}
      <div className="bg-white/10 backdrop-blur-sm py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-green-200">
            Featured Products
          </h2>
          <p className="text-green-100 text-center mb-8">
            Browse our collection. No account needed to view!
          </p>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
              <p className="mt-4 text-green-200">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-green-200 py-12">No products available yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* View All Products Button */}
              <div className="text-center mt-10">
                <Link
                  href="/products"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg"
                >
                  View All Products
                </Link>
                <p className="text-green-200 text-sm mt-2">
                  Browse our full catalog of amazing products
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-200">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm">
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-bold mb-3">No Account Needed</h3>
            <p className="text-green-100">
              Browse and view products immediately. Create an account only when you're ready to buy.
            </p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-3">Fast Shipping</h3>
            <p className="text-green-100">
              Get your products delivered quickly with our reliable shipping partners.
            </p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl backdrop-xl backdrop-blur-sm">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
            <p className="text-green-100">
              Shop with confidence using our secure PayPal integration for all transactions.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-16 px-6 bg-gradient-to-r from-emerald-800 to-emerald-900">
        <h2 className="text-3xl font-bold mb-6 text-green-200">
          Ready to Shop?
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/products"
            className="bg-green-400 hover:bg-green-300 text-emerald-950 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>
          <Link
            href="/register"
            className="border border-green-300 hover:bg-green-300 hover:text-emerald-950 text-green-100 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg"
          >
            Create Account
          </Link>
        </div>
        <p className="text-green-200 mt-6 max-w-2xl mx-auto">
          Create an account to save your cart, track orders, and get personalized recommendations.
        </p>
        <div className="mt-4">
          <Link
            href="/dashboard/products"
            className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white rounded-lg hover:from-emerald-800 hover:to-emerald-900 transition shadow-lg font-medium"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}