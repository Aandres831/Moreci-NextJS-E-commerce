import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export const config = {
    api: {
        bodyParser: false, // Necesario para recibir archivos
    },
};

// Función para subir a Cloudinary
const uploadToCloudinary = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: (() => {
                const formData = new FormData();
                formData.append("file", new Blob([buffer]));
                formData.append("upload_preset", uploadPreset || "");
                return formData;
            })(),
        }
    );

    const data = await res.json();
    if (!data.secure_url) {
        throw new Error("Cloudinary upload failed");
    }

    return data.secure_url;
};

//  POST — Crear producto
export async function POST(req: Request) {
    try {
        await connectDB();

        const formData = await req.formData();

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));
        const category = formData.get("category") as string;

        const imageFile = formData.get("image") as File | null;

        let imageUrl = "";

        // Si hay imagen → subir a Cloudinary
        if (imageFile) {
            imageUrl = await uploadToCloudinary(imageFile);
        }

        // Guardar en DB
        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            image: imageUrl,
        });

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

//  GET — Listar productos
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

