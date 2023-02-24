import React from "react";
import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import ConversationsList from "@/components/Chat/Conversations/ConversationsList";

type ConversationsWrapperProps = {
  session: Session;
};

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      bg={"whiteAlpha.50"}
      py={6}
      px={3}
    >
      <ConversationsList session={session} />
    </Box>
  );
};

export default ConversationsWrapper;
