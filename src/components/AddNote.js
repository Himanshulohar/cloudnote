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
    setNote({ title: '', description: '', tag: '' });
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
              required
              value={note.title}
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
              required
              value={note.description}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Tag
            </label>
            <input
              type='text'
              className='form-control'
              id='tag'
              name='tag'
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <button
            disabled={note.title.length < 1 || note.description.length < 1}
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
