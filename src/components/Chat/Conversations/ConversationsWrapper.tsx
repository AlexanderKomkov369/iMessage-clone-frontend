import React, { useEffect } from "react";
import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import ConversationsList from "@/components/Chat/Conversations/ConversationsList/ConversationsList";
import { useQuery } from "@apollo/client";
import { ConversationOperations } from "@/graphql/operations/conversation";
import {
  ConversationPopulated,
  ConversationsResponse,
} from "@/graphql/types/conversation";
import { useRouter } from "next/router";

export module Conversation {
  export type onViewConversation = (conversationId: string) => void;
}

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
    subscribeToMore,
  } = useQuery<ConversationsResponse>(
    ConversationOperations.Queries.conversations
  );
  const router = useRouter();
  const {
    query: { conversationId },
  } = router;

  const onViewConversation: Conversation.onViewConversation = (
    conversationId
  ) => {
    router.push({ query: { conversationId } });
  };

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToNewConversations();
  }, []);

  return (
    <Box
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "400px" }}
      bg={"whiteAlpha.50"}
      py={6}
      px={3}
    >
      <ConversationsList
        session={session}
        conversations={conversationData?.conversations ?? []}
        onViewConversation={onViewConversation}
      />
    </Box>
  );
};

export default ConversationsWrapper;
