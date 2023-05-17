const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    habits: [Habit]!
    diaries: [Diary]
  }

  type Habit {
    _id: ID
    habitText: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Diary {
    _id: ID
    text: String
    date: String
  }
  
  type Event {
    _id: ID
    title: String
    start: String
    end: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    habits(username: String): [Habit]
    habit(habitId: ID!): Habit
    me: User
  }



  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addHabit(habitText: String!): Habit
    addComment(habitId: ID!, commentText: String!): Habit
    removeHabit(habitId: ID!): Habit
    removeComment(habitId: ID!, commentId: ID!): Habit
    addDiary(diaryText: String!): User
    addEvent(title: String!, start: String!, end: String!): User
  }
`;

module.exports = typeDefs;