import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation PegXMutations (
    $address: String,
    $password: String,
    $iban: String,
    $email: String
  ) {
    signup (
      xbtAddress: $address,
      password: $password,
      depositIban: $iban,
      email: $email
    ) {
      error
      errorMessage
      sessionId
    }
  }
`;

export const LOG_IN = gql`
  mutation PegXMutations ($password: String, $email: String) {
    simpleLogin(password: $password, email: $email) {
      status
      sessionId
    }
  }
`;

export const AUTH_EID_SIGNUP = gql`
  mutation PegXMutations {
    authEidSignup {
      requestId
    }
  }
`;

export const AUTH_EID_AUTHORIZE = gql`
  mutation PegXMutations {
    authEidAuthorize {
      requestId
    }
  }
`;
