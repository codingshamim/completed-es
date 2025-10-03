import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserModel } from "./app/backend/models/UserModel";
import { dbConnect } from "./app/backend/connection/dbConnect";
import bcrypt from "bcrypt";
import { authConfig } from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  secret: process.env.AUTH_SECRET,

  providers: [
    CredentialsProvider({
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          await dbConnect();
          const user = await UserModel.findOne({ phone: credentials.phone });

          if (!user) {
            return null; // Return null instead of throwing
          }

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isMatch) {
            return null; // Return null instead of throwing
          }

          // ✅ Return user data
          return {
            id: user._id.toString(),
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }

      return session;
    },
  },
});
