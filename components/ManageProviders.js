import { useState, useContext } from "react";
import EditProvider from "./EditProvider";
import { Disclosure } from "@headlessui/react";
import { EditProviderContext } from "../context/EditProviderContext";
import {
  LockOpenIcon,
  PencilIcon,
  TrashIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";

function ManageProviders({ providers }) {
  const [providersList, setProvidersList] = useState(providers);
  const { isOpen, open } = useContext(EditProviderContext);

  return (
    <div>
      {providersList.map(
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
          aprovado,
        }) => (
          <ul key={id}>
            <li>
              <Disclosure>
                {({ Open }) => (
                  <>
                    <div className="flex">
                      <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 cursor-base hover:bg-neutral-100 dark:hover:bg-blackAlpha-50 focus:outline-none">
                        <p className="my-auto">{nome}</p>
                      </Disclosure.Button>
                      {aprovado ? (
                        <button className="flex button mx-2 cursor-pointer">
                          <LockClosedIcon className="w-4 mr-2" />
                          Desativar
                        </button>
                      ) : (
                        <button className="flex button mx-2 cursor-pointer">
                          <LockOpenIcon className="w-4 mr-2" />
                          Ativar
                        </button>
                      )}
                      <button className="flex buttonRemover cursor-pointer">
                        <TrashIcon className="w-4 mr-2" />
                        Remover
                      </button>
                    </div>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <EditProvider
                        id={id}
                        nome={nome}
                        email={email}
                        whatsapp={whatsapp}
                        telefone={telefone}
                        site={site}
                        endereco={endereco}
                        instagram={instagram}
                        delivery={delivery}
                      />
                      <div>
                        <p>E-mail: {email}</p>
                        <p>Whatsapp: {whatsapp}</p>
                        <p>Telefone: {telefone}</p>
                        <p>Site: {site}</p>
                        <p>Endereço: {endereco}</p>
                        <p>Instagram: {instagram}</p>
                        <p>Delivery: {delivery ? "Sim" : "Não"}</p>
                      </div>
                      <button
                        className="flex my-2 button cursor-pointer"
                        onClick={() => open(!isOpen)}
                      >
                        <PencilIcon className="w-4 mr-2" />
                        Editar
                      </button>
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

export default ManageProviders;
