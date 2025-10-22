import { useContext, useEffect } from 'react';
import React from 'react';
import notecontext from '../context/notes/NoteContext';
import Noteitem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(notecontext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <AddNote />
      <div className='row my-3'>
        <h2 className='my-5 p-4'> Your Notes </h2>
        {notes.map(note => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
