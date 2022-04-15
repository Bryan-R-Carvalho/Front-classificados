import { createContext, useCallback, useContext, useState } from "react";
import ToastContainer from "../components/ToastContainer";
import { v4 as uuid } from "uuid";

const toastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type, title, description }) => {
    const id = uuid();
    const toast = {
      id,
      type,
      title,
      description,
    };

    setToasts((state) => [...state, toast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((state) => state.filter((toast) => toast.id !== id));
  }, []);

  return (
    <toastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toast={toasts} />
    </toastContext.Provider>
  );
};

function useToast() {
  const context = useContext(toastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export { ToastProvider, useToast };
