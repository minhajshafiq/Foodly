import React from "react";
import ReactModal from "react-modal";
import "./modal.scss";

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAfterClose?: () => void;
  contentLabel: string;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onRequestClose,
  onAfterClose,
  contentLabel,
  children,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterClose={onAfterClose}
      contentLabel={contentLabel}
      ariaHideApp={false}
      className="Modal"
      overlayClassName="Overlay"
    >
      {children}
      <button onClick={onRequestClose}>Fermer</button>
    </ReactModal>
  );
};

export default ModalComponent;
