import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import { TruckIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

export default function Classificado({ categories }) {
  const router = useRouter();
  const [product, setProduct] = useState({ foto: { imamge: "" } });

  useEffect(async () => {
    const produto = await fetch(
      `https://classificados-back2.herokuapp.com/produtos/${router.query.id}`
    ).then((res) => res.json());
    setProduct(produto);
  }, []);
  console.log(product);

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
