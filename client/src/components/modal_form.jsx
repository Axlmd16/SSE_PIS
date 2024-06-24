import React, { useContext, useEffect } from "react";
import { Context } from "../store/context";

function Modal_Form({ children }) {
  const { actions } = useContext(Context);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        actions.handleModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [actions]);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal modal-open">
        <div className="modal-box w-5/12 max-w-5xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={actions.handleModal}
          >
            ✕
          </button>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal_Form;
