import { MessagePopulated } from "../../../../backend/src/graphql/types/messages";

export module Query {
  export interface MessagesResponse {
    messages: MessagePopulated[];
  }

  export interface MessagesVariables {
    conversationId: string;
  }
}

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
