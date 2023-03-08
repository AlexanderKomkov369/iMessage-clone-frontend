import { ParticipantPopulated } from "../../../backend/src/graphql/types/conversations/types";

export const formatUsernames = (
  participants: ParticipantPopulated[],
  myUserId: string
) => {
  const usernames = participants
    .filter((participant) => participant.user.id !== myUserId)
    .map((participant) => participant.user.username);

  return usernames.join(", ");
};
