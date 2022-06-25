import React, { createContext, useCallback, useState } from "react";

export const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const search = useCallback(async (categoriaId) => {
    const response = await fetch(
      `https://classificados-back2.herokuapp.com/produtos/categoria/${categoriaId}`
    );
    const data = await response.json();
    setItem(data);
    return data;
  }, []);

  const searchByName = useCallback(async (nome) => {
    const response = await fetch(
      `https://classificados-back2.herokuapp.com/produtos/buscar/${nome}`
    );
    const data = await response.json();
    setItem(data);
    return data;
  }, []);

  return (
    <SearchContext.Provider value={{ item, search, searchByName }}>
      {children}
    </SearchContext.Provider>
  );
};
