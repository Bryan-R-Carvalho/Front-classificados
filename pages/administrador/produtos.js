import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ManageProducts from "../../components/ManageProducts";

export default function Produtos({ categories, products }) {
  return (
    <div className="bg-gray-100 h-auto pb-10">
      <Head>
        <title>Classificados</title>
      </Head>
      <Header />
      <Sidebar categories={categories} />
      <main className="max-w-screen-2xl mx-auto">
        <div className="m-5">
          <h1 className="text-4xl font-light m-0 p-0 box-border text-gray-600">
            Gerenciar Produtos
          </h1>
        </div>
        <div className="painel">
          <ul>
            {products.map((product) => (
              <ManageProducts key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch(process.env.BASE_URL + "/produtos/").then(
    (res) => res.json()
  );
  const categories = await fetch(process.env.BASE_URL + "/categorias/").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
      categories,
    },
  };
}
