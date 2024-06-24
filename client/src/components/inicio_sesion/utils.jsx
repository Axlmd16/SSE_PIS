export function ModalConfirmation({ msg, onConfirm, onCancel }) {
  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{msg}</h3>
        <p className="py-4">
          Presiona ESC o haz clic en el botón a continuación para cerrar
        </p>
        <div className="modal-action">
          <button className="btn mx-3" onClick={onCancel}>
            Cancelar
          </button>
          <button
            onFocus={(e) => e.target.blur()}
            className="btn"
            onClick={onConfirm}
          >
            Aceptar
          </button>
        </div>
      </div>
    </dialog>
  );
}
