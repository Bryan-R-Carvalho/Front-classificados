import React, { createContext, useCallback, useState } from "react";

export const EditProviderContext = createContext({});

export const EditProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((state) => setIsOpen(state), []);

  return (
    <EditProviderContext.Provider value={{ isOpen, open }}>
      {children}
    </EditProviderContext.Provider>
  );
};
