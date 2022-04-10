import React, { createContext, useCallback, useState } from "react";

export const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const search = useCallback(async (products) => {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${products}`
    );
    const data = await response.json();
    setItem(data);
    return data;
  }, []);

  return (
    <SearchContext.Provider value={{ item, search }}>
      {children}
    </SearchContext.Provider>
  );
};
