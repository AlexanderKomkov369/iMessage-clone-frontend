import React from "react";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

type ChatProps = {};

const Chat: React.FC<ChatProps> = () => {
  return (
    <div>
      Chat<Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default Chat;
