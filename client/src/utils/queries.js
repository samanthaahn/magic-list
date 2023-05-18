import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      }
    }
`;

// Added Habits below:

export const QUERY_ME = gql`
query me {
  me {
    username
    diaries {
      diaryText
      date
      _id
    }
    habits {
      habitText
      date
      _id
    }
    _id
    email
  }
}
`;