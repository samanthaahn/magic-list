import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import './diary.css'

const Diary = () => {
  const fieldRef = useRef(null);
  const [entries, storeEntry, removeEntry] = useJournal();
  const [newEntry, setNewEntry] = useState('');

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

    const storeEntry = () => {
      if (newEntry.trim() !== '') {
        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        setEntriesToStorage(updatedEntries);
        setNewEntry('');
      }
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
        <input
          type="text"
          ref={fieldRef}
          className="entry-input"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button onClick={storeEntry} className="add-entry-button">
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
