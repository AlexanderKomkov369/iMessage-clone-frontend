import { MessagePopulated } from "../../../../backend/src/graphql/types/messages";

export module Query {
  export interface MessagesData {
    messages: MessagePopulated[];
  }

  export interface MessagesVariables {
    conversationId: string;
  }
}

export module Mutation {
  export interface SendMessageData {
    sendMessage: boolean;
  }

  export interface SendMessageVariables {
    id: string;
    conversationId: string;
    senderId: string;
    body: string;
  }
}

export module Subscription {
  export interface MessageSubscriptionData {
    subscriptionData: {
      data: {
        messageSent: MessagePopulated;
      };
    };
  }
}
