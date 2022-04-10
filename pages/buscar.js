import Image from "next/image";
import Header from "../components/Header";
import { useState, useEffect, useContext } from "react";
import Currency from "react-currency-formatter";
import { TruckIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { SearchContext } from "../context/SearchContext";

export default function Buscar() {
  const { item } = useContext(SearchContext);
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          {item.length > 0 ? (
            item.map(({ id, image, title, description, price, category }) => {
              return (
                <div
                  key={id}
                  className="flex flex-col p-5 m-5 space-y-10 bg-white"
                >
                  <div className="relative grid grid-cols-5">
                    <Image
                      src={image}
                      alt="produto"
                      height={200}
                      width={200}
                      objectFit="contain"
                    />

                    <div className="col-span-3 mx-5">
                      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
                        {category}
                      </p>
                      <p>{title}</p>
                      <p className="text-xs my-2 line-clamp-3">{description}</p>
                    </div>

                    <div className="flex flex-col space-y-2 my-auto justify-self-end">
                      <Currency quantity={price} currency="BRL" />
                      <div className="flex items-center space-x-2">
                        <TruckIcon className="w-7" />
                        <p className="text-xs text-gray-500">Realiza entrega</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
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
