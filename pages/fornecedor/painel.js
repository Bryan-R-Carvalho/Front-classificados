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
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(async () => {
    setIsLoading(true);
    await fetch(
      `https://classificados-back2.herokuapp.com/produtos/fornecedor/${session.user.fornecedorId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

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

  if (isLoading || !products)
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
