import Image from "next/image";
import { MenuIcon, SearchIcon, UserIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { OpenContext } from "../context/OpenContext";
import { useToast } from "../context/ToastContext";
import SearchBar from "./SearchBar";

function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { searchByName } = useContext(SearchContext);
  const { open } = useContext(OpenContext);
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
        await searchByName(query);
        router.push(`/search/${query}`);
      }
    },
    [searchByName, router]
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
            placeholder="Buscar pelo nome"
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
          <button
            onClick={
              !session
                ? () => router.push("/login")
                : () => {
                    session.user.role === "administrador"
                      ? router.push("/administrador/painel")
                      : session.user.aprovado
                      ? router.push("/fornecedor/painel")
                      : addToast({
                          type: "alert",
                          title: "Atenção",
                          description:
                            "Você precisa ser aprovado para acessar o painel do fornecedor",
                        });
                  }
            }
            className="link"
          >
            {session && session.user.role === "administrador" ? (
              <p className="font-extrabold mt-auto buttonHeader">Painel</p>
            ) : (
              <p>Meus Anuncios</p>
            )}
          </button>
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
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
