import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import Link from "next/link";
import api from "./api/api";
import { signIn, getCsrfToken } from "next-auth/react";
import { useToast } from "../context/ToastContext";

export default function Cadastrar() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { addToast } = useToast();

  const handleSignUp = useCallback(
    async (data) => {
      console.log(data);
      data.telefone = data.telefone.replace(/\D/g, "");
      data.whatsapp = data.whatsapp.replace(/\D/g, "");
      data.usuario = {
        login: data.email,
        senha: data.senha,
        nome: data.nome,
        tipoUsuario: "fornecedor",
      };
      try {
        const response = await api.post("/fornecedor/", JSON.stringify(data));
        console.log(response);
        if (response.status === 200) {
          addToast({
            type: "success",
            title: "Cadastro realizado com sucesso!",
            description: "Agora você pode fazer login",
          });
          signIn("credentials", data.usuario);
        } else {
          addToast({
            type: "error",
            title: "Erro ao cadastrar",
            description: "Tente novamente mais tarde",
          });
        }
      } catch (err) {
        addToast({
          type: "error",
          title: "Erro ao realizar o cadastro",
          description: "Verifique seus dados e tente novamente",
        });
      }
    },
    [signIn, addToast]
  );

  function formatPhoneNumber(e) {
    var phone = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

    e.target.value = !phone[2]
      ? phone[1]
      : "(" + phone[1] + ") " + phone[2] + (phone[3] ? "-" + phone[3] : "");
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <img
            onClick={() => router.push("/")}
            className="mx-auto h-12 w-auto cursor-pointer"
            src="https://i.imgur.com/xDsZIrl.png"
            alt="logo"
          />
          <h1 className="my-1 text-2xl">Bem-vindo ao Classificados</h1>
          <h2 className="my-1 text-sm">
            apenas em alguns clicks e nós começamos
          </h2>
        </div>
        <div id="cadastrar">
          <form
            action="/api/auth/callback/credentials"
            method="POST"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <div className="-space-y-px">
              <div>
                <input
                  {...register("nome")}
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="nome"
                  required
                  className="form-control"
                  placeholder="Nome"
                />
              </div>
              <div>
                <input
                  {...register("email")}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  {...register("telefone")}
                  onChange={formatPhoneNumber}
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="telefone"
                  required
                  className="form-control"
                  placeholder="Telefone (ex: (99) 99999-9999)"
                  minLength="14"
                  maxLength="15"
                />
              </div>
              <div>
                <input
                  {...register("whatsapp")}
                  onChange={formatPhoneNumber}
                  id="whatsapp"
                  type="tel"
                  autoComplete="whatsapp"
                  required
                  className="form-control"
                  placeholder="Whatsapp (ex: (99) 99999-9999)"
                  minLength="14"
                  maxLength="15"
                />
              </div>
              <div>
                <input
                  {...register("site")}
                  id="site"
                  name="site"
                  type="url"
                  autoComplete="site"
                  required
                  className="form-control"
                  placeholder="Site (ex: http://www.exemplo.com)"
                />
              </div>
              <div>
                <input
                  {...register("instagram")}
                  id="instagram"
                  name="instagram"
                  type="text"
                  autoComplete="instagram"
                  required
                  className="form-control"
                  placeholder="Instagram (ex: exemplo)"
                />
              </div>
              <div>
                <input
                  {...register("endereco")}
                  id="endereco"
                  name="endereco"
                  type="text"
                  autoComplete="endereco"
                  required
                  className="form-control"
                  placeholder="Endereço"
                />
              </div>
              <div>
                <input
                  {...register("senha")}
                  id="senha"
                  name="senha"
                  type="password"
                  autoComplete="senha"
                  minLength="8"
                  required
                  className="form-control"
                  placeholder="Senha"
                />
                <div className="">
                  <label className="flex justify-end text-sm text-gray-500">
                    8 ou mais caracteres
                  </label>
                </div>
              </div>
              <div>
                <input
                  id="delivery"
                  type="checkbox"
                  className="w-3.5 h-3.5"
                  {...register("delivery")}
                  nome="delivery"
                />
                <label htmlFor="deivery" className="text-sm text-gray-500 pl-1">
                  Realiza delivery?
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 my-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Cadastrar-se
              </button>
              <div className="w-full text-center border-b border-solid leading-[0.1em] my-[20px] mx-0 py-[1.3px]"></div>
              <div className="flex text-center justify-center ">
                <span className="text-gray-400">Já tem uma conta?</span>
                <div className="mx-2 font-medium text-gray-600 hover:text-gray-500">
                  <Link href="/login">Entrar</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
