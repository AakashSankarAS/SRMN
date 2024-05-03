import { Modal, ModalHeader, ModalBody } from "reactstrap";

function MiniModal({ children, modal, setModal, setOTP }) {
  const toggle = () => {
    setModal(!modal);
    setOTP({ otp: "", visible: "" });
  };
  return (
    <Modal isOpen={modal} toggle={toggle} className="w-50">
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}

export default MiniModal;
