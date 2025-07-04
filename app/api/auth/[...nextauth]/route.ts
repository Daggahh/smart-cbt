import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }
        
        try {
          console.log("Attempting to authenticate:", credentials.email);
          
          // Replace with Drizzle query for user lookup
          const user = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.email, credentials.email),
          });
          
          if (!user) {
            console.log("User not found:", credentials.email);
            return null;
          }
          
          if (!user.is_active) {
            console.log("User is not active:", credentials.email);
            return null;
          }
          
          console.log("User found:", {
            email: user.email,
            role: user.role,
            emailVerified: user.email_verified,
            isActive: user.is_active
          });
          
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );
          
          console.log("Password validation result:", isValid);
          console.log("Provided password:", credentials.password);
          console.log("Stored hash:", user.password_hash);
          
          if (!isValid) {
            console.log("Invalid password for user:", credentials.email);
            return null;
          }
          
          // Check if student needs email verification
          if (user.role === "student" && !user.email_verified) {
            console.log("Student email not verified:", credentials.email);
            return null;
          }
          
          console.log("Authentication successful for:", credentials.email);
          
          return {
            id: user.id,
            email: user.email,
            name: user.first_name + " " + user.last_name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/student/login",
    error: "/auth/student/login",
  },
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };