"use client";

import { useState } from "react";

export default function CronAdminPage() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkStatus = async () => {
        setLoading(true);
        setError(null);
        try {
        const response = await fetch('/api/cron/status');
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setStatus(data);
        } catch (error: any) {
        console.error('Error checking status:', error);
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };

    const runCron = async () => {
        setLoading(true);
        setError(null);
        try {
        const response = await fetch('/api/cron/process');
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setStatus(data);
        } catch (error: any) {
        console.error('Error running cron:', error);
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Administración de Cron Jobs</h1>
        
        <div className="flex gap-4 mb-6">
            <button
            onClick={checkStatus}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
            >
            Ver Estado
            </button>
            
            <button
            onClick={runCron}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50 hover:bg-green-600"
            >
            Ejecutar Cron
            </button>
        </div>

        {loading && <p className="text-blue-500">Cargando...</p>}
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
            </div>
        )}
        
        {status && (
            <div className="bg-gray-100 p-4 rounded">
            <pre className="whitespace-pre-wrap">{JSON.stringify(status, null, 2)}</pre>
            </div>
        )}
        </div>
    );
}