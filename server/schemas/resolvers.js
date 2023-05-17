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
        console.log(context.user);
        return User.findOne({ _id: context.user._id }).populate("habits");
      }
      throw new AuthenticationError("You need to be logged in!");
    }
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
    addEvent: async (parent, { title, start, end }, context) => {
      if (context.user) {
        const event = await Event.create({
          title,
          start,
          end,
        });

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { events: event._id } },
          { new: true }
        );

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    editEvent: async (parent, { eventId, title, start, end }, context) => {
      if (context.user) {
        const event = await Event.findOneAndUpdate(
          { _id: eventId },
          { title, start, end },
          { new: true }
        );

        if (!event) {
          throw new Error("Event not found");
        }

        return event;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    editDiary: async (parent, { diaryId, text, date }, context) => {
      if (context.user) {
        const diary = await Diary.findOneAndUpdate(
          { _id: diaryId },
          { text, date },
          { new: true }
        );

        if (!diary) {
          throw new Error("Diary entry not found");
        }

        return diary;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteDiary: async (parent, { diaryId }, context) => {
      if (context.user) {
        const diary = await Diary.findOneAndDelete({ _id: diaryId });

        if (!diary) {
          throw new Error("Diary entry not found");
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { diaries: diary._id } }
        );

        return diary;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const event = await Event.findOneAndDelete({ _id: eventId });

        if (!event) {
          throw new Error("Event not found");
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: event._id } }
        );

        return event;
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
