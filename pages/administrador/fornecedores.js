import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ManageProviders from "../../components/ManageProviders";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import api from "../api/api";

export default function Fornecedores({ providers, categories }) {
  const { addToast } = useToast();
  const [providersList, setProvidersList] = useState(providers);

  const manageAprove = async ({
    id,
    nome,
    email,
    whatsapp,
    telefone,
    site,
    endereco,
    instagram,
    delivery,
    aprovado,
  }) => {
    const provider = {
      id,
      nome,
      email,
      whatsapp,
      telefone,
      site,
      endereco,
      instagram,
      delivery,
      aprovado,
    };
    try {
      const response = await api.put("/fornecedor/", JSON.stringify(provider));
      setProvidersList(
        providersList.map((provider) =>
          provider.id === id ? response.data : provider
        )
      );

      addToast({
        type: "success",
        title: `Fornecedor ${
          aprovado ? " aprovado " : "desativado"
        } com sucesso`,
      });
    } catch (error) {
      addToast({
        type: "alert",
        title: "Erro ao aprovar fornecedor",
        description: error.message,
      });
    }
  };

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
          <ManageProviders
            manageAprove={manageAprove}
            providersList={providersList}
          />
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
