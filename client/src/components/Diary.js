import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import './diary.css'

const Diary = () => {
  const fieldRef = useRef(null);
  const [entries, storeEntry, removeEntry] = useJournal();

  useEffect(() => {
    fieldRef.current.focus();
  }, []);

  function useJournal() {
    const [entries, setEntries] = useState([]);

    const getEntriesFromStorage = () =>
      JSON.parse(window.localStorage.getItem('journalEntries'));

    const setEntriesToStorage = (items) =>
      window.localStorage.setItem('journalEntries', JSON.stringify(items));

    useEffect(() => {
      const entriesFromStorage = getEntriesFromStorage();
      if (entriesFromStorage) {
        setEntries(entriesFromStorage);
      }
    }, []);

    const storeEntry = (entry) => {
      const newEntries = [entry, ...entries];
      setEntries(newEntries);
      setEntriesToStorage(newEntries);
    };

    const removeEntry = (index) => {
      const newEntries = [
        ...entries.slice(0, index),
        ...entries.slice(index + 1),
      ];
      setEntries(newEntries);
      setEntriesToStorage(newEntries);
    };

    return [entries, storeEntry, removeEntry];
  }

  return (
    <div className="journal-container">
      <h1 className="journal-title">Good or Bad, write how you're feeling</h1>
      <div className="entry-form">
        <input type="text" ref={fieldRef} className="entry-input" />
        <button onClick={() => storeEntry('New Entry')} className="add-entry-button">
          Add Entry
        </button>
      </div>
      <ul className="entry-list">
        {entries.map((entry, index) => (
          <li key={index} className="entry-item">
            <span className="entry-text">{entry}</span>
            <button onClick={() => removeEntry(index)} className="delete-entry-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diary;