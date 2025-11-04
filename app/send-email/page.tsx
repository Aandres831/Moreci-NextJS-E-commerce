'use client'

import { useState } from 'react'

export default function SendEmailPage() {
    const [form, setForm] = useState({
        to: '',
        subject: '',
        message: '',
    })
    const [status, setStatus] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        try {
        const res = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        const data = await res.json()
        if (data.success) {
            setStatus('success')
            setForm({ to: '', subject: '', message: '' })
        } else {
            setStatus('error')
        }
        } catch (error) {
        setStatus('error')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-green-700">Send Test Email</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1 font-medium">To</label>
                <input
                type="email"
                name="to"
                value={form.to}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Subject</label>
                <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400"
                />
            </div>

            <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
                {status === 'sending' ? 'Sending...' : 'Send Email'}
            </button>
            </form>

            {status === 'success' && (
            <p className="text-green-600 text-center mt-4">✅ Email sent successfully!</p>
            )}
            {status === 'error' && (
            <p className="text-red-600 text-center mt-4">❌ Error sending email. Check console.</p>
            )}
        </div>
        </div>
    )
}
