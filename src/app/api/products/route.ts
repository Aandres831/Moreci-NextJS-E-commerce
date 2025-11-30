import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      Product.find({})
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Product.countDocuments()
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    return Response.json({
      products: products.map(product => ({
        _id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description,
        images: product.images,
        category: product.category,
        stock: product.stock,
        sku: product.sku
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json(
      { error: 'Error fetching products' },
      { status: 500 }
    );
  }
}