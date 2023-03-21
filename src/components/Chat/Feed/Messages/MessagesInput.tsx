import React, { FormEvent, useState } from "react";
import { Session } from "next-auth";
import { Box, Input } from "@chakra-ui/react";
import toast from "react-hot-toast";

type MessagesInputProps = {
  session: Session;
  conversationId: string;
};

const MessagesInput: React.FC<MessagesInputProps> = ({
  session,
  conversationId,
}) => {
  const [message, setMessage] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
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
          value={message}
          onChange={(event) => event.target.value}
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
