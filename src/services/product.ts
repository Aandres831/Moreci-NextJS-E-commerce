import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import connectDB from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        await connectDB();

        const newProduct = await Product.create(body);

        return NextResponse.json({
            message: 'Product created successfully',
            product: newProduct,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Error creating product' },
            { status: 500 }
        );
    }
}
