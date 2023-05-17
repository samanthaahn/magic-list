import React from 'react';
import "./Habit.css"

function Habit ({ title, options }) {
  return (
    <div className="habit-container">
      {/* Text */}
      <h2 className="habit-title">{title}</h2>
      {/* Dropdown */}
      <div className="dropdown">
        <select className="dropdown-select">
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
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
