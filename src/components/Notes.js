import { useContext } from 'react';
import React from 'react';
import notecontext from '../context/notes/NoteContext';
import Noteitem from './NoteItem';

const Notes = () => {
  const context = useContext(notecontext);
  const { notes, setNotes } = context;
  return (
    <div className='row my-3'>
      <h2 className='my-5 p-4'> Your Notes </h2>
      {notes.map(note => {
        return <Noteitem note={note} />;
      })}
    </div>
  );
};

export default Notes;
