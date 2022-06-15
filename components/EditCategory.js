import { useForm } from "react-hook-form";
import { XIcon } from "@heroicons/react/solid";

function EditCategory({ category, onEdit, openEditModal }) {
  const { register, handleSubmit, setValue } = useForm();

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Editar de Categoria</h2>
          <XIcon
            className="w-10 cursor-pointer"
            onClick={() => openEditModal(false)}
          />
        </div>
        <div className="flex flex-col items-center">
          <form
            action="/categorias/"
            method="PUT"
            onSubmit={handleSubmit(onEdit)}
          >
            <div className="-space-y-px">
              <div>
                <input
                  {...register("id")}
                  id="id"
                  type="hidden"
                  name="id"
                  value={category.id}
                />
                <input
                  {...register("nome")}
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  className="form-control"
                  value={setValue("nome", category.nome)}
                  onChange={(e) => setValue("nome", e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 my-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
