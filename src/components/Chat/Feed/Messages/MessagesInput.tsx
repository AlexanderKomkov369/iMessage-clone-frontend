import React, { FormEvent, useState } from "react";
import { Session } from "next-auth";
import { Box, Input } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { MessageOperations } from "@/graphql/operations/message";
import { Mutation } from "@/graphql/types/message";
import { ObjectId } from "bson";
import SendMessageResponse = Mutation.SendMessageResponse;
import SendMessageVariables = Mutation.SendMessageVariables;

type MessagesInputProps = {
  session: Session;
  conversationId: string;
};

const MessagesInput: React.FC<MessagesInputProps> = ({
  session,
  conversationId,
}) => {
  const [messageBody, setMessageBody] = useState("");
  const [sendMessage] = useMutation<SendMessageResponse, SendMessageVariables>(
    MessageOperations.Mutations.sendMessage
  );

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { id: senderId } = session.user;
      const messageId = new ObjectId().toString();
      const newMessage: SendMessageVariables = {
        id: messageId,
        senderId,
        conversationId,
        body: messageBody,
      };

      const { data, errors } = await sendMessage({
        variables: {
          ...newMessage,
        },
      });

      if (!data?.sendMessage || errors) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.log("onSubmitMessage error: ", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Box px={4} py={6} width={"100%"}>
      <form onSubmit={onSubmit}>
        <Input
          value={messageBody}
          onChange={(event) => setMessageBody(event.target.value)}
          size={"md"}
          placeholder={"New message"}
          resize={"none"}
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "whiteAlpha.300",
          }}
          _hover={{ borderColor: "whiteAlpha.300" }}
        />
      </form>
    </Box>
  );
};

export default MessagesInput;
