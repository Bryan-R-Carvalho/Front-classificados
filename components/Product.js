import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Currency from "react-currency-formatter";
import { TruckIcon } from "@heroicons/react/outline";

function Product({ id, title, price, description, category, image }) {
  const [delivery] = useState(Math.random() < 0.5);
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push({
          pathname: `/classificado/${id}`,
          query: { id, title, price, description, category, image, delivery },
        })
      }
      className="relative flex flex-col m-5 bg-white z-30 p-10 cursor-pointer"
    >
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        alt="produto"
        height={200}
        width={200}
        objectFit="contain"
      />
      <h4 className="my-3">{title}</h4>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="BRL" />
      </div>
      {delivery && (
        <div className="flex items-center space-x-2 -mt-5">
          <TruckIcon className="w-7" />
          <p className="text-xs text-gray-500">Realiza entrega</p>
        </div>
      )}
    </div>
  );
}

export default Product;
