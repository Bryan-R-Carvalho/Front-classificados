import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req, ev) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (token && token.role === "fornecedor" && token.aprovado) {
    return NextResponse.next();
  }

  if (!token || token.role != "fornecedor" || !token.aprovado) {
    return NextResponse.redirect("http://localhost:3000/");
  }
}
