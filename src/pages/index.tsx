import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";

type HomeProps = {
  session: Session | null;
};

const Home: NextPage<HomeProps> = () => {
  const { data: session } = useSession();

  console.log("HERE S A SESSION: ", session);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <Box>
      {session?.user?.username ? (
        <Chat session={session} />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

export default Home;
