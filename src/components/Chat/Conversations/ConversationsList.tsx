import React, { useState } from "react";
import { Session } from "next-auth";
import { Box, Text } from "@chakra-ui/react";
import ConversationsModal from "@/components/Chat/Conversations/Modal/Modal";

type ConversationsListProps = {
  session: Session;
};

const ConversationsList: React.FC<ConversationsListProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Box width={"100%"}>
      <Box
        py={2}
        px={4}
        mb={4}
        bg={"blackAlpha.300"}
        borderRadius={4}
        cursor={"pointer"}
        onClick={onOpen}
      >
        <Text textAlign={"center"} color={"whiteAlpha.800"} fontWeight={500}>
          Find or start a conversation
        </Text>
      </Box>
      <ConversationsModal session={session} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ConversationsList;
