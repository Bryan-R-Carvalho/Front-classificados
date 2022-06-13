import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

export default function Anuncios({ categories }) {
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
      <Sidebar categories={categories} />
      <main className="max-w-screen-2xl mx-auto">
        <div className="m-5">
          <h1 className="text-4xl font-light m-0 p-0 box-border text-gray-600">
            Meus Anúncios
          </h1>
        </div>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center text-gray-500 dark:text-gray-400"
            role="tablist"
          >
            <li className="mr-2" role="presentation">
              <button
                className={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[0] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(0)}
              >
                Publicados ( 0 )
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[1] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(1)}
              >
                Aguardando Aprovação ( 0 )
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[2] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(2)}
              >
                Inativos ( 0 )
              </button>
            </li>
            <li role="presentation">
              <button
                className={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[3] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(3)}
              >
                Expirados ( 0 )
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className={"painel" + (active[0] ? "" : " hidden")}>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Ops, parece que não há nada aqui! :(
            </p>
          </div>
          <div className={"painel" + (active[1] ? "" : " hidden")}>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Ops, parece que não há nada aqui! :(
            </p>
          </div>
          <div className={"painel" + (active[2] ? "" : " hidden")}>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Ops, parece que não há nada aqui! :(
            </p>
          </div>
          <div className={"painel" + (active[3] ? "" : " hidden")}>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Ops, parece que não há nada aqui! :(
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const categories = await fetch(process.env.BASE_URL + "/categorias/").then(
    (res) => res.json()
  );
  return {
    props: {
      categories,
    },
  };
}
