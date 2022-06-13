import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ManageProviders from "../../components/ManageProviders";

export default function Fornecedores({ providers, categories }) {
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
            Gerenciar Fornecedores
          </h1>
        </div>
        <div className="painel">
          <ManageProviders providers={providers} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await fetch(process.env.BASE_URL + "/fornecedor/").then(
    (res) => res.json()
  );
  const categories = await fetch(process.env.BASE_URL + "/categorias/").then(
    (res) => res.json()
  );
  return {
    props: {
      providers,
      categories,
    },
  };
}
