import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { TruckIcon } from "@heroicons/react/outline";

function SearchProduct({ id, title, price, description, category, image }) {
  const [delivery] = useState(Math.random() < 0.5);
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push({
          pathname: `/classificado/${id}`,
          query: {
            id,
            title,
            price,
            description,
            category,
            image,
            delivery,
          },
        });
      }}
      key={id}
      className="flex flex-col p-5 m-5 space-y-10 bg-white cursor-pointer"
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
          {delivery && (
            <div className="flex items-center space-x-2">
              <TruckIcon className="w-7" />
              <p className="text-xs text-gray-500">Realiza entrega</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchProduct;
