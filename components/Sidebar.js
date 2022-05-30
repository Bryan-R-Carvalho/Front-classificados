import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

function Sidebar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  return (
    <div
      class="w-80 h-full shadow-md bg-white fixed z-50 hidden"
      id="sidenavSecExample"
    >
      <div class="pt-4 pb-2 px-6">
        <a href="#!">
          <div class="flex items-center">
            <div class="grow ml-3">
              <p class="text-sm font-semibold text-black">
                {!session ? "Faça Login" : session.user.name}
              </p>
            </div>
          </div>
        </a>
      </div>
      <hr class="m-2" />
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

          <hr class="m-2" />
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
              <hr class="m-2" />
            </div>
          ) : null}
        </div>
      </div>

      <div class="text-center bottom-0 absolute w-full">
        <hr class="m-0" />
        <p class="py-2 text-sm text-gray-700">Classificados</p>
      </div>
    </div>
  );
}

export default Sidebar;
