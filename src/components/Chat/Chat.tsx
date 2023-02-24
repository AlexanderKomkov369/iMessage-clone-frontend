import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import ConversationsWrapper from "@/components/Chat/Conversations/ConversationsWrapper";
import FeedWrapper from "@/components/Chat/Feed/FeedWrapper";

type ChatProps = {
  session: Session;
};

const Chat: React.FC<ChatProps> = ({ session }) => {
  return (
    <Flex height={"100vh"}>
      <ConversationsWrapper session={session} />
      <FeedWrapper session={session} />
    </Flex>
  );
};

export default Chat;
