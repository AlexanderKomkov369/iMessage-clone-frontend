export { ConversationPopulated } from "../../../../backend/src/graphql/types/conversations/types";
export { MessagePopulated } from "../../../../backend/src/graphql/types/messages/types";

export module Mutation {
  export interface CreateConversationData {
    createConversation: {
      conversationId: string;
    };
  }

  export interface CreateConversationVariables {
    participantIds: string[];
  }

  export interface MarkConversationAsReadData {
    markConversationAsRead: boolean;
  }

  export interface MarkConversationAsReadVariables {
    userId: string;
    conversationId: string;
  }

  export interface DeleteConversationVariables {
    conversationId: string;
  }

  export interface DeleteConversationData {
    deleteConversation: boolean;
  }
}

export module Subscription {
  export interface ConversationUpdatedData {
    conversationUpdated: {
      conversation: ConversationPopulated;
    };
  }

  export interface ConversationDeletedData {
    conversationDeleted: {
      id: string;
    };
  }
}

export interface ConversationsData {
  conversations: ConversationPopulated[];
}
