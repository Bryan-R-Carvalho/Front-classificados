import { FiAlertCircle, FiXCircle } from "react-icons/fi";
function ToastContainer() {
  return (
    <div className="absolute top-0 right-0 p-8 overflow-hidden">
      <div className="w-96 relative pt-4 pr-8 pb-4 pl-4 rounded-xl shadow-sm flex bg-slate-400 text-slate-500">
        <FiAlertCircle size={20} />
        <div className="flex-1">
          <strong>Aconteceu um erro</strong>
          <p className="mt-1 text-sm opacity-80 leading-5">
            Não foi possível fazer login na aplicação
          </p>
        </div>
        <button className="absolute right-4 top-5 opacity-60 border-0">
          <FiXCircle size={18} />
        </button>
      </div>
    </div>
  );
}

export default ToastContainer;
