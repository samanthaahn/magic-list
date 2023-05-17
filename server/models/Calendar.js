const { Schema, model } = require('mongoose');

const calendarSchema = new mongoose.Schema({
  calendarTitle: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
