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
        let user = res.data;
        if (res.status === 200 && user) {
          if (user.tipoUsuario === "fornecedor") {
            const res = await api.get("/fornecedor/email=" + user.login);
            user = res.data;
            return user;
          } else {
            return user;
          }
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
          fornecedorId: user.id,
          name: user.nome,
          whatsapp: user.whatsapp,
          telefone: user.telefone,
          site: user.site,
          endereco: user.endereco,
          instagram: user.instagram,
          delivery: user.delivery,
          aprovado: user.aprovado,
          usuarioId: user.usuarioId,
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
      session.user.fornecedorId = token.fornecedorId;
      session.user.name = token.name;
      session.user.whatsapp = token.whatsapp;
      session.user.telefone = token.telefone;
      session.user.site = token.site;
      session.user.endereco = token.endereco;
      session.user.instagram = token.instagram;
      session.user.delivery = token.delivery;
      session.user.aprovado = token.aprovado;
      session.user.usuarioId = token.usuarioId;
      session.user.role = token.role;
      return session;
    },
  },
});
