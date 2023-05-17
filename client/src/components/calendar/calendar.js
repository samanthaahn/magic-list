import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
      />
    </div>
  );
};
const App = () => {
  return (
    <div>
      <h1>My Calendar</h1>
      <MyCalendar />
    </div>
  );
};

export default App;