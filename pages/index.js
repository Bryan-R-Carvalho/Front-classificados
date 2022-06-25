import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products, categories }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Classificados</title>
      </Head>
      <Header />
      <Sidebar categories={categories} />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
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
