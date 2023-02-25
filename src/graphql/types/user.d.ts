export module Mutation {
  interface CreateUsernameResponse {
    createUsername: {
      success: boolean;
      error: string;
    };
  }

  interface CreateUsernameVariables {
    username: string;
  }
}

export module Query {
  interface SearchUsersVariables {
    username: string;
  }

  interface SearchUsersResponse {
    searchUsers: SearchedUser[];
  }

  interface SearchedUser {
    id: string;
    username: string;
  }
}
