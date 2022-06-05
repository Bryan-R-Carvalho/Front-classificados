import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req, ev) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  console.log(token.aprovado);

  if (token && token.role === "fornecedor") {
    return NextResponse.next();
  }

  if (!token || token.role != "fornecedor") {
    return NextResponse.redirect("http://localhost:3000/");
  }
}
