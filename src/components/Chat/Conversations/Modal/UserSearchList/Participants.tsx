import React from "react";
import { Query } from "@/graphql/types/user";
import SearchedUser = Query.SearchedUser;
import RemoveParticipant = Participants.RemoveParticipant;
import { Flex, Stack, Text } from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";

declare module Participants {
  export type AddParticipant = (user: SearchedUser) => void;
  export type RemoveParticipant = (userId: SearchedUser["id"]) => void;
}

type ParticipantsProps = {
  participants: SearchedUser[];
  removeParticipant: RemoveParticipant;
};

const Participants: React.FC<ParticipantsProps> = ({
  participants,
  removeParticipant,
}) => {
  return (
    <Flex mt={8} gap={"10px"} flexWrap={"wrap"}>
      {participants.map(({ id, username }) => (
        <Stack
          key={id}
          direction={"row"}
          align={"center"}
          bg={"whiteAlpha.200"}
          borderRadius={4}
          p={2}
        >
          <Text>{username}</Text>
          <IoIosCloseCircleOutline
            size={20}
            cursor={"pointer"}
            onClick={() => removeParticipant(id)}
          />
        </Stack>
      ))}
    </Flex>
  );
};

export default Participants;
