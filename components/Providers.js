import { useState } from "react";
import { ThumbUpIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import { useToast } from "../context/ToastContext";
import api from "../pages/api/api";

function Providers({ providers }) {
  const [providersList, setProvidersList] = useState(providers);
  const { addToast } = useToast();

  const onAprove = async ({
    id,
    nome,
    email,
    whatsapp,
    telefone,
    site,
    endereco,
    instagram,
    delivery,
  }) => {
    const provider = {
      id,
      nome,
      email,
      whatsapp,
      telefone,
      site,
      endereco,
      instagram,
      delivery,
      aprovado: true,
    };
    try {
      const response = await api.put("/fornecedor/", JSON.stringify(provider));
      setProvidersList(providersList.filter((provider) => provider.id !== id));
      addToast({
        type: "success",
        title: "Fornecedor aprovado com sucesso",
      });
    } catch (error) {
      addToast({
        type: "alert",
        title: "Erro ao aprovar fornecedor",
        description: error.message,
      });
    }
  };

  return (
    <div>
      {providersList
        .filter((provider) => provider.aprovado === false)
        .map(
          ({
            id,
            nome,
            email,
            whatsapp,
            telefone,
            site,
            endereco,
            instagram,
            delivery,
          }) => (
            <ul key={id}>
              <li>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <div className="flex">
                        <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 cursor-base hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                          <p className="my-auto">{nome}</p>
                        </Disclosure.Button>
                        <button
                          className="flex buttonCadastrar cursor-pointer"
                          onClick={() =>
                            onAprove({
                              id,
                              nome,
                              email,
                              whatsapp,
                              telefone,
                              site,
                              endereco,
                              instagram,
                              delivery,
                            })
                          }
                        >
                          <ThumbUpIcon className="w-4 mr-2" />
                          Aprovar
                        </button>
                      </div>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <p>E-mail: {email}</p>
                        <p>Whatsapp: {whatsapp}</p>
                        <p>Telefone: {telefone}</p>
                        <p>Site: {site}</p>
                        <p>Endereço: {endereco}</p>
                        <p>Instagram: {instagram}</p>
                        <p>Delivery: {delivery ? "Sim" : "Não"}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </li>
              <hr className="my-2" />
            </ul>
          )
        )}
    </div>
  );
}

export default Providers;
