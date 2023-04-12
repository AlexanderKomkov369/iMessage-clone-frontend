import { Flex, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Query, Subscription } from "@/graphql/types/message";
import { MessageOperations } from "@/graphql/operations/message";
import toast from "react-hot-toast";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import MessageItem from "@/components/Chat/Feed/Messages/MessageItem";
import MessagesData = Query.MessagesData;
import MessagesVariables = Query.MessagesVariables;
import MessageSubscriptionData = Subscription.MessageSubscriptionData;

export type MessagesProps = {
  userId: string;
  conversationId: string;
};

const Messages: React.FC<MessagesProps> = ({ userId, conversationId }) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    MessagesData,
    MessagesVariables
  >(MessageOperations.Queries.messages, {
    variables: {
      conversationId,
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const subscribeToMoreMessages = (conversationId: string) => {
    subscribeToMore({
      document: MessageOperations.Subscriptions.messageSent,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: MessageSubscriptionData) => {
        if (!subscriptionData) return prev;

        const newMessage = subscriptionData.data.messageSent;

        return Object.assign({}, prev, {
          messages:
            newMessage.sender.id === userId
              ? prev.messages
              : [newMessage, ...prev.messages],
        } as MessagesData);
      },
    });
  };

  useEffect(() => {
    subscribeToMoreMessages(conversationId);
  }, [conversationId]);

  if (error) {
    return null;
  }

  return (
    <Flex direction={"column"} justify={"flex-end"} overflow={"hidden"}>
      {loading && (
        <Stack spacing={4} px={4}>
          <SkeletonLoader count={4} height={"60px"} />
        </Stack>
      )}
      {data?.messages && (
        <Flex direction={"column-reverse"} height={"100%"} overflowY={"scroll"}>
          {data.messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              sentByMe={message.sender.id === userId}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;
