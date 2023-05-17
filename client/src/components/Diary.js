import React, { useEffect, useState, useRef } from "react";
import "./diary.css";
import Navigation from "./Navigation/Navigation";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { ADD_DIARY, EDIT_DIARY, DELETE_DIARY } from "../utils/mutations";

const Diary = () => {
  const fieldRef = useRef(null);
  const [entries, setEntries] = useState([]);
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

  useEffect(() => {
    const entriesFromStorage = JSON.parse(
      window.localStorage.getItem("journalEntries")
    );
    if (entriesFromStorage) {
      setEntries(entriesFromStorage);
    }
  }, []);

  const storeEntry = async () => {
    try {
      const { data } = await addDiary({
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
    const entryToEdit = diaries.diaries[index];
    setNewEntry(entryToEdit.diaryText);
    setEditIndex(index);
  };

  const updateEntry = async (index) => {
    try {
      const entryToEdit = diaries.diaries[index];
      await editDiary({
        variables: { diaryId: entryToEdit._id, diaryText: newEntry },
      });
      setNewEntry("");
      setEditIndex(-1);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };


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
                <div className="entry-content">
                  {editIndex !== index ? (
                    <span className="entry-text" onClick={() => editEntry(index)}>
                      {entry.diaryText}
                    </span>
                  ) : (
                    <textarea
                      type="text"
                      ref={fieldRef}
                      className="entry-input"
                      value={newEntry}
                      onChange={(e) => setNewEntry(e.target.value)}
                    />
                  )}
                </div>
                <div className="entry-actions">
                  {editIndex !== index ? (
                    <button onClick={() => editEntry(index)} className="edit-entry-button">
                      Edit
                    </button>
                  ) : (
                    <button onClick={updateEntry} className="update-entry-button">
                      Update
                    </button>
                  )}
                  <button onClick={() => removeEntry(index)} className="delete-entry-button">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
};

export default Diary;
