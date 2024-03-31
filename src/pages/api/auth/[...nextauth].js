import { Session } from "next-auth";
import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        token.user_id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user_id = token.user_id;
      return session;
    },
  },
});
