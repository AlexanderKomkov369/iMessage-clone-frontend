export { ConversationPopulated } from "../../../../backend/src/graphql/types/conversations/types";

export module Mutation {
  export interface CreateConversationData {
    createConversation: {
      conversationId: string;
    };
  }

  export interface CreateConversationVariables {
    participantIds: string[];
  }
}

export interface ConversationsData {
  conversations: ConversationPopulated[];
}
