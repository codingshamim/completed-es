import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "email public_profile",
        },
      },
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          await dbConnect();
          const user = await UserModel.findOne({ phone: credentials.phone });
          if (!user) return null;

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isMatch) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.phone,
            role: user.role,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          await dbConnect();

          const email = profile?.email;
          if (!email) {
            return false;
          }

          let existingUser = await UserModel.findOne({ phone: email });

          if (!existingUser) {
            existingUser = await UserModel.create({
              name: profile.name || `${account.provider} User`,
              role: "user",
              phone: email,
              password: await bcrypt.hash(
                Math.random().toString(36).slice(2),
                10
              ),
              isVerified: true,
            });
          }

          user.id = existingUser._id.toString();
          user.name = existingUser.name;
          user.email = existingUser.phone;
          user.role = existingUser.role;

          return true;
        } catch (error) {
          return false;
        }
      }

      return true;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl + "/";
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
