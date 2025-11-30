import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            // Aquí tu lógica de autenticación con credenciales
            // Por ahora retornamos un usuario mock
            if (credentials?.email === "test@test.com" && credentials?.password === "password") {
            return {
                id: "1",
                email: "test@test.com",
                name: "Test User"
            };
            }
            return null;
        }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async session({ session, token }) {
        if (token) {
            session.user.id = token.sub!;
        }
        return session;
        },
        async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
        }
        return token;
        }
    }
};