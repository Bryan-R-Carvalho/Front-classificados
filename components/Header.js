import Image from "next/image";
import { MenuIcon, SearchIcon, UserIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { SidebarContext } from "../context/SidebarContext";
import { useToast } from "../context/ToastContext";
import Sidebar from "./Sidebar";

function Header() {
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");
  const loading = status === "loading";
  const router = useRouter();
  const { search } = useContext(SearchContext);
  const { open } = useContext(SidebarContext);
  const { addToast } = useToast();

  const handleChange = useCallback(
    (e) => {
      setQuery(e.target.value);
      if (e.key === "Enter") {
        handleSearch(query);
      }
    },
    [setQuery]
  );

  const handleSearch = useCallback(
    async (query) => {
      if (query) {
        await search(query);
        router.push(`/search/${query}`);
      }
    },
    [search, router]
  );

  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 mr-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://i.imgur.com/xDsZIrl.png"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            onKeyUp={(e) => {
              handleChange(e);
            }}
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon
            onClick={() => handleSearch(query)}
            className="h-12 p-4"
          />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            onClick={
              !session
                ? () => router.push("/login")
                : () => signOut({ callbackUrl: `${window.location.origin}` })
            }
            className="link flex items-center"
          >
            {session ? (
              <p>Olá, {session.user.name}</p>
            ) : (
              <>
                <UserIcon className="h-5" />
                <p>Olá, Faça Login</p>
              </>
            )}
          </div>
          <div
            onClick={
              !session
                ? () => router.push("/login")
                : () => {
                    session.user.role === "administrador"
                      ? router.push("/administrador/painel")
                      : router.push("/fornecedor/painel");
                  }
            }
            className="link"
          >
            {session && session.user.role === "administrador" ? (
              <p className="font-extrabold mt-auto buttonHeader">Painel</p>
            ) : (
              <p>Meus Anuncios</p>
            )}
          </div>
          <button
            onClick={
              !session
                ? () => router.push("/login")
                : session.user.aprovado
                ? () => router.push("/fornecedor/anunciar")
                : () =>
                    addToast({
                      type: "alert",
                      title: "Atenção",
                      description: "Você precisa ser aprovado para anunciar",
                    })
            }
            className={
              session && session.user.role === "administrador"
                ? " hidden"
                : "font-extrabold mt-auto buttonHeader"
            }
          >
            Anunciar
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center" onClick={() => open(true)}>
          <MenuIcon className="h-6 mr-1" />
          Menu
        </p>
      </div>
      <Sidebar />
    </header>
  );
}

export default Header;
