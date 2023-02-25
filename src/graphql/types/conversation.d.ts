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
