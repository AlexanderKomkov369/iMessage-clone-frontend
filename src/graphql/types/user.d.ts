export module Mutation {
  interface CreateUsernameResponse {
    createUsername: {
      success: Boolean;
      error: String;
    };
  }

  interface CreateUsernameVariables {
    username: string;
  }
}
