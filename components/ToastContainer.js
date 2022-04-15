import Toast from "./Toast";

function ToastContainer({ toast }) {
  return (
    <div className="absolute top-0 right-0 p-8 overflow-hidden">
      {toast.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

export default ToastContainer;
