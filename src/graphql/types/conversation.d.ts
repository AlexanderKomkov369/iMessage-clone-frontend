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
}

export module Subscription {
  export interface ConversationUpdatedData {
    conversationUpdated: {
      // conversation: Omit<ConversationPopulated, "latestMessage"> & {
      //   latestMessage: MessagePopulated;
      // };
      conversation: ConversationPopulated;
    };
  }
}

export interface ConversationsData {
  conversations: ConversationPopulated[];
}
