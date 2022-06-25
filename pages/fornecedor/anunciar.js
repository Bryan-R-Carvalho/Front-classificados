import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useToast } from "../../context/ToastContext";
import api from "../api/api";
import { useState, useCallback } from "react";

export default function Anunciar({ categories }) {
  const { register, handleSubmit } = useForm();
  const { data: session, status } = useSession();
  const { addToast } = useToast();
  const [length, setLength] = useState(0);

  const handleAnnounce = async (data) => {
    data.fornecedorId = session.user.fornecedorId;
    data.categoriaId = parseInt(data.categoriaId);

    const json = JSON.stringify(data);
    const blob = new Blob([json], {
      type: "application/json",
    });

    const res = new FormData();
    res.append("produto", blob);
    res.append("imagem", data.imagem[0]);
    try {
      const response = await api.post("/produtos/", res);
      addToast({
        type: "success",
        title: "Produto cadastrado com sucesso!",
      });
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao cadastrar produto!",
      });
    }
  };

  const handleDescriptionLength = useCallback(
    (e) => {
      setLength(e.target.value.length);
    },
    [setLength]
  );

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
            action="/produtos/"
            encType="multipart/form-data"
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
                maxLength={255}
                rows={5}
                placeholder="Descrição"
                onChange={(e) => handleDescriptionLength(e)}
                required
              />
              <div className="text-gray-500 text-right">
                <span>{length}/255</span>
              </div>
            </div>
            <div>
              <select
                {...register("categoriaId")}
                name="categoriaId"
                className="form-select"
                required
              >
                <option defaultValue>Selecione uma categoria</option>
                {categories.map(({ id, nome }) => (
                  <option key={id} value={id}>
                    {nome}
                  </option>
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
  const categories = await fetch(process.env.BASE_URL + "/categorias/").then(
    (res) => res.json()
  );
  return {
    props: {
      categories,
    },
  };
}
