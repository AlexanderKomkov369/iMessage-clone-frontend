export module Mutation {
  interface CreateUsernameData {
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

  interface SearchUsersData {
    searchUsers: SearchedUser[];
  }

  interface SearchedUser {
    id: string;
    username: string;
  }
}
