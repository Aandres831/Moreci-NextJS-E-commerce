import connectDB from '@/lib/mongodb';
import AbandonedCart from '@/models/AbandonedCart';

export async function addAbandonedCart(userEmail: string, cartItems: any[], userName?: string) {
    if (typeof window !== 'undefined') return;
    
    try {
        await connectDB();
        
        const existingCart = await AbandonedCart.findOne({ userEmail });
        
        if (existingCart) {
        existingCart.items = cartItems;
        existingCart.updatedAt = new Date();
        await existingCart.save();
        } else {
        await AbandonedCart.create({
            userEmail,
            userName: userName || 'Cliente',
            items: cartItems,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        }
        
        console.log(`🛒 Carrito abandonado guardado en DB para: ${userEmail}`);
    } catch (error) {
        console.error('Error guardando carrito abandonado:', error);
    }
    }

    export async function removeAbandonedCart(userEmail: string) {
    if (typeof window !== 'undefined') return;
    
    try {
        await connectDB();
        await AbandonedCart.deleteOne({ userEmail });
        console.log(`🛒 Carrito removido de DB: ${userEmail}`);
    } catch (error) {
        console.error('Error removiendo carrito abandonado:', error);
    }
    }

    export async function getAbandonedCarts() {
    if (typeof window !== 'undefined') return [];
    
    try {
        await connectDB();
        return await AbandonedCart.find({});
    } catch (error) {
        console.error('Error obteniendo carritos abandonados:', error);
        return [];
    }
    }

    export async function processAbandonedCarts() {
    if (typeof window !== 'undefined') return [];
    
    try {
        await connectDB();
        
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        const cartsToProcess = await AbandonedCart.find({
        updatedAt: { $lt: twentyFourHoursAgo }
        });
        
        console.log(`📧 Encontrados ${cartsToProcess.length} carritos para procesar`);
        return cartsToProcess;
    } catch (error) {
        console.error('Error procesando carritos abandonados:', error);
        return [];
    }
    }

    export async function cleanupProcessedCarts(userEmails: string[]) {
    if (typeof window !== 'undefined') return;
    
    try {
        await connectDB();
        await AbandonedCart.deleteMany({ 
        userEmail: { $in: userEmails } 
        });
        console.log(`🧹 Limpiados ${userEmails.length} carritos procesados`);
    } catch (error) {
        console.error('Error limpiando carritos procesados:', error);
    }
}