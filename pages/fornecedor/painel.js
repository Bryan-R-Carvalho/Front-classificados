import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ProductsList from "../../components/ProductsList";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import api from "../api/api";

export default function Anuncios({ categories }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [active, setActive] = useState([true, false, false, false]);
  const [products, setProducts] = useState([]);
  const { addToast } = useToast();

  useEffect(async () => {
    const products = await fetch(
      `https://classificados-back2.herokuapp.com/produtos/fornecedor/${session.user.fornecedorId}`
    ).then((res) => res.json());
    setProducts(products);
  }, [session]);

  const handleClick = (index) => {
    if (!active[index]) {
      const newActive = [false, false, false, false];
      newActive[index] = !active[index];
      setActive(newActive);
    }
  };

  const onProvide = async (product) => {
    product.disponibilidade = !product.disponibilidade;
    try {
      const response = await api.put(
        "/produtos/fornecedor/AtualizarFornecimento",
        JSON.stringify(product)
      );

      addToast({
        type: "success",
        title: `Produto ${
          product.disponibilidade ? " ativado " : " desativado "
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

  const onRemove = async (product) => {
    try {
      const response = await api.delete(`/produtos/${product.id}`);

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
            Meus Anúncios
          </h1>
        </div>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
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
                Publicados ( {products.length} )
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
                Aguardando Aprovação ({" "}
                {
                  products.filter((product) => product.aprovado === false)
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
                Produtos Ativos ({" "}
                {
                  products.filter(
                    (product) =>
                      product.disponibilidade === true &&
                      product.aprovado === true
                  ).length
                }{" "}
                )
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
                Produtos Inativos ({" "}
                {
                  products.filter(
                    (product) =>
                      product.disponibilidade === false &&
                      product.aprovado === true
                  ).length
                }{" "}
                )
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className={"painel" + (active[0] ? "" : " hidden")}>
            {products ? (
              <div className="painel">
                <ul>
                  {products.map((product) => (
                    <>
                      <li key={product.id}>
                        <ProductsList
                          onProvide={onProvide}
                          onRemove={onRemove}
                          product={product}
                        />
                      </li>
                      <hr className="my-2" />
                    </>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Ops, parece que não há nada aqui! :(
              </p>
            )}
          </div>
          <div className={"painel" + (active[1] ? "" : " hidden")}>
            {products ? (
              <div className="painel">
                <ul>
                  {products
                    .filter((product) => product.aprovado === false)
                    .map((product) => (
                      <>
                        <li key={product.id}>
                          <ProductsList
                            onProvide={onProvide}
                            onRemove={onRemove}
                            product={product}
                          />
                        </li>
                        <hr className="my-2" />
                      </>
                    ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Ops, parece que não há nada aqui! :(
              </p>
            )}
          </div>
          <div className={"painel" + (active[2] ? "" : " hidden")}>
            {products ? (
              <div className="painel">
                <ul>
                  {products
                    .filter((product) => product.disponibilidade === true)
                    .map((product) => (
                      <>
                        <li key={product.id}>
                          <ProductsList
                            onProvide={onProvide}
                            onRemove={onRemove}
                            product={product}
                          />
                        </li>
                        <hr className="my-2" />
                      </>
                    ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Ops, parece que não há nada aqui! :(
              </p>
            )}
          </div>
          <div className={"painel" + (active[3] ? "" : " hidden")}>
            {products ? (
              <div className="painel">
                <ul>
                  {products
                    .filter(
                      (product) =>
                        product.disponibilidade === false &&
                        product.aprovado === true
                    )
                    .map((product) => (
                      <>
                        <li key={product.id}>
                          <ProductsList
                            onProvide={onProvide}
                            onRemove={onRemove}
                            product={product}
                          />
                        </li>
                        <hr className="my-2" />
                      </>
                    ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Ops, parece que não há nada aqui! :(
              </p>
            )}
          </div>
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
