import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { signIn, getCsrfToken } from "next-auth/react";
import { useToast } from "../context/ToastContext";
import api from "./api/api";

export default function Login({ csrfToken }) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { addToast } = useToast();

  async function handleLogin(data) {
    try {
      const response = await api.post(
        "/usuario/sessions",
        JSON.stringify(data)
      );
      signIn("credentials", data);
    } catch (error) {
      addToast({
        type: "alert",
        title: "Usuário ou senha inválidos",
        description: error.message,
      });
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            onClick={() => router.push("/")}
            className="mx-auto h-12 w-auto cursor-pointer"
            src="https://i.imgur.com/xDsZIrl.png"
            alt="logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acesse a sua conta
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="/api/auth/callback/credentials"
          method="POST"
          onSubmit={handleSubmit(handleLogin)}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="login" className="sr-only">
                Email
              </label>
              <input
                {...register("login")}
                id="login"
                name="login"
                type="text"
                autoComplete="login"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="E-mail"
              />
            </div>
            <div>
              <label htmlFor="senha" className="sr-only">
                Senha
              </label>
              <input
                {...register("senha")}
                id="senha"
                name="senha"
                type="password"
                autoComplete="senha"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-gray-600 hover:text-gray-500"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
              Entrar
            </button>
            {/*<h2 className='w-full text-center border-b border-solid leading-[0.1em] my-[20px] mx-0 py-[1.3px]'><span className='my-0 mx-[10px] px-2 bg-gray-50 text-gray-400'>ou</span></h2>
                        <button
                            onClick={() => signIn()}
                            type="button"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <img className="h-5 w-5" src="https://www.seekpng.com/png/full/788-7887426_google-g-png-google-logo-white-png.png" alt="google logo" />
                            </span>
                            Entrar com o Google
                        </button>*/}
            <div className="w-full text-center border-b border-solid leading-[0.1em] my-[20px] mx-0 py-[1.3px]"></div>
            <div className="flex text-center justify-center ">
              <span className="text-gray-400">Não tem uma conta?</span>
              <div className="mx-2 font-medium text-gray-600 hover:text-gray-500">
                <Link href="/cadastrar">Cadastre-se</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
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
