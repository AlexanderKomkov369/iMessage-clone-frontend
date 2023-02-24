import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ConversationsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConversationsModal: React.FC<ConversationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>MODAL BODY</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationsModal;
