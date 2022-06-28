import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import { TruckIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

export default function Classificado({ categories }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(false);
    await fetch(
      `https://classificados-back2.herokuapp.com/produtos/${router.query.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !product)
    return (
      <div className="min-h-full flex items-center justify-center">
        <svg
          role="status"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );

  return (
    <div className="w-full h-full bg-gray-100">
      <Head>
        <title>Classificados</title>
      </Head>
      <Header />
      <Sidebar categories={categories} />
      <main className="max-w-screen-2xl mx-auto">
        <div className="relative flex flex-col m-5 bg-white z-30 p-10 rounded-sm">
          <p className="absolute top-2 right-2 text-xs italic text-gray-400">
            {product.categoria}
          </p>
          <img
            src={product.foto.imagem}
            className="w-[200px] h-[200px] object-contain self-center"
            alt="produto"
          />
          <h4 className="my-3">{product.nome}</h4>
          <p className="text-xs my-2">{product.descricao}</p>
          <div className="mb-5">
            <h1>Informações do fornecedor</h1>
            <p className="text-xs my-2">Fornecedor: {product.fornecedorNome}</p>
            <p className="text-xs my-2">
              Site:{" "}
              <a href={product.site} target="_blank">
                {product.site}
              </a>
            </p>
            <p className="text-xs my-2">Telefone: {product.telefone}</p>
            <p className="text-xs my-2">Whatsapp: {product.whatsapp}</p>
            <p className="text-xs my-2">E-mail: {product.email}</p>
            <p className="text-xs my-2">Instagram: {product.instagram}</p>
            <p className="text-xs my-2">Endereço: {product.endereco}</p>
          </div>
          {product.delivery === true && (
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
  const categories = await fetch(process.env.BASE_URL + "/categorias/").then(
    (res) => res.json()
  );
  return {
    props: {
      categories,
    },
  };
}
