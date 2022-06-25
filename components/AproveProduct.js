import { ThumbUpIcon } from "@heroicons/react/solid";

function AproveProduct({ onAproveProduct, product }) {
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
              <p className="absolute top-2 right-80 text-xs italic text-gray-400">
                {product.categoria}
              </p>
              <p>{product.nome}</p>
              <p className="text-xs my-2 line-clamp-3">{product.descricao}</p>
              <p className="text-xs my-2">
                Fornecedor: {product.fornecedorNome}
              </p>
            </div>
            <button
              className="flex buttonCadastrar cursor-pointer h-10 m-auto"
              onClick={() => onAproveProduct(product)}
            >
              <ThumbUpIcon className="w-4 mx-1" />
              <p>Aprovar</p>
            </button>
          </div>
        </div>
      </li>
      <hr className="my-2" />
    </>
  );
}

export default AproveProduct;
