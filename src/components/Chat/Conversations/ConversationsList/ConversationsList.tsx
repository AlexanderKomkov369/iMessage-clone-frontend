import React, { useState } from "react";
import { Session } from "next-auth";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import ConversationsModal from "@/components/Chat/Conversations/Modal/Modal";
import { ConversationPopulated } from "../../../../../../backend/src/graphql/types/conversations/types";
import ConversationItem from "@/components/Chat/Conversations/ConversationsList/ConversationItem";
import { Conversation } from "@/components/Chat/Conversations/ConversationsWrapper";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { ConversationOperations } from "@/graphql/operations/conversation";
import { Mutation } from "@/graphql/types/conversation";
import DeleteConversationVariables = Mutation.DeleteConversationVariables;
import DeleteConversationData = Mutation.DeleteConversationData;
import toast from "react-hot-toast";
import * as process from "process";
import { signOut } from "next-auth/react";

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
  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [deleteConversation] = useMutation<
    DeleteConversationData,
    DeleteConversationVariables
  >(ConversationOperations.Mutations.deleteConversation);

  const onDeleteConversation: Conversation.onDeleteConversation = async (
    conversationId: string
  ) => {
    try {
      toast.promise(
        deleteConversation({
          variables: {
            conversationId,
          },
          update: () => {
            router.replace(
              typeof process.env.NEXT_PUBLIC_BASE_URL === "string"
                ? process.env.NEXT_PUBLIC_BASE_URL
                : ""
            );
          },
        }),
        {
          loading: "Deleting conversation...",
          success: "Conversation deleted",
          error: "Failed to delete conversation",
        }
      );
    } catch (error) {
      console.log("onDeleteConversation error: ", error);
    }
  };

  const sortedConversations = [...conversations].sort(
    (a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf()
  );

  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      position={"relative"}
      height={"100%"}
      overflow={"hidden"}
    >
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
        {sortedConversations.map((conversation) => {
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
              onDeleteConversation={onDeleteConversation}
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
      <Box
        position={"absolute"}
        left={0}
        bottom={0}
        width={"100%"}
        px={8}
        py={6}
      >
        <Button width={"100%"} onClick={() => signOut()}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default ConversationsList;
