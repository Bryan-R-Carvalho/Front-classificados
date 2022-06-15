import { useContext, useState } from "react";
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
  const [currentProvider, setCurrentProvider] = useState(null);

  const onOpenEdit = (id) => {
    setCurrentProvider(providersList.find((provider) => provider.id === id));
    openEditModal(true);
  };

  return (
    <div>
      <ul>
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
            <li key={id}>
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
                      {openEdit ? (
                        <EditProvider
                          provider={currentProvider}
                          onEdit={onEdit}
                          openEditModal={openEditModal}
                        />
                      ) : null}
                      <div className="flex flex-col">
                        <span>E-mail: {email}</span>
                        <span>Whatsapp: {whatsapp}</span>
                        <span>Telefone: {telefone}</span>
                        <span>Site: {site}</span>
                        <span>Instagram: {instagram}</span>
                        <span>Endereço: {endereco}</span>
                        <span>Delivery: {delivery ? "Sim" : "Não"}</span>
                      </div>
                      <button
                        className="flex my-2 button cursor-pointer"
                        onClick={() => onOpenEdit(id)}
                      >
                        <PencilIcon className="w-4 mr-2" />
                        Editar
                      </button>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <hr className="my-2" />
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default ManageProviders;
