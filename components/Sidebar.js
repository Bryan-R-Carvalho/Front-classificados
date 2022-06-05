import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { SidebarContext } from "../context/SidebarContext";
import { signOut } from "next-auth/react";

function Sidebar() {
  const { data: session, status } = useSession();
  const { isOpen, open } = useContext(SidebarContext);
  const loading = status === "loading";
  const router = useRouter();

  return (
    <div
      className={`h-full shadow-md bg-white fixed top-0 z-50 ${
        !isOpen ? " w-0" : " w-80"
      } duration-300 ease-in-out overflow-hidden`}
    >
      <ArrowLeftIcon
        className="absolute top-0 right-0 m-4 w-5 cursor-pointer"
        onClick={() => open(false)}
      />
      <div className="flex items-center justify-center pt-4 pb-2 px-6">
        <p className="text-sm font-semibold text-black">
          {!session ? "Bem-Vindo" : session.user.name}
        </p>
      </div>
      <hr className="m-2" />
      <div className="w-full">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 rounded-lg cursor-base hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                  <span>Categorias</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <div className="w-full px-4 py-2 rounded-lg cursor-base hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                    <span>teste</span>
                  </div>
                  <div className="w-full px-4 py-2 rounded-lg cursor-base hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                    <span>teste</span>
                  </div>
                  <div className="w-full px-4 py-2 rounded-lg cursor-base hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                    <span>teste</span>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <hr className="m-2" />
          {session && session.user.role === "administrador" ? (
            <div>
              <div className="w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                <span>Gerenciar Categoria</span>
              </div>
              <div className="w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                <span>Gerenciar Bairros</span>
              </div>
              <div className="w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                <span>Gerenciar Fornecedores</span>
              </div>
              <hr className="m-2" />
            </div>
          ) : null}
          <div
            onClick={
              !session
                ? () => router.push("/login")
                : () => signOut({ callbackUrl: `${window.location.origin}` })
            }
            className="link flex items-center"
          >
            {session ? (
              <p className="w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                Logout
              </p>
            ) : (
              <p className="w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                Fazer login
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="text-center bottom-0 absolute w-full">
        <hr className="m-0" />
        <p className="py-2 text-sm text-gray-700">Classificados</p>
      </div>
    </div>
  );
}

export default Sidebar;
