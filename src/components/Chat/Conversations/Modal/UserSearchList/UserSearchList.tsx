import React from "react";
import { Query } from "@/graphql/types/user";
import { Flex, Stack, Text } from "@chakra-ui/react";
import UserSearchCard from "@/components/Chat/Conversations/Modal/UserSearchList/UserSearchCard";
import Participants from "@/components/Chat/Conversations/Modal/UserSearchList/Participants";
import SearchedUser = Query.SearchedUser;
import AddParticipant = Participants.AddParticipant;

type UserSearchListProps = {
  users: SearchedUser[];
  addParticipant: AddParticipant;
};

const UserSearchList: React.FC<UserSearchListProps> = ({
  users,
  addParticipant,
}) => {
  if (!users.length)
    return (
      <Flex mt={6} justify={"center"}>
        <Text>No users found</Text>
      </Flex>
    );

  return (
    <Stack mt={6}>
      {users.map((user) => (
        <UserSearchCard
          key={user.id}
          user={user}
          addParticipant={addParticipant}
        />
      ))}
    </Stack>
  );
};

export default UserSearchList;
