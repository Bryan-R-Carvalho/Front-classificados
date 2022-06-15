import { useForm } from "react-hook-form";
import api from "../pages/api/api";
import { XIcon } from "@heroicons/react/solid";

function EditProvider({ provider, onEdit, openEditModal }) {
  const { register, handleSubmit, setValue } = useForm();

  function formatPhoneNumber(e) {
    var phone = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

    e.target.value = !phone[2]
      ? phone[1]
      : "(" + phone[1] + ") " + phone[2] + (phone[3] ? "-" + phone[3] : "");
    setValue("telefone", e.target.value);
  }

  function getLocale(e) {
    var cep = e.target.value;

    if (cep.length == 8) {
      api
        .get(trataUrl(cep))
        .then((r) => r.data)
        .then((r) => {
          setValue(
            "endereco",
            r.logradouro +
              " - Bairro: " +
              r.bairro +
              " - " +
              r.localidade +
              "/" +
              r.uf
          );
        });
    }

    function trataUrl(cep) {
      return "https://viacep.com.br/ws/" + cep + "/json/";
    }
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Editar de Fornecedor</h2>
          <XIcon
            className="w-10 cursor-pointer"
            onClick={() => openEditModal(false)}
          />
        </div>
        <div className="flex flex-col items-center">
          <form
            action="/fornecedor/"
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
                  value={provider.id}
                />
                <input
                  {...register("nome")}
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  className="form-control"
                  value={setValue("nome", provider.nome)}
                  onChange={(e) => setValue("nome", e.target.value)}
                />
              </div>
              <div>
                <input
                  {...register("email")}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-control"
                  placeholder="Email"
                  value={setValue("email", provider.email)}
                  onChange={(e) => setValue("email", e.target.value)}
                />
              </div>
              <div>
                <input
                  {...register("telefone")}
                  onChange={(e) => formatPhoneNumber(e)}
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="telefone"
                  required
                  className="form-control"
                  placeholder="Telefone (ex: (99) 99999-9999)"
                  minLength="14"
                  maxLength="15"
                  value={setValue("telefone", provider.telefone)}
                />
              </div>
              <div>
                <input
                  {...register("whatsapp")}
                  onChange={formatPhoneNumber}
                  id="whatsapp"
                  type="tel"
                  autoComplete="whatsapp"
                  className="form-control"
                  placeholder="Whatsapp (ex: (99) 99999-9999)"
                  minLength="14"
                  maxLength="15"
                  value={setValue("whatsapp", provider.whatsapp)}
                />
              </div>
              <div>
                <input
                  {...register("site")}
                  id="site"
                  name="site"
                  type="url"
                  autoComplete="site"
                  className="form-control"
                  placeholder="Site (ex: http://www.exemplo.com)"
                  value={setValue("site", provider.site)}
                  onChange={(e) => setValue("site", e.target.value)}
                />
              </div>
              <div>
                <input
                  {...register("instagram")}
                  id="instagram"
                  name="instagram"
                  type="text"
                  autoComplete="instagram"
                  className="form-control"
                  placeholder="Instagram (ex: exemplo)"
                  value={setValue("instagram", provider.instagram)}
                  onChange={(e) => setValue("instagram", e.target.value)}
                />
              </div>
              <div>
                <input
                  {...register("endereco")}
                  id="endereco"
                  name="endereco"
                  type="text"
                  autoComplete="endereco"
                  required
                  className="form-control"
                  placeholder="CEP (ex: 99999-999)"
                  onBlur={getLocale}
                  value={setValue("endereco", provider.endereco)}
                  onChange={(e) => setValue("endereco", e.target.value)}
                />
              </div>
              <div className="flex w-full">
                <div className="w-1/4 pr-1">
                  <input
                    {...register("numero")}
                    id="numero"
                    name="numero"
                    type="text"
                    autoComplete="numero"
                    className="form-control"
                    placeholder="Nº"
                  />
                </div>
                <div className="w-3/4 pl-1">
                  <input
                    {...register("complemento")}
                    id="complemento"
                    name="complemento"
                    type="text"
                    autoComplete="complemento"
                    className="form-control"
                    placeholder="Complemento"
                  />
                </div>
              </div>
              <div>
                <select
                  {...register("delivery")}
                  id="delivery"
                  name="delivery"
                  autoComplete="delivery"
                  required
                  className="form-control"
                  value={setValue("delivery", provider.delivery)}
                >
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
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

export default EditProvider;
