import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_DIARY = gql`
mutation Mutation($diaryText: String!) {
  addDiary(diaryText: $diaryText) {
    username
    diaries {
      diaryText
      date
      _id
    }
  }
}
`
export const EDIT_DIARY = gql`
mutation Mutation($diaryId: ID!, $diaryText: String!) {
  editDiary(diaryId: $diaryId, diaryText: $diaryText) {
      diaryText
      _id
  }
}
`
export const DELETE_DIARY = gql`
mutation Mutation($diaryId: ID!) {
  deleteDiary(diaryId: $diaryId) {
      _id
    }
}
`
export const ADD_HABIT = gql`
mutation Mutation($habitText: String!) {
  addHabit(habitText: $habitText) {
    username
    habits {
      habitText
      date
      _id
    }
  }
}
`
export const EDIT_HABIT = gql`
mutation Mutation($habitId: ID!, $habitText: String!) {
  editHabit(habitId: $habitId, habitText: $habitText) {
      habitText
      _id
  }
}
`
export const DELETE_HABIT = gql`
mutation Mutation($habitId: ID!) {
  deleteHabit(habitId: $habitId) {
      _id
    }
}
`