import { useState, useContext } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Providers from "../../components/Providers";
import ManageProviders from "../../components/ManageProviders";
import { useToast } from "../../context/ToastContext";
import { OpenContext } from "../../context/OpenContext";
import api from "../api/api";
import AproveProduct from "../../components/AproveProduct";
import ManageProducts from "../../components/ManageProducts";

export default function Painel({ products, providers, categories }) {
  const [active, setActive] = useState([true, false, false, false]);
  const [providersList, setProvidersList] = useState(providers);
  const [productsList, setProductsList] = useState(products);
  const { openEditModal } = useContext(OpenContext);
  const { addToast } = useToast();

  const handleClick = (index) => {
    if (!active[index]) {
      const newActive = [false, false, false, false];
      newActive[index] = !active[index];
      setActive(newActive);
    }
  };

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
          provider.id === response.data.id ? response.data : provider
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

  const onAproveProvider = async ({
    id,
    nome,
    email,
    whatsapp,
    telefone,
    site,
    endereco,
    instagram,
    delivery,
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
      aprovado: true,
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
        title: "Fornecedor aprovado com sucesso",
      });
    } catch (error) {
      addToast({
        type: "alert",
        title: "Erro ao aprovar fornecedor",
        description: error.message,
      });
    }
  };

  const onAproveProduct = async (product) => {
    product.aprovado = !product.aprovado;
    try {
      const response = await api.put(
        "/produtos/administrador/AtualizarAprovacao",
        JSON.stringify(product)
      );
      setProductsList(
        productsList.map((p) => (p.id === response.data.id ? response.data : p))
      );
      addToast({
        type: "success",
        title: `Produto ${
          response.aprovado ? " aprovado " : "desativado"
        } com sucesso`,
      });
    } catch (error) {
      addToast({
        type: "alert",
        title: "Erro ao aprovar Produto",
        description: error.message,
      });
    }
  };

  const onRemoveProdutct = async (product) => {
    try {
      const response = await api.delete(`/produtos/${product.id}`);
      setProductsList(productsList.filter((p) => p.id !== product.id));
      addToast({
        type: "success",
        title: "Produto removido com sucesso.",
      });
    } catch (error) {
      addToast({
        type: "alert",
        title: "Erro ao remover Produto",
        description: error.message,
      });
    }
  };

  const onEditProvider = async (data) => {
    data.endereco =
      data.numero !== ""
        ? `${data.endereco} - N?? ${data.numero}`
        : data.endereco;
    data.endereco =
      data.complemento !== ""
        ? `${data.endereco} - ${data.complemento}`
        : data.endereco;
    data.id = parseInt(data.id);
    data.telefone = data.telefone.replace(/\D/g, "");
    data.whatsapp = data.whatsapp.replace(/\D/g, "");
    try {
      const response = await api.put("/fornecedor/", JSON.stringify(data));
      setProvidersList(
        providersList.map((provider) =>
          provider.id === response.data.id ? response.data : provider
        )
      );
      if (response.status === 200) {
        addToast({
          type: "success",
          title: "Fornecedor editado com sucesso",
        });
        openEditModal(false);
      } else {
        addToast({
          type: "error",
          title: "Erro ao editar fornecedor",
          description: "Tente novamente mais tarde",
        });
      }
    } catch (err) {
      addToast({
        type: "error",
        title: "Erro ao editar fornecedor",
        description: "Verifique seus dados e tente novamente",
      });
    }
  };

  return (
    <div className="bg-gray-100 pb-10 min-h-screen">
      <Head>
        <title>Classificados</title>
      </Head>
      <Header />
      <Sidebar categories={categories} />
      <main className="max-w-screen-2xl mx-auto">
        <div className="m-5">
          <h1 className="text-4xl font-light m-0 p-0 box-border text-gray-600">
            Painel de Administrador
          </h1>
        </div>
        <div className="mb-4 border-b border-gray-200 ">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center text-gray-500 dark:text-gray-400"
            role="tablist"
          >
            <li className="mr-2" role="presentation">
              <button
                className={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[0] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(0)}
              >
                Aprovar Fornecedor ({" "}
                {
                  providersList.filter(
                    (provider) => provider.aprovado === false
                  ).length
                }{" "}
                )
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[1] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(1)}
              >
                Aprovar Produto ({" "}
                {
                  productsList.filter((product) => product.aprovado === false)
                    .length
                }{" "}
                )
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[2] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(2)}
              >
                Gerenciar Fornecedor ( {providersList.length} )
              </button>
            </li>
            <li role="presentation">
              <button
                className={
                  "inline-block p-4 rounded-t-lg border-b-2" +
                  (active[3] ? " activeClass" : " inactiveClass")
                }
                type="button"
                role="tab"
                onClick={() => handleClick(3)}
              >
                Gerenciar Produto ( {productsList.length} )
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className={"painel" + (active[0] ? "" : " hidden")}>
            {providers ? (
              <Providers
                onAprove={onAproveProvider}
                providersList={providersList}
              />
            ) : (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Ops, parece que n??o h?? nada aqui! :(
              </p>
            )}
          </div>
          <div className={"painel" + (active[1] ? "" : " hidden")}>
            {products ? (
              <div className="painel">
                <ul>
                  {productsList
                    .filter((product) => product.aprovado === false)
                    .map((product) => (
                      <AproveProduct
                        key={product.id}
                        onAproveProduct={onAproveProduct}
                        product={product}
                      />
                    ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Ops, parece que n??o h?? nada aqui! :(
              </p>
            )}
          </div>
          <div className={"painel" + (active[2] ? "" : " hidden")}>
            {providers ? (
              <ManageProviders
                manageAprove={manageAprove}
                onEdit={onEditProvider}
                openEditModal={openEditModal}
                providersList={providersList}
              />
            ) : (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Ops, parece que n??o h?? nada aqui! :(
              </p>
            )}
          </div>
          <div className={"painel" + (active[3] ? "" : " hidden")}>
            {products ? (
              <div className="painel">
                <ul>
                  {productsList.map((product) => (
                    <ManageProducts
                      key={product.id}
                      onAproveProduct={onAproveProduct}
                      onRemoveProdutct={onRemoveProdutct}
                      product={product}
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Ops, parece que n??o h?? nada aqui! :(
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch(process.env.BASE_URL + "/produtos/").then(
    (res) => res.json()
  );
  const providers = await fetch(process.env.BASE_URL + "/fornecedor/").then(
    (res) => res.json()
  );
  const categories = await fetch(process.env.BASE_URL + "/categorias/").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
      providers,
      categories,
    },
  };
}
