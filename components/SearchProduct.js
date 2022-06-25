import { useRouter } from "next/router";
import { TruckIcon } from "@heroicons/react/outline";

function SearchProduct({ id, nome, descricao, categoria, foto, delivery }) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push({
          pathname: `/classificado/${id}`,
          query: {
            id,
            nome,
            descricao,
            categoria,
            foto,
            delivery,
          },
        });
      }}
      key={id}
      className="flex flex-col p-5 m-5 space-y-10 bg-white cursor-pointer"
    >
      <div className="relative grid grid-cols-5">
        <img
          src={foto.imagem}
          className="w-[200px] h-[200px] object-contain self-center"
          alt="produto"
        />

        <div className="col-span-3 mx-5">
          <p className="absolute top-2 right-2 text-xs italic text-gray-400">
            {categoria}
          </p>
          <p>{nome}</p>
          <p className="text-xs my-2 line-clamp-3">{descricao}</p>
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
