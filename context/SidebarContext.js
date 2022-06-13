import React, { createContext, useCallback, useState } from "react";
import EditProvider from "../components/EditProvider";

export const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((state) => setIsOpen(state), []);

  return (
    <SidebarContext.Provider value={{ isOpen, open }}>
      {children}
    </SidebarContext.Provider>
  );
};
