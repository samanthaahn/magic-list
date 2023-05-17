import React, { useEffect, useState, useRef } from "react";
//import moment from "moment";
import "./diary.css";
import Navigation from "./Navigation/Navigation";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { ADD_DIARY, EDIT_DIARY, DELETE_DIARY } from "../utils/mutations";

const Diary = () => {
  const fieldRef = useRef(null);
  const [storeEntry, removeEntry, editEntry] = useJournal();
  const [newEntry, setNewEntry] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const { loading, data } = useQuery(QUERY_ME);
  const diaries = data?.me || {};

  const [addDiary] = useMutation(ADD_DIARY);
  const [editDiary] = useMutation(EDIT_DIARY);
  const [deleteDiary] = useMutation(DELETE_DIARY);

  useEffect(() => {
    fieldRef.current.focus();
    console.log(diaries);
  }, [data]);

  function useJournal() {
    const [entries, setEntries] = useState([]);

    const getEntriesFromStorage = () =>
      JSON.parse(window.localStorage.getItem("journalEntries"));

    const setEntriesToStorage = (items) =>
      window.localStorage.setItem("journalEntries", JSON.stringify(items));

    useEffect(() => {
      const entriesFromStorage = getEntriesFromStorage();
      if (entriesFromStorage) {
        setEntries(entriesFromStorage);
      }
    }, []);

    const storeEntry = () => {
      try {
        const { data } = addDiary({
          variables: { diaryText: newEntry },
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };

    const removeEntry = async (index) => {
      try {
        const diaryId = diaries.diaries[index]._id; 
        await deleteDiary({
          variables: { diaryId },
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };

      const editEntry = (index) => {
        try {
          const entryToEdit = entries[index];
          setNewEntry(entryToEdit.text);
          setEditIndex(index);
          fieldRef.current.focus();
        } catch (error) {
          console.log(error);
        }
      };

    return [storeEntry, removeEntry, editEntry];
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
          {editIndex !== -1 ? "Update Entry" : "Add Entry"}
        </button>
      </div>
      <ul className="entry-list">
        {diaries.diaries &&
          diaries.diaries.map((entry, index) => (
            <li key={index} className="entry-item">
              <div className="entry-text-container">
                <span className="entry-date">{entry.createdAt}</span>
                <span className="entry-text" onClick={() => editEntry(index)}>
                  {entry.diaryText}
                </span>
              </div>
              <button
                onClick={() => removeEntry(index)}
                className="delete-entry-button"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Diary;
