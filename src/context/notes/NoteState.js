import React, { useState, useMemo } from 'react';
import noteContext from './NoteContext';

const NoteState = props => {
  const notesInitial = [];
  const host = import.meta.env.VITE_BACKEND_URL;

  // 1. Rename 'notes' state to 'rawNotes' to hold all notes fetched from the API
  const [rawNotes, setRawNotes] = useState(notesInitial);

  // 2. New state to hold the currently active filter tag (null means no filter)
  const [filterTag, setFilterTag] = useState(null);

  // --- API Functions (Updated to use setRawNotes) ---

  // Get all Note
  const getNotes = async () => {
    //API Call would be here
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setRawNotes(json); // Use setRawNotes
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    //API Call would be here
    const url = `${host}/api/notes/addnote`;
    // START: Conditional logic to ensure Mongoose default is used
    const noteData = { title, description };

    // Only include the tag if it's a non-empty string after trimming whitespace
    if (tag && tag.trim() !== '') {
      noteData.tag = tag;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(noteData),
    });
    const note = await response.json();
    setRawNotes(rawNotes.concat(note)); // Use setRawNotes
  };

  // Delete a Note
  const deleteNote = async id => {
    const url = `${host}/api/notes/deletenote/${id} `;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    const newnotes = rawNotes.filter(note => note._id !== id); // Use rawNotes
    setRawNotes(newnotes); // Use setRawNotes
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // START: Conditional logic to ensure Mongoose default is used
    const noteData = { title, description };

    // Only include the tag if it's a non-empty string after trimming whitespace
    if (tag && tag.trim() !== '') {
      noteData.tag = tag;
    } else noteData.tag = 'General';
    //API Call would be here
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(noteData),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(rawNotes)); // Use rawNotes
    //Logic to edit in client

    for (let i = 0; i < newNotes.length; i++) {
      const note = newNotes[i];
      if (note._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setRawNotes(newNotes); // Use setRawNotes
  };

  // NEW ADDITION: Function to explicitly clear the tag filter
  const clearFilter = () => {
    setFilterTag(null);
  };

  // 3. Memoized calculation of the notes list visible to components
  // This automatically filters the notes when filterTag or rawNotes changes.
  const notes = useMemo(() => {
    if (!filterTag) {
      return rawNotes; // No filter active, return all notes
    }

    // Filter notes based on the active tag
    return rawNotes.filter(
      note => note.tag && note.tag.toLowerCase() === filterTag.toLowerCase()
    );
  }, [rawNotes, filterTag]); // Dependencies: Recalculate if the raw list changes or the filter changes

  return (
    <noteContext.Provider
      value={{
        notes, // This is the filtered list, but retains the name 'notes' for compatibility
        addNote,
        deleteNote,
        editNote,
        getNotes,
        filterTag, // Exporting filter state for TagStack
        setFilterTag, // Exporting setter for TagStack
        clearFilter, // NEW: Exporting function to clear the filter
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
