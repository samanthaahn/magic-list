const { AuthenticationError } = require("apollo-server-express");
const { User, Habit } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("habits").populate("diaries");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("habits").populate("diaries");
    },
    habits: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Habit.find(params).sort({ createdAt: -1 });
    },
    habit: async (parent, { thoughtId }) => {
      return Habit.findOne({ _id: habitId });
    },
    me: async (parent, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("habits");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addHabit: async (parent, { habitText }, context) => {
      if (context.user) {
        const habit = await Habit.create({
          habitText,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { habits: habit._id } }
        );

        return habit;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addDiary: async (parent, { diaryText }, context) => {
      if (context.user) {
        const diary = await Diary.create({
          diaryText,
        });
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { diaries: diary._id } }
        );

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Habit.findOneAndUpdate(
          { _id: habitId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeHabit: async (parent, { habitId }, context) => {
      if (context.user) {
        const habit = await Habit.findOneAndDelete({
          _id: habitId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { habits: habit._id } }
        );

        return habit;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { habitId, commentId }, context) => {
      if (context.user) {
        return Habit.findOneAndUpdate(
          { _id: habitId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
