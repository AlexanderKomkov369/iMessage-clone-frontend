import React from "react";
import { Query } from "@/graphql/types/user";
import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Participants from "@/components/Chat/Conversations/Modal/UserSearchList/Participants";
import SearchedUser = Query.SearchedUser;
import AddParticipant = Participants.AddParticipant;

type UserSearchCardProps = {
  user: SearchedUser;
  addParticipant: AddParticipant;
};

const UserSearchCard: React.FC<UserSearchCardProps> = ({
  user,
  addParticipant,
}) => {
  return (
    <Stack
      direction={"row"}
      align={"center"}
      spacing={4}
      py={2}
      px={4}
      borderRadius={4}
      _hover={{ bg: "whiteAlpha.200" }}
    >
      <Avatar />
      <Flex justify={"space-between"} align={"center"} width={"100%"}>
        <Text color={"whiteAlpha.700"}>{user.username}</Text>
        <Button
          bg={"brand.100"}
          _hover={{ bg: "brand.100" }}
          onClick={() => addParticipant(user)}
        >
          Select
        </Button>
      </Flex>
    </Stack>
  );
};

export default UserSearchCard;
