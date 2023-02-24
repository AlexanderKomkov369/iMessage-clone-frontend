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
