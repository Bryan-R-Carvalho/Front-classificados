import { useContext } from "react";
import EditProvider from "./EditProvider";
import { Disclosure } from "@headlessui/react";
import { OpenContext } from "../context/OpenContext";

import {
  ThumbUpIcon,
  PencilIcon,
  TrashIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";

function ManageProviders({
  manageAprove,
  onEdit,
  openEditModal,
  providersList,
}) {
  const { openEdit } = useContext(OpenContext);

  return (
    <div>
      <h1>{openEdit}</h1>
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
                        <button
                          className="flex button mx-2 cursor-pointer"
                          onClick={() =>
                            manageAprove({
                              id,
                              nome,
                              email,
                              whatsapp,
                              telefone,
                              site,
                              endereco,
                              instagram,
                              delivery,
                              aprovado: false,
                            })
                          }
                        >
                          <LockClosedIcon className="w-4 mr-2" />
                          Desativar
                        </button>
                      ) : (
                        <button
                          className="flex buttonCadastrar mx-2 px-3 cursor-pointer"
                          onClick={() =>
                            manageAprove({
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
                            })
                          }
                        >
                          <ThumbUpIcon className="w-4 mr-2" />
                          Aprovar
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
                        onEdit={onEdit}
                        openEditModal={openEditModal}
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
                        onClick={() => openEditModal(!openEdit)}
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
