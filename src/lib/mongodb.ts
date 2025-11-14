import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Por favor define la variable MONGODB_URI en el archivo .env.local");
}

let isConnected = false;

// Conecta a la base de datos MongoDB
export default async function connectDB() {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(MONGODB_URI as string);
        isConnected = !!db.connections[0].readyState;
        console.log(" MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


