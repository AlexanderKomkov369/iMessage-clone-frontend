import React, { useEffect } from "react";
import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import ConversationsList from "@/components/Chat/Conversations/ConversationsList/ConversationsList";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { ConversationOperations } from "@/graphql/operations/conversation";
import {
  ConversationPopulated,
  ConversationsData,
  Mutation,
  Subscription,
} from "@/graphql/types/conversation";
import { useRouter } from "next/router";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import MarkConversationAsReadData = Mutation.MarkConversationAsReadData;
import MarkConversationAsReadVariables = Mutation.MarkConversationAsReadVariables;
import { ParticipantPopulated } from "../../../../../backend/src/graphql/types/conversations";
import ConversationUpdatedData = Subscription.ConversationUpdatedData;

export module Conversation {
  export type onViewConversation = (
    conversationId: string,
    hasSeenLatestMessage: boolean
  ) => void;
}

type ConversationsWrapperProps = {
  session: Session;
};

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const router = useRouter();
  const {
    query: { conversationId },
  } = router;
  const {
    user: { id: userId },
  } = session;

  const {
    data: conversationData,
    error: conversationError,
    loading: conversationLoading,
    subscribeToMore,
  } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);

  const [markConversationAsRead] = useMutation<
    MarkConversationAsReadData,
    MarkConversationAsReadVariables
  >(ConversationOperations.Mutations.markConversationAsRead);

  useSubscription<ConversationUpdatedData>(
    ConversationOperations.Subscriptions.conversationUpdated,
    {
      onData: ({ client, data }) => {
        const { data: subscriptionData } = data;

        if (!subscriptionData) return;

        const {
          conversationUpdated: { conversation: updatedConversation },
        } = subscriptionData;

        if (updatedConversation.id === conversationId) {
          onViewConversation(updatedConversation.id, false);
        }
      },
    }
  );

  const onViewConversation: Conversation.onViewConversation = async (
    conversationId,
    hasSeenLatestMessage: boolean
  ) => {
    // Push the conversationId to the router query params
    router.push({ query: { conversationId } });
    // Mark the conversation as read
    if (hasSeenLatestMessage) return;
    // markConversationAsRead mutation
    try {
      await markConversationAsRead({
        variables: {
          userId,
          conversationId,
        },
        optimisticResponse: {
          markConversationAsRead: true,
        },
        update: (cache) => {
          const participantsFragment = cache.readFragment<{
            participants: ParticipantPopulated[];
          }>({
            id: `Conversation:${conversationId}`,
            fragment: gql`
              fragment Participants on Conversation {
                participants {
                  user {
                    id
                    username
                  }
                  hasSeenLatestMessage
                }
              }
            `,
          });

          if (!participantsFragment) return;

          const participants = [...participantsFragment.participants];

          const userParticipantIdx = participants.findIndex(
            (participant) => participant.user.id === userId
          );

          if (userParticipantIdx === -1) return;

          const userParticipant = participants[userParticipantIdx];

          // Update participant to show the latest message as read
          participants[userParticipantIdx] = {
            ...userParticipant,
            hasSeenLatestMessage: true,
          };

          // Update cache
          cache.writeFragment({
            id: `Conversation:${conversationId}`,
            fragment: gql`
              fragment UpdatedParticipant on Conversation {
                participants
              }
            `,
            data: {
              participants,
            },
          });
        },
      });
    } catch (error) {
      console.log("onViewConversation error: ", error);
    }
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
      flexDirection={"column"}
      bg={"whiteAlpha.50"}
      gap={4}
      py={6}
      px={3}
    >
      {conversationLoading ? (
        <SkeletonLoader count={7} height={"80px"} />
      ) : (
        <ConversationsList
          session={session}
          conversations={conversationData?.conversations ?? []}
          onViewConversation={onViewConversation}
        />
      )}
    </Box>
  );
};

export default ConversationsWrapper;
