import React from "react";
import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import ConversationsList from "@/components/Chat/Conversations/ConversationsList";
import { useQuery } from "@apollo/client";
import { ConversationOperations } from "@/graphql/operations/conversation";
import { ConversationResponse } from "@/graphql/types/conversation";

type ConversationsWrapperProps = {
  session: Session;
};

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationData,
    error: conversationError,
    loading: conversationLoading,
  } = useQuery<ConversationResponse>(
    ConversationOperations.Queries.conversations
  );

  console.log("ConversationsWrapper DATA: ", conversationData);

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
