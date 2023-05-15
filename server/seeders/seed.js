const db = require('../config/connection');
const { User, Habit } = require('../models');
const userSeeds = require('./userSeeds.json');
const habitSeeds = require('./habitSeeds.json');

db.once('open', async () => {
  try {
    await Habit.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < habitSeeds.length; i++) {
      const { _id, username } = await Habit.create(habitSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            habits: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
