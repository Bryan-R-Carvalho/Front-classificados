import { ThumbUpIcon, LockClosedIcon, TrashIcon } from "@heroicons/react/solid";

function ProductsList({ onProvide, product }) {
  return product.aprovado ? (
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
          <p className="absolute bottom-2 text-xs my-2">
            <strong>Status do produto:</strong>
            {product.aprovado
              ? " Produto aprovado"
              : " Aguardando aprovação do administrador"}
          </p>
        </div>
        <div className="flex items-center justify-center w-full px-4 py-2">
          {product.disponibilidade ? (
            <button
              className="flex button mx-2 cursor-pointer h-10 "
              onClick={() => onProvide(product)}
            >
              <LockClosedIcon className="w-4 mx-2" />
              <p>Desativar</p>
            </button>
          ) : (
            <button
              className="flex buttonCadastrar mx-2 cursor-pointer h-10 "
              onClick={() => onProvide(product)}
            >
              <ThumbUpIcon className="w-4 mx-2" />
              <p>Ativar</p>
            </button>
          )}
          <button
            className="flex buttonRemover cursor-pointer h-10 "
            onClick={() => onProvide(product)}
          >
            <TrashIcon className="w-4 mx-2" />
            <p>Remover</p>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col space-y-10">
      <div className="relative grid grid-cols-5">
        <img
          src={link}
          className="w-[200px] h-[200px] object-contain self-center"
          alt="produto"
        />

        <div className="col-span-3 mx-5">
          <p className="absolute top-2 right-80 text-xs italic text-gray-400">
            {product.categoria}
          </p>
          <p>{product.nome}</p>
          <p className="text-xs my-2 line-clamp-3">{product.descricao}</p>
          <p className="absolute bottom-2 text-xs my-2">
            <strong>Status do produto:</strong>
            {product.aprovado
              ? " Produto aprovado"
              : " Aguardando aprovação do administrador"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
