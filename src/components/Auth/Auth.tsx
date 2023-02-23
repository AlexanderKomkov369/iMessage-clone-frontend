import React, { useState } from "react";
import { Session } from "next-auth";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useMutation } from "@apollo/client";
import UserOperations from "../../graphql/operations/user";
import { Mutation } from "@/graphql/types/user";

type AuthProps = {
  session: Session | null;
  reloadSession: () => void;
};

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const [createUsername, { data, loading, error }] = useMutation<
    Mutation.CreateUsernameResponse,
    Mutation.CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username) return;

    try {
      await createUsername({ variables: { username } });
    } catch (error) {
      console.log("onSubmit error: ", error);
    }
  };

  return (
    <Center height={"100vh"}>
      <Stack spacing={8} align={"center"}>
        {session ? (
          <>
            <Text fontSize={"3xl"}>Create a Username</Text>
            <Input
              placeholder={"Enter a username"}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onClick={onSubmit}
            />
            <Button onClick={onSubmit} width={"100%"} isDisabled={!username}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize={"3xl"}>MessengerQL</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={<Image src={"images/googlelogo.png"} height={"20px"} />}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
