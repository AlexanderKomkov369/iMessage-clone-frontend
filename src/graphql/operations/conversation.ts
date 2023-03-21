import { gql } from "@apollo/client";
import { MessagesFields } from "@/graphql/operations/message";

const ConversationFields = `
  id
  participants {
    user {
      id
      username
    }
    hasSeenLatestMessage
  }
  latestMessage {
    ${MessagesFields}
  }
  updatedAt
`;

export const ConversationOperations = {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations {
          ${ConversationFields}   
        }
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    conversationCreated: gql`
        subscription ConversationCreated {
            conversationCreated {
                ${ConversationFields}
            }
        }
    `,
  },
};
