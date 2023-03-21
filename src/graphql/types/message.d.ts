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
  export interface SendMessageResponse {
    sendMessage: boolean;
  }

  export interface SendMessageVariables {
    id: string;
    conversationId: string;
    senderId: string;
    body: string;
  }
}
