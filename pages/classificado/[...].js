import Image from "next/image";
import Head from "next/head";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import Currency from "react-currency-formatter";
import { TruckIcon } from "@heroicons/react/outline";

export default function Classificado(products) {
  const router = useRouter();
  const product = products.products.find(
    (product) => product.id == router.query.id
  );

  return (
    <div className="w-full h-full bg-gray-100">
      <Head>
        <title>Classificados</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <div className="relative flex flex-col m-5 bg-white z-30 p-10 rounded-sm">
          <p className="absolute top-2 right-2 text-xs italic text-gray-400">
            {product.category}
          </p>
          <Image
            src={product.image}
            alt="produto"
            height={200}
            width={200}
            objectFit="contain"
          />
          <h4 className="my-3">{product.title}</h4>
          <p className="text-xs my-2">{product.description}</p>
          <div className="mb-5">
            <Currency quantity={product.price} currency="BRL" />
          </div>
          {router.query.delivery === "true" && (
            <div className="flex items-center space-x-2 -mt-5">
              <TruckIcon className="w-7" />
              <p className="text-xs text-gray-500">Realiza entrega</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
    },
  };
}
