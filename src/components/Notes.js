import { useContext, useEffect, useRef, useState } from 'react';
import React from 'react';
import notecontext from '../context/notes/NoteContext';
import Noteitem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(notecontext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: '',
  });
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const updateNote = currentNote => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const ref = useRef(null);
  const refclose = useRef(null);
  const handleClick = e => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
  };
  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />
      <button
        type='button'
        className='btn btn-primary d-none'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Edit Note
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                ref={refclose}
              ></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='etitle'
                    name='etitle'
                    aria-describedby='emailHelp'
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='exampleInputPassword1' className='form-label'>
                    Description
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='edescription'
                    name='edescription'
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='exampleInputPassword1' className='form-label'>
                    Tag
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='etag'
                    name='etag'
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2 className='my-5 p-4'> Your Notes </h2>
        {notes.map(note => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
