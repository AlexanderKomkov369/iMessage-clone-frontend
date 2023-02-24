import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

type ConversationsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConversationsModal: React.FC<ConversationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = useState("");

  const onSearch = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#2d2d2d"} pb={4}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder={"Enter a username..."}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Button type={"submit"} isDisabled={!username}>
                  Search
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationsModal;
