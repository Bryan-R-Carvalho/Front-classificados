import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EditCategory from "../../components/EditCategory";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../../context/ToastContext";
import { OpenContext } from "../../context/OpenContext";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import api from "../api/api";

export default function Categorias({ categories }) {
  const { register, handleSubmit } = useForm();
  const [categoriesList, setCategoriesList] = useState(categories);
  const [currentCategory, setCurrentCategory] = useState(null);
  const { addToast } = useToast();
  const { openEdit, openEditModal } = useContext(OpenContext);

  const onOpenEdit = (id) => {
    setCurrentCategory(categoriesList.find((category) => category.id === id));
    openEditModal(true);
  };

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/categorias/", JSON.stringify(data));
      addToast({
        type: "success",
        title: "Categoria cadastrada com sucesso",
      });
      setCategoriesList([...categoriesList, response.data]);
    } catch (error) {
      addToast({
        type: "alert",
        title: "Erro ao cadastrar categoria",
      });
    }
  };

  const onDelete = async (id) => {
    try {
      await api.delete(`/categorias/${id}`);
      addToast({
        type: "success",
        title: "Categoria excluída com sucesso",
      });
      setCategoriesList(
        categoriesList.filter((category) => category.id !== id)
      );
    } catch (error) {
      addToast({
        type: "alert",
        title: "Erro ao excluir categoria",
      });
    }
  };

  const onEdit = async (data) => {
    try {
      const response = await api.put("/categorias/", JSON.stringify(data));
      addToast({
        type: "success",
        title: "Categoria editada com sucesso",
      });
      openEditModal(false);
      setCategoriesList(
        categoriesList.map((category) =>
          category.id === response.data.id ? response.data : category
        )
      );
    } catch (error) {
      addToast({
        type: "alert",
        title: "Erro ao editar categoria",
      });
    }
  };

  return (
    <div className="bg-gray-100 h-full">
      <Head>
        <title>Classificados</title>
      </Head>
      <Header />
      <Sidebar categories={categoriesList} />
      <main className="max-w-screen-2xl mx-auto">
        <div className="m-5">
          <h1 className="text-4xl font-light m-0 p-0 box-border text-gray-600">
            Gerenciar Categorias
          </h1>
        </div>
        <form
          id="form"
          action=""
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex mb-4 border-b border-gray-200  justify-center">
            <input
              {...register("nome")}
              id="nome"
              name="nome"
              type="text"
              autoComplete="nome"
              className="appearance-none rounded-none w-100 px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
              placeholder="Nome da categoria"
            />
            <button className="button m-2" type="submit">
              Adicionar
            </button>
          </div>
        </form>
        <div className="painel">
          <ul>
            {categoriesList.map(({ id, nome }) => (
              <li id={id} key={id}>
                <div className="flex justify-between ">
                  <p className="my-auto">{nome}</p>
                  <div className="flex gap-2">
                    {openEdit ? (
                      <EditCategory
                        category={currentCategory}
                        onEdit={onEdit}
                        openEditModal={openEditModal}
                      />
                    ) : null}
                    <button
                      className="flex buttonEditar px-4 cursor-pointer"
                      onClick={() => onOpenEdit(id)}
                    >
                      <PencilIcon className="w-4" />
                      Alterar
                    </button>
                    <button
                      className="flex buttonRemover cursor-pointer"
                      onClick={() => onDelete(id)}
                    >
                      <TrashIcon className="w-4" />
                      <p>Remover</p>
                    </button>
                  </div>
                </div>
                <hr className="my-2" />
              </li>
            ))}
          </ul>
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
