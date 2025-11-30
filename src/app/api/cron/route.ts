import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    return Response.json({ 
        message: 'Cron endpoint - Usar /api/cron/process para ejecutar manualmente',
        status: 'active',
        endpoints: {
        status: '/api/cron/status',
        process: '/api/cron/process'
        }
    });
}