import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/solid";

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
        <div className="p-4 bg-white rounded-lg h-auto">
          {products.slice(0, 10).map((product) => (
            <ul key={product.id}>
              <li>
                <div className="flex flex-col space-y-10">
                  <div className="relative grid grid-cols-5">
                    <Image
                      src={product.image}
                      alt="produto"
                      height={150}
                      width={150}
                      objectFit="contain"
                    />

                    <div className="col-span-3 mx-5">
                      <p className="absolute top-2 right-80 text-xs italic text-gray-400">
                        {product.category}
                      </p>
                      <p>{product.title}</p>
                      <p className="text-xs my-2 line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex buttonRemover cursor-pointer h-10 m-auto">
                      <TrashIcon className="w-4" />
                      <p>Remover</p>
                    </div>
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
  const products = await fetch("https://fakestoreapi.com/products").then(
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
