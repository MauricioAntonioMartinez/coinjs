import React, { PropsWithChildren } from "react";
import "../styles/modal.css";
interface Props {
  open: boolean;
  closeModal: () => void;
}

export const Modal: React.FC<PropsWithChildren<Props>> = ({
  children,
  open,
  closeModal,
}) => {
  return open ? (
    <div className="modal-wrapper" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  ) : null;
};
