import { useRouter } from "next/router";
import { TruckIcon } from "@heroicons/react/outline";

function Product({ id, nome, descricao, categoria, foto, delivery }) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push({
          pathname: `/classificado/${id}`,
          query: { id, nome, descricao, categoria, delivery },
        })
      }
      className="relative flex flex-col m-5 bg-white z-30 p-10 cursor-pointer"
    >
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {categoria}
      </p>

      <img
        src={foto.imagem}
        className="w-[200px] h-[200px] object-contain self-center"
        alt="produto"
      />
      <h4 className="my-3">{nome}</h4>
      <p className="text-xs my-2 line-clamp-2">{descricao}</p>
      {delivery && (
        <div className="flex items-center space-x-2 mt-5">
          <TruckIcon className="w-7" />
          <p className="text-xs text-gray-500">Realiza entrega</p>
        </div>
      )}
    </div>
  );
}

export default Product;
