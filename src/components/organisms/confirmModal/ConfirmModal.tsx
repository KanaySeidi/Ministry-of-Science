type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmModal({
  open,
  title = "Подтверждение",
  description = "Вы уверены?",
  confirmLabel = "Да, удалить",
  cancelLabel = "Отмена",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel}></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6 z-10">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border cursor-pointer"
          >
            {" "}
            {cancelLabel}{" "}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:bg-red-400"
          >
            {" "}
            {confirmLabel}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
