// app/api/auth/[...nextauth]/route.ts
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // Query user from Vercel Postgres
        const { rows } = await sql`
          SELECT * FROM users WHERE email = ${credentials.email}
        `;

        const user = rows[0];
        if (!user) {
          throw new Error("User not found");
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login page on error
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };