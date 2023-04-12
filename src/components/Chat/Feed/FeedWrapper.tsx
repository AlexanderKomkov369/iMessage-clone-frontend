import React from "react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import MessagesHeader from "@/components/Chat/Feed/Messages/MessagesHeader";
import MessagesInput from "@/components/Chat/Feed/Messages/MessagesInput";
import Messages from "@/components/Chat/Feed/Messages/Messages";
import NoConversationSelected from "@/components/Chat/Feed/NoConversationSelected";

type FeedWrapperProps = {
  session: Session;
};

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  const router = useRouter();

  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      width={"100%"}
      direction={"column"}
    >
      {conversationId && typeof conversationId === "string" ? (
        <>
          <Flex
            direction={"column"}
            justify={"space-between"}
            overflow={"hidden"}
            flexGrow={1}
          >
            <MessagesHeader userId={userId} conversationId={conversationId} />
            <Messages userId={userId} conversationId={conversationId} />
          </Flex>
          <MessagesInput session={session} conversationId={conversationId} />
        </>
      ) : (
        <NoConversationSelected />
      )}
    </Flex>
  );
};

export default FeedWrapper;
