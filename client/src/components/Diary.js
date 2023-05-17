import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import './diary.css';
import Navigation from './Navigation/Navigation'

const Diary = () => {
  const fieldRef = useRef(null);
  const [entries, storeEntry, removeEntry, editEntry] = useJournal();
  const [newEntry, setNewEntry] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

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
        const entry = {
          text: newEntry,
          date: moment().format('MMM D, YYYY, h:mm:ss a'),
        };
    
        if (editIndex !== -1) {
          const updatedEntries = [...entries];
          updatedEntries[editIndex] = entry;
          setEntries(updatedEntries);
          setEntriesToStorage(updatedEntries);
          setNewEntry('');
          setEditIndex(-1);
        } else {
          const updatedEntries = [entry, ...entries];
          setEntries(updatedEntries);
          setEntriesToStorage(updatedEntries);
          setNewEntry('');
        }
      }
    };

    const removeEntry = (index) => {
      const newEntries = [...entries.slice(0, index), ...entries.slice(index + 1)];
      setEntries(newEntries);
      setEntriesToStorage(newEntries);
    };

    const editEntry = (index) => {
      setNewEntry(entries[index].text);
      setEditIndex(index);
      fieldRef.current.focus();
    };

    return [entries, storeEntry, removeEntry, editEntry];
  }

  return (
    <div className="journal-container">
      <Navigation />
      <h1 className="journal-title">Good or Bad, write how you're feeling</h1>
      <div className="entry-form">
        <textarea
          type="text"
          ref={fieldRef}
          className="entry-input"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button onClick={storeEntry} className="add-entry-button">
          {editIndex !== -1 ? 'Update Entry' : 'Add Entry'}
        </button>
      </div>
      <ul className="entry-list">
  {entries.map((entry, index) => (
    <li key={index} className="entry-item">
      <div className="entry-text-container">
        <span className="entry-date">{entry.date}</span>
        <span className="entry-text" onClick={() => editEntry(index)}>
          {entry.text}
        </span>
      </div>
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