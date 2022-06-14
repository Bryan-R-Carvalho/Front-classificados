import React, { createContext, useCallback, useState } from "react";

export const OpenContext = createContext({});

export const OpenProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const open = useCallback((state) => setIsOpen(state), []);
  const openEditModal = useCallback((state) => setOpenEdit(state), []);

  return (
    <OpenContext.Provider value={{ isOpen, open, openEdit, openEditModal }}>
      {children}
    </OpenContext.Provider>
  );
};
