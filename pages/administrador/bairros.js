import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function Bairros({ categories }) {
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
            Gerenciar Bairros
          </h1>
        </div>
        <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700 justify-center">
          <input
            className="appearance-none rounded-none w-100 px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
            type="text"
          />
          <button className="button m-2">Adicionar</button>
        </div>
        <div className="painel">
          {categories.map(({ id, nome }) => (
            <p key={id}>{nome}</p>
          ))}
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
