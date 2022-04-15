import Head from "next/head";
import Header from "../../components/Header";

export default function Anunciar({ categories }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Classificados</title>
      </Head>
      <Header />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <main className="max-w-md w-full space-y-8">
          <h1 className="m-2 text-center text-3xl">
            O que você está anunciando?
          </h1>
          <form className="mt-8 space-y-6">
            <div>
              <input
                className="form-control"
                type="text"
                placeholder="Título"
              />
            </div>
            <div>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Descrição"
              />
            </div>
            <div>
              <input className="form-control" type="text" placeholder="Preço" />
            </div>
            <div>
              <select className="form-select">
                <option selected>Selecione uma categoria</option>
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>
            <input
              type="file"
              className="form-control cursor-pointer"
              name="file"
              accept="image/*"
              multiple
            />
            <div className="text-right">
              <button className="font-extrabold mt-auto px-6 buttonHeader">
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
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());
  return {
    props: {
      categories,
    },
  };
}
