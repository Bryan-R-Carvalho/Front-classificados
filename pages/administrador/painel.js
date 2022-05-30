import Head from "next/head";
import Header from "../../components/Header";
import { useState } from "react";

export default function Anuncios() {
  const [active, setActive] = useState([true, false, false, false]);

  const handleClick = (index) => {
    if (!active[index]) {
      const newActive = [false, false, false, false];
      newActive[index] = !active[index];
      setActive(newActive);
    }
  };

  return (
    <div className="bg-gray-100 h-full">
      <Head>
        <title>Classificados</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <div className="m-5">
          <h1 className="text-4xl font-light m-0 p-0 box-border text-gray-600">
            Meus Anúncios
          </h1>
        </div>
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul
            class="flex flex-wrap -mb-px text-sm font-medium text-center justify-center text-gray-500 dark:text-gray-400"
            role="tablist"
          >
            <li class="mr-2" role="presentation">
              <button
                class={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[0] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(0)}
              >
                Aprovar Fornecedor ( 0 )
              </button>
            </li>
            <li class="mr-2" role="presentation">
              <button
                class={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[1] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(1)}
              >
                Aprovar Produto ( 0 )
              </button>
            </li>
            <li class="mr-2" role="presentation">
              <button
                class={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[2] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(2)}
              >
                Gerenciar Fornecedor ( 0 )
              </button>
            </li>
            <li role="presentation">
              <button
                class={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[3] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(3)}
              >
                Gerenciar Produto ( 0 )
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div class={"painel" + (active[0] ? "" : " hidden")}>
            <p class="text-sm text-center text-gray-500 dark:text-gray-400">
              Ops, parece que não há nada aqui! :(
            </p>
          </div>
          <div class={"painel" + (active[1] ? "" : " hidden")}>
            <p class="text-sm text-center text-gray-500 dark:text-gray-400">
              Ops, parece que não há nada aqui! :(
            </p>
          </div>
          <div class={"painel" + (active[2] ? "" : " hidden")}>
            <p class="text-sm text-center text-gray-500 dark:text-gray-400">
              Ops, parece que não há nada aqui! :(
            </p>
          </div>
          <div class={"painel" + (active[3] ? "" : " hidden")}>
            <p class="text-sm text-center text-gray-500 dark:text-gray-400">
              Ops, parece que não há nada aqui! :(
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
