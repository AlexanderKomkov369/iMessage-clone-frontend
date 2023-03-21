import { gql } from "@apollo/client";

export const MessagesFields = `
  id
  sender {
    id
    username
  }
  body
  createdAt
`;

export const MessageOperations = {
  Queries: {
    messages: gql`
      query Messages($conversationId: String!) {
        messages(conversationId: $conversationId) {
            ${MessagesFields}
        }
      }
    `,
  },
  Mutations: {
    sendMessage: gql`
      mutation SendMessage(
        $id: String!
        $conversationId: String!
        $senderId: String!
        $body: String!
      ) {
        sendMessage(
          id: $id
          conversationId: $conversationId
          senderId: $senderId
          body: $body
        )
      }
    `,
  },
  Subscriptions: {
    messageSent: gql`
      subscription MessageSent($conversationId: String!) {
        messageSent(conversationId: $conversationId) {
            ${MessagesFields}
        }
      }
    `,
  },
};
