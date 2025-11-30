import { NextRequest } from 'next/server';
import { getAbandonedCarts } from '@/lib/cronService';

export async function GET(request: NextRequest) {
    try {
        const abandonedCarts = await getAbandonedCarts();
        
        return Response.json({
        status: 'active',
        abandonedCartsCount: abandonedCarts.length,
        abandonedCarts: abandonedCarts.map(cart => ({
            userEmail: cart.userEmail,
            userName: cart.userName,
            itemsCount: cart.items.length,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt
        })),
        timestamp: new Date().toISOString()
        });
    } catch (error) {
        return Response.json(
        { error: 'Error obteniendo estado' },
        { status: 500 }
        );
    }
}