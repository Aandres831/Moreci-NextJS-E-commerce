'use client'
import Buttonsa from '@/components/Buttonsa'
import Link from 'next/link'

const handleClick = () =>{
  console.log("se hace click papu");
  alert("se hace click papu");
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-600 text-white p-6">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-extrabold tracking-wide mb-6 drop-shadow-lg">
          Welcome to <span className="text-green-300">Moreci Shop</span>
        </h1>
        <p className="text-lg text-green-100 mb-10 leading-relaxed">
          Discover the power of natural style  
          Shop with purpose, live with elegance.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
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
    </main>
  )
}
