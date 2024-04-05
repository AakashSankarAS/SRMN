import { Modal, ModalHeader, ModalBody } from "reactstrap";

function PreviewModal({ children, modalHeader, modal, setModal }) {
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalHeader}</ModalHeader>
        <ModalBody className="mt--4">{children}</ModalBody>
      </Modal>
    </div>
  );
}

export default PreviewModal;
