import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

const handler = NextAuth({
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

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

            return { id: user._id.toString(), name: user.name, email: user.email };
        },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
        await connectDB();

        if (account?.provider === "google") {
            let existingUser = await User.findOne({ email: user.email });

            if (!existingUser) {
            existingUser = await User.create({
                name: user.name,
                email: user.email,
                image: user.image,
                provider: "google",
            });
            }

            user.id = existingUser._id.toString();
        }

        return true;
        },

        async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
        }
        return token;
        },

        async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string;
        }
        return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };