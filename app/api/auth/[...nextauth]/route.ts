import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            await connectDB();

            const user = await User.findOne({ email: credentials?.email });
            if (!user) throw new Error("User not found");

            const isPasswordValid = await bcrypt.compare(
            credentials!.password,
            user.password
            );
            if (!isPasswordValid) throw new Error("Invalid password");

            return { id: user._id, name: user.name, email: user.email };
        },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
