import Header from "../../components/Header";
import SearchProduct from "../../components/SearchProduct";
import { useContext } from "react";
import { useRouter } from "next/router";
import { SearchContext } from "../../context/SearchContext";

export default function Buscar() {
  const { item } = useContext(SearchContext);
  const router = useRouter();
  return (
    <div className="min-h-full bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5">
          {item.length > 0 ? (
            item.map(({ id, image, title, description, price, category }) => {
              return (
                <SearchProduct
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                />
              );
            })
          ) : (
            <div className="">
              <p className="text-center text-gray-500">
                Nenhum produto encontrado
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
