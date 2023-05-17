import React, { useState } from 'react';
import './Habit.css';

function Habit({ title, options }) {
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [completedGoal, setCompletedGoal] = useState('');

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      setIsSaved(true);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsSaved(false);
    setIsEditMode(false);
    setCompletedGoal(note); // Save the note before resetting it
    setNote('');
    setIsComplete(true);
  };

  return (
    <div className={`habit-container ${isSaved ? 'saved' : ''} ${isComplete ? 'complete' : ''}`}>
      {/* Text */}
      <h2 className="habit-title">{title}</h2>
      {/* Dropdown */}
      <div className="dropdown">
        <select className="dropdown-select">
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Text Input */}
      {!isSaved && !isEditMode && !isComplete && (
        <div className={`entry-form`}>
          <input
            type="text"
            className="entry-input"
            value={note}
            onChange={handleNoteChange}
            placeholder="Add a note"
          />
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      )}

      {/* Display Saved Note */}
      {isSaved && !isEditMode && !isComplete && (
        <div>
          <p className="saved-note">{note}</p>
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
          <button className="complete-button" onClick={handleCancel}>
            Complete
          </button>
        </div>
      )}

      {/* Edit Mode */}
      {isEditMode && (
        <div className="entry-form">
          <input
            type="text"
            className="entry-input"
            value={note}
            onChange={handleNoteChange}
            placeholder="Add a note"
          />
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}

      {/* Display Completed Goal */}
      {isComplete && (
        <div className="completed-container">
          <p className="completed-text">You've completed your goal of {completedGoal}</p>
        </div>
      )}
    </div>
  );
}

export default Habit;
