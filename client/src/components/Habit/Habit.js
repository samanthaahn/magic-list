import React from 'react';
import "./Habit.css"

function Habit() {
  return (
    <div className="habit-container">
      {/* Text */}
      <h1 classname="habit-title">HABIT TITLE</h1>
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
        <button className="add-entry-button">
          Save
        </button>
      </div>
    </div>
  );
}

export default Habit;

// return (
  //   <div className="journal-container">
  //     <h1 className="journal-title">Good or Bad, write how you're feeling</h1>
      // <div className="entry-form">
      //   <input type="text" ref={fieldRef} className="entry-input" />
      //   <button onClick={() => storeEntry('New Entry')} className="add-entry-button">
      //     Add Entry
      //   </button>
      // </div>
  //     <ul className="entry-list">
  //       {entries.map((entry, index) => (
  //         <li key={index} className="entry-item">
  //           <span className="entry-text">{entry}</span>
  //           <button onClick={() => removeEntry(index)} className="delete-entry-button">
  //             Delete
  //           </button>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  // };
  
  // export default Diary;