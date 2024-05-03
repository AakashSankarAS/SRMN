import { Modal, ModalHeader, ModalBody } from "reactstrap";

function PreviewModal({ children, modalHeader, modal, setModal }) {
  const toggle = () => setModal(!modal);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <h1>{modalHeader}</h1>
      </ModalHeader>
      <ModalBody className="mt--4">{children}</ModalBody>
    </Modal>
  );
}

export default PreviewModal;
