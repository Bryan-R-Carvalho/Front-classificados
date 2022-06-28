import { ThumbUpIcon, TrashIcon, LockClosedIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

function ManageProducts({ onAproveProduct, onRemoveProdutct, product }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <li>
        <div className="flex flex-col space-y-10">
          <div className="relative grid grid-cols-5">
            <img
              src={product.foto.imagem}
              className="w-[200px] h-[200px] object-contain self-center"
              alt="produto"
            />

            <div className="col-span-3 mx-5">
              <p className="text-right text-xs italic text-gray-400">
                {product.categoria}
              </p>
              <p>{product.nome}</p>
              <p className="text-xs my-2 line-clamp-3">{product.descricao}</p>
              <p className="text-xs my-2">
                Fornecedor: {product.fornecedorNome}
              </p>
            </div>
            <div className="items-center justify-center w-full px-4 py-2 gap-2 flex flex-col lg:flex-row">
              {product.aprovado ? (
                <button
                  className="flex button mx-2 cursor-pointer"
                  onClick={() => onAproveProduct(product)}
                >
                  <LockClosedIcon className="w-4 mr-2" />
                  Desativar
                </button>
              ) : (
                <button
                  className="flex buttonCadastrar mx-2 cursor-pointer"
                  onClick={() => onAproveProduct(product)}
                >
                  <ThumbUpIcon className="w-4 mr-2" />
                  Aprovar
                </button>
              )}
              <button
                className="flex buttonRemover cursor-pointer"
                onClick={() => onRemoveProdutct(product)}
              >
                <TrashIcon className="w-4 mx-2" />
                <p>Remover</p>
              </button>
            </div>
          </div>
        </div>
      </li>
      <hr className="my-2" />
    </>
  );
}

export default ManageProducts;
