import React from "react";
import { ConversationPopulated } from "../../../../../backend/src/graphql/types/conversations/types";
import { Stack, Text } from "@chakra-ui/react";

type ConversationItemProps = {
  conversation: ConversationPopulated;
};

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  return (
    <Stack p={4} _hover={{ bg: "whiteAlpha.200" }}>
      <Text>{conversation.id}</Text>
    </Stack>
  );
};

export default ConversationItem;