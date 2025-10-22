import { useContext, useState } from 'react';
import React from 'react';
import notecontext from '../context/notes/NoteContext';

const AddNote = () => {
  const context = useContext(notecontext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const handleClick = e => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className='container'>
        <h2 className='my-5 p-4 '>Welcome to CloudNote</h2>
        <form>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              aria-describedby='emailHelp'
              onChange={onChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Description
            </label>
            <input
              type='text'
              className='form-control'
              id='description'
              name='description'
              onChange={onChange}
            />
          </div>
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
              onChange={onChange}
            />
            <label className='form-check-label' htmlFor='exampleCheck1'>
              Check me out
            </label>
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
