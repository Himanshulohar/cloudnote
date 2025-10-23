import { useState } from 'react';
import noteContext from './NoteContext';

const NoteState = props => {
  const notesInitial = [];
  const host = 'http://localhost:5000';
  const [notes, setnotes] = useState(notesInitial);
  //Get all Note

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
    setnotes(json);
  };
  //Add a Note

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
    setnotes(notes.concat(note));
  };
  //Delete a Note
  const deleteNote = async id => {
    const url = `${host}/api/notes/deletenote/${id} `;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const json = await response.json();console.log(json);
    const newnotes = notes.filter(note => note._id !== id);
    setnotes(newnotes);
  };
  //Edit a Note
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
    const json = await response.json();console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client

    for (let i = 0; i < newNotes.length; i++) {
      const note = newNotes[i];
      if (note._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }

      setnotes(newNotes);
    }
  };
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
