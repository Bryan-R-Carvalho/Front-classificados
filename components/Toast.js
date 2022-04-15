import { useEffect } from "react";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";
import { useToast } from "../context/ToastContext";

function Toast({ toast }) {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, toast.id]);

  return (
    <div
      type={toast.type}
      hasdrescription={toString(toast.hasDescription)}
      className={`${toast.type}`}
    >
      <FiAlertCircle size={20} />
      <div className="flex-1 mx-2">
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="absolute right-4 top-5 opacity-60 border-0"
      >
        <FiXCircle size={18} />
      </button>
    </div>
  );
}

export default Toast;
