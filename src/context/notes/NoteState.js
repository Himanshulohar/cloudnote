import { useState } from 'react';
import noteContext from './NoteContext';

const notesInitial = [
  {
    _id: '68f753d972ba3a2cdfea8584',
    user: '68f6997dd7242f31161f5f4c',
    title: 'Playlist',
    description: '1. Paradise 2. Paint the town RED',
    tag: 'Personal',
    date: '2025-10-21T09:35:21.561Z',
    __v: 0,
  },
  {
    _id: '68f757e46541c68a7cd0d895',
    user: '68f6997dd7242f31161f5f4c',
    title: 'GFs',
    description: '1. Preeti 2. Trishala 3.Shreshta',
    tag: 'Personal',
    date: '2025-10-21T09:52:36.961Z',
    __v: 0,
  },
];

const NoteState = props => {
  const [notes, setnotes] = useState(notesInitial);
  //Add a Note
  const addNote = (title, description, tag) => {
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
  const editNote = (id,title,description,tag) => {
    console.log('Editing the note with ID: ' + id);
  };
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
