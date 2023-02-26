export { ConversationPopulated } from "../../../../backend/src/graphql/types/conversations/types";

export module Mutation {
  export interface CreateConversationResponse {
    createConversation: {
      conversationId: string;
    };
  }

  export interface CreateConversationVariables {
    participantIds: string[];
  }
}

export interface ConversationResponse {
  conversations: ConversationPopulated[];
}
