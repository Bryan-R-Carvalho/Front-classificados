import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

export default function Anunciar({ categories }) {
  const { register, handleSubmit } = useForm();

  const handleAnnounce = useCallback(async (data) => {
    console.log(data);
    try {
      const response = await fetch("/produtos", JSON.stringify(data));
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="min-h-full bg-gray-100">
      <Head>
        <title>Classificados</title>
      </Head>
      <Header />
      <Sidebar categories={categories} />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <main className="max-w-md w-full space-y-8">
          <h1 className="m-2 text-center text-3xl">
            O que você está anunciando?
          </h1>
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={handleSubmit(handleAnnounce)}
          >
            <div>
              <input
                {...register("nome")}
                name="nome"
                className="form-control"
                type="text"
                placeholder="Título"
                required
              />
            </div>
            <div>
              <textarea
                {...register("descricao")}
                name="descricao"
                className="form-control"
                rows={5}
                placeholder="Descrição"
                required
              />
            </div>
            <div>
              <input
                {...register("preco")}
                name="preco"
                className="form-control"
                type="number"
                min={0.0}
                step={0.01}
                placeholder="Preço"
                required
              />
            </div>
            <div>
              <select
                {...register("categoria")}
                name="categoria"
                className="form-select"
                required
              >
                <option selected>Selecione uma categoria</option>
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>
            <input
              {...register("imagem")}
              name="imagem"
              type="file"
              className="form-control bg-white file:cursor-pointer file:buttonHeader"
              accept="image/*"
              required
              multiple
            />
            <div className="text-right">
              <button
                className="font-extrabold mt-auto px-6 buttonHeader"
                type="submit"
              >
                Anunciar
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const categories = await fetch(
    "https://classificados-back.herokuapp.com/categorias/"
  ).then((res) => res.json());
  return {
    props: {
      categories,
    },
  };
}
