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
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmNjk5N2RkNzI0MmYzMTE2MWY1ZjRjIn0sImlhdCI6MTc2MTAzMzAxMX0.CJfO216lnlUh8j-HTBh4S0ErBeRCtxjsUZg9DKUNCxk',
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };
  //Add a Note

  const addNote = async (title, description, tag) => {
    //API Call would be here
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmNjk5N2RkNzI0MmYzMTE2MWY1ZjRjIn0sImlhdCI6MTc2MTAzMzAxMX0.CJfO216lnlUh8j-HTBh4S0ErBeRCtxjsUZg9DKUNCxk',
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log('Adding a new note');
    const note = {
      _id: '68f757e46541c68a7cd0d894',
      user: '68f6997dd7242f31161f5f4c',
      title: title,
      description: description,
      tag: tag,
      date: '2025-10-21T09:52:36.961Z',
      __v: 0,
    };
    setnotes(notes.concat(note));
  };
  //Delete a Note
  const deleteNote = id => {
    const newnotes = notes.filter(note => note._id !== id);
    setnotes(newnotes);
    console.log('Deleting the note with ID: ' + id);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call would be here
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhmNjk5N2RkNzI0MmYzMTE2MWY1ZjRjIn0sImlhdCI6MTc2MTAzMzAxMX0.CJfO216lnlUh8j-HTBh4S0ErBeRCtxjsUZg9DKUNCxk',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    //Logic to edit in client
    console.log('Editing the note with ID: ' + id);
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
        break;
      }
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
