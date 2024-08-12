import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo", type: "text", placeholder: "example@gmail.com" },
                password: { label: "Contraseña", type: "password", placeholder: "*****" }
            },
            async authorize(credentials, req) {
                console.log("Credentials:", credentials);

                // Find user by email
                const userFound = await prisma.personas.findFirst({
                    where: {
                        correo: credentials.email // Asegúrate de que este campo coincida con tu base de datos
                    }
                });

                if (!userFound) {
                    console.log("User not found");
                    throw new Error('Usuario no existe');
                }

                console.log("User found:", userFound);

                // Compare passwords
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

                if (!matchPassword) {
                    console.log("Password no coincide");
                    throw new Error('contraseña incorrecta');;
                }

                console.log("Password coincide");

                return {
                    id: userFound.identificacion,
                    name: userFound.nombres,
                    email: userFound.correo,
                    role: userFound.rol,  // Asumiendo que tienes un campo 'role' en tu base de datos
                };
            },
        }),
    ],
    pages:{
        signIn:"/auth/login"
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.role = token.role;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


