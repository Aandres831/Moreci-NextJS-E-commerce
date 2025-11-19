import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
// import axios from "axios";

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json(); 

        const newProduct = await Product.create(body);

        return NextResponse.json({
        message: "Product created successfully",
        product: newProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
        { error: "Error creating product" },
        { status: 500 }
        );
    }
}

// GET: List products
export async function GET() {
    try {
        await connectDB();
        const products = await Product.find();

        return NextResponse.json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
        { error: "Error fetching products" },
        { status: 500 }
        );
    }
}

