import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UserOperations } from "@/graphql/operations/user";
import { Query } from "@/graphql/types/user";
import UserSearchList from "@/components/Chat/Conversations/Modal/UserSearchList/UserSearchList";
import Participants from "@/components/Chat/Conversations/Modal/UserSearchList/Participants";
import toast from "react-hot-toast";
import { ConversationOperations } from "@/graphql/operations/conversation";
import { Mutation } from "@/graphql/types/conversation";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import SearchUsersData = Query.SearchUsersData;
import SearchUsersVariables = Query.SearchUsersVariables;
import SearchedUser = Query.SearchedUser;
import AddParticipant = Participants.AddParticipant;
import RemoveParticipant = Participants.RemoveParticipant;
import CreateConversationVariables = Mutation.CreateConversationVariables;
import CreateConversationData = Mutation.CreateConversationData;

type ConversationsModalProps = {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
};

const ConversationsModal: React.FC<ConversationsModalProps> = ({
  session,
  isOpen,
  onClose,
}) => {
  const {
    user: { id: userId },
  } = session;
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<SearchedUser[]>([]);
  const [searchUsers, { data, loading: searchUsersLoading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersVariables
  >(UserOperations.Queries.searchUsers);
  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationVariables>(
      ConversationOperations.Mutations.createConversation
    );

  const onCreateConversation = async () => {
    try {
      const participantIds = [userId, ...participants.map(({ id }) => id)];
      const { data } = await createConversation({
        variables: {
          participantIds,
        },
      });

      if (!data?.createConversation) {
        throw new Error("Failed to create conversation");
      }

      const {
        createConversation: { conversationId },
      } = data;

      router.push({ query: { conversationId } });

      setParticipants([]);
      setUsername("");
      onClose();
    } catch (error) {
      console.log("onCreateConversation error: ", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const onSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    // search users query
    searchUsers({ variables: { username } });
  };

  const addParticipant: AddParticipant = (user) => {
    setParticipants((prev) => [...prev, user]);
    setUsername("");
  };

  const removeParticipant: RemoveParticipant = (userId) => {
    setParticipants((prev) => prev.filter(({ id }) => id !== userId));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#2d2d2d"} pb={4}>
          <ModalHeader>Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder={"Enter a username..."}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Button
                  type={"submit"}
                  isDisabled={!username}
                  isLoading={searchUsersLoading}
                >
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data?.searchUsers}
                addParticipant={addParticipant}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg={"brand.100"}
                  width={"100%"}
                  mt={6}
                  _hover={{ bg: "brand.100" }}
                  isLoading={createConversationLoading}
                  onClick={onCreateConversation}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationsModal;
