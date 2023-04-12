import React from "react";
import { useQuery } from "@apollo/client";
import { ConversationsData } from "@/graphql/types/conversation";
import { ConversationOperations } from "@/graphql/operations/conversation";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { BiMessageSquareDots } from "react-icons/bi";

const NoConversationSelected: React.FC = () => {
  const { data, loading, error } = useQuery<ConversationsData>(
    ConversationOperations.Queries.conversations
  );

  if (!data?.conversations || loading || error) return null;

  const { conversations } = data;

  const hasConversations = !!conversations.length;

  const text = hasConversations
    ? "Select a Conversation"
    : "Let's get started!";

  return (
    <Flex height={"100%"} justify={"center"} align={"center"}>
      <Stack spacing={10} align={"center"}>
        <Text fontSize={40}>{text}</Text>
        <BiMessageSquareDots fontSize={90} />
      </Stack>
    </Flex>
  );
};

export default NoConversationSelected;
