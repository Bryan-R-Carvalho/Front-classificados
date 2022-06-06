import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { TrashIcon } from "@heroicons/react/solid";

export default function Categorias({ categories }) {
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
            Gerenciar Categorias
          </h1>
        </div>
        <div class="flex mb-4 border-b border-gray-200 dark:border-gray-700 justify-center">
          <input
            className="appearance-none rounded-none w-100 px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
            type="text"
          />
          <button className="button m-2">Adicionar</button>
        </div>
        <div className="painel">
          {categories.map((category) => (
            <ul>
              <li>
                <div className="flex justify-between ">
                  <p className="my-auto">{category}</p>
                  <div className="flex buttonRemover cursor-pointer">
                    <TrashIcon className="w-4" />
                    <p>Remover</p>
                  </div>
                </div>
              </li>
              <hr className="my-2" />
            </ul>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const categories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());
  return {
    props: {
      categories,
    },
  };
}
