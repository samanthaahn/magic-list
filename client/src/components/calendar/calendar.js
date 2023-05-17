import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ start: '', end: '', title: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const parsedStart = moment(newEvent.start).toDate();
    const parsedEnd = moment(newEvent.end).toDate();
  
    const updatedEvent = { ...newEvent, start: parsedStart, end: parsedEnd };
  
    if (selectedEvent) {
      // Editing existing event
      const updatedEvents = events.map((event) =>
        event === selectedEvent ? { ...updatedEvent } : event
      );
      setEvents(updatedEvents);
      setSelectedEvent(null);
    } else {
      // Adding new event
      setEvents([...events, updatedEvent]);
    }
  
    setNewEvent({ start: '', end: '', title: '' });
    setShowForm(false);
  };

  const handleEditEventClick = (event) => {
    setNewEvent(event);
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleDeleteEventClick = (event) => {
    const updatedEvents = events.filter((e) => e !== event);
    setEvents(updatedEvents);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEventClick = () => {
    setSelectedEvent(null);
    setShowForm(true);
  };

  return (
    <div>
      {!showForm && (
        <button onClick={handleAddEventClick}>Add Event</button>
      )}

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
          <br />
          <label>Start Date and Time:</label>
          <br />
          <input
            type="datetime-local"
            name="start"
            value={newEvent.start}
            onChange={handleInputChange}
          />
          <br />
          <label>End Date and Time:</label>
          <br />
          <input
            type="datetime-local"
            name="end"
            value={newEvent.end}
            onChange={handleInputChange}
          />
          <br />
          <button type="submit">{selectedEvent ? 'Update Event' : 'Save Event'}</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}

      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        views={['month', 'week', 'day']} // Include week and day views
        events={events}
        onSelectEvent={handleEditEventClick}
        components={{
          event: (props) => <EventComponent {...props} onDeleteEvent={handleDeleteEventClick} />,
        }}
        style={{ height: '500px' }}
      />
    </div>
  );
};

const EventComponent = ({ event, title, onDeleteEvent }) => (
  <div>
    <strong>{title}</strong>
    <br />
    <button onClick={() => onDeleteEvent(event)}>Delete</button>
  </div>
);

export default MyCalendar;


