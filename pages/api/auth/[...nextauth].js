import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../api";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      /*credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },*/
      async authorize(credentials, req) {
        const res = await api.post(
          "/usuario/sessions",
          JSON.stringify(credentials)
        );
        const user = res.data;
        if (res.status === 200 && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { jwt: true },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          name: user.nome,
          role: user.tipoUsuario,
        };
      }
      return token;
    },
    redirect({ baseUrl }) {
      return baseUrl;
    },

    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken;
      session.user.name = token.name;
      session.user.role = token.role;
      return session;
    },
  },
});
