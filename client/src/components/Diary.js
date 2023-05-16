import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';


const Diary = () => {
    const fieldRef = useRef(null);
    const [entries, storeEntry, removeEntry] = useJournal();
  
    useEffect(() => {
      fieldRef.current.focus();
    }, []);
  
    //const itemDate = moment(item.date).fromNow();
  
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
      <div>
        <input type="text" ref={fieldRef} />
        <button onClick={() => storeEntry('New Entry')}>Add Entry</button>
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {entry}
              <button onClick={() => removeEntry(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Diary;
