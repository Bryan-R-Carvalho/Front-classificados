import { useCallback, useContext } from "react";
import { useToast } from "../context/ToastContext";
import { useForm } from "react-hook-form";
import api from "../pages/api/api";
import { XIcon } from "@heroicons/react/solid";
import { EditProviderContext } from "../context/EditProviderContext";

function EditProvider({
  id,
  nome,
  email,
  whatsapp,
  telefone,
  site,
  endereco,
  instagram,
  delivery,
}) {
  const { register, handleSubmit, setValue } = useForm();
  const { isOpen, open } = useContext(EditProviderContext);
  const { addToast } = useToast();

  const handleSignUp = useCallback(
    async (data) => {
      var endereco = data.endereco + " - Nº" + data.numero;
      if (data.complemento) {
        endereco += " - " + data.complemento;
      }
      data.telefone = data.telefone.replace(/\D/g, "");
      data.whatsapp = data.whatsapp.replace(/\D/g, "");
      data.usuario = {
        login: data.email,
        senha: data.senha,
        nome: data.nome,
        tipoUsuario: "fornecedor",
        endereco: endereco,
      };
      try {
        const response = await api.post("/fornecedor/", JSON.stringify(data));
        if (response.status === 200) {
          addToast({
            type: "success",
            title: "Cadastro realizado com sucesso!",
            description: "Agora você pode fazer login",
          });
          signIn("credentials", data.usuario);
        } else {
          addToast({
            type: "error",
            title: "Erro ao cadastrar",
            description: "Tente novamente mais tarde",
          });
        }
      } catch (err) {
        addToast({
          type: "error",
          title: "Erro ao realizar o cadastro",
          description: "Verifique seus dados e tente novamente",
        });
      }
    },
    [addToast]
  );

  function formatPhoneNumber(e) {
    var phone = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

    e.target.value = !phone[2]
      ? phone[1]
      : "(" + phone[1] + ") " + phone[2] + (phone[3] ? "-" + phone[3] : "");
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
    <div
      className={
        isOpen
          ? "absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50"
          : "hidden"
      }
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Editar de Fornecedor</h2>
          <XIcon className="w-10 cursor-pointer" onClick={() => open(false)} />
        </div>
        <div className="flex flex-col items-center">
          <form
            action="/api/auth/callback/credentials"
            method="POST"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <div className="-space-y-px">
              <div>
                <input
                  {...register("nome")}
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="nome"
                  required
                  className="form-control"
                  placeholder="Nome"
                  value={nome}
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
                  value={email}
                />
              </div>
              <div>
                <input
                  {...register("telefone")}
                  onChange={formatPhoneNumber}
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="telefone"
                  required
                  className="form-control"
                  placeholder="Telefone (ex: (99) 99999-9999)"
                  minLength="14"
                  maxLength="15"
                  value={telefone}
                />
              </div>
              <div>
                <input
                  {...register("whatsapp")}
                  onChange={formatPhoneNumber}
                  id="whatsapp"
                  type="tel"
                  autoComplete="whatsapp"
                  required
                  className="form-control"
                  placeholder="Whatsapp (ex: (99) 99999-9999)"
                  minLength="14"
                  maxLength="15"
                  value={whatsapp}
                />
              </div>
              <div>
                <input
                  {...register("site")}
                  id="site"
                  name="site"
                  type="url"
                  autoComplete="site"
                  required
                  className="form-control"
                  placeholder="Site (ex: http://www.exemplo.com)"
                  value={site}
                />
              </div>
              <div>
                <input
                  {...register("instagram")}
                  id="instagram"
                  name="instagram"
                  type="text"
                  autoComplete="instagram"
                  required
                  className="form-control"
                  placeholder="Instagram (ex: exemplo)"
                  value={instagram}
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
                  value={endereco}
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
                    required
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
                    required
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
              <div className="w-full text-center border-b border-solid leading-[0.1em] my-[20px] mx-0 py-[1.3px]"></div>
              <div className="flex text-center justify-center "></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProvider;
