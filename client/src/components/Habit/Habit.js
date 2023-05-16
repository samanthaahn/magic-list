import React from 'react';
import "./Habit.css"

function Habit ({ title }) {
  return (
    <div className="habit-container">
      {/* Text */}
      <h2 classname="habit-title">{title}</h2>
      {/* Dropdown */}
      <div className="dropdown">
        <select className="dropdown-select">
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      {/* Text Input */}
      <div className="entry-form">
        <input type="text" className="entry-input" />
        <button className="add-entry-button">Save</button>
      </div>
    </div>
  );
}

export default Habit;