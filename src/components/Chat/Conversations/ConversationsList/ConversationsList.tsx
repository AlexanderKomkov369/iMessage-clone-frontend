import React, { useState } from "react";
import { Session } from "next-auth";
import { Box, Stack, Text } from "@chakra-ui/react";
import ConversationsModal from "@/components/Chat/Conversations/Modal/Modal";
import { ConversationPopulated } from "../../../../../../backend/src/graphql/types/conversations/types";
import ConversationItem from "@/components/Chat/Conversations/ConversationsList/ConversationItem";
import { Conversation } from "@/components/Chat/Conversations/ConversationsWrapper";
import { useRouter } from "next/router";

type ConversationsListProps = {
  session: Session;
  conversations: ConversationPopulated[];
  onViewConversation: Conversation.onViewConversation;
};

const ConversationsList: React.FC<ConversationsListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const {
    user: { id: userId },
  } = session;

  const { conversationId } = router.query;

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
      <Stack>
        {conversations.map((conversation) => {
          const participant = conversation.participants.find(
            (participant: ConversationPopulated) =>
              participant.user.id === userId
          );

          return (
            <ConversationItem
              key={conversation.id}
              userId={userId}
              conversation={conversation}
              selectedConversationId={conversationId as string}
              hasSeenLatestMessage={participant?.hasSeenLatestMessage}
              onClick={() =>
                onViewConversation(
                  conversation.id,
                  participant?.hasSeenLatestMessage
                )
              }
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default ConversationsList;
