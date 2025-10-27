import { useContext, useState } from 'react';
import React from 'react';
import notecontext from '../context/notes/NoteContext';

const AddNote = props => {
  const context = useContext(notecontext);
  const { addNote } = context;
  // State for form data
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  // State to manage the collapse/accordion visibility
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    // 1. Call the addNote function
    addNote(note.title, note.description, note.tag);
    // 2. Reset the form fields
    setNote({ title: '', description: '', tag: '' });
    // 3. Show success alert
    props.showAlert('Added Successfully', 'success');
    // 4. Hide the form
    setIsCollapsed(false);
  };

  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className='container text-center my-3'>
      <h2 className='mb-4 '>Add a New Note</h2>

      {/* Button to toggle the form visibility */}
      <button
        className='btn btn-primary mb-3 rounded-pill'
        type='button'
        // Toggle the collapse state on click
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={isCollapsed}
        aria-controls='addNoteCollapse'
      >
        {/* Change button text based on collapse state */}
        {isCollapsed ? (
          <div>
            <i className='fa-solid fa-xmark mx-2'></i>Cancel
          </div>
        ) : (
          <div>
            <i className='fa-solid fa-plus mx-2'></i>Add New Note
          </div>
        )}
      </button>

      {/* Collapse container for the form */}
      <div
        className={`collapse ${isCollapsed ? 'show' : ''}`}
        id='addNoteCollapse'
      >
        <div className='card card-body mb-4 p-4 border border-primary-subtle rounded-3 shadow-sm'>
          <form>
            {/* Bootstrap row for layout control */}
            <div className='row'>
              {/* Title Input: Set to 50% width on medium screens and up (col-md-6) */}
              <div className='mb-3 col-md-6'>
                <label htmlFor='title' className='form-label'>
                  Title
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  name='title'
                  onChange={onChange}
                  required
                  minLength={1}
                  value={note.title}
                />
              </div>

              {/* Tag Input: Set to 50% width on medium screens and up (col-md-6) */}
              <div className='mb-3 col-md-6'>
                <label htmlFor='tag' className='form-label'>
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
            </div>

            {/* Description Input: Now a full-width TextArea (col-md-12) and made bigger */}
            <div className='mb-3 col-md-12'>
              <label htmlFor='description' className='form-label'>
                Description
              </label>
              <textarea
                className='form-control'
                id='description'
                name='description'
                rows='5' // Makes the description box visually larger
                onChange={onChange}
                required
                minLength={1}
                value={note.description}
              />
            </div>

            <button
              disabled={note.title.length < 1 || note.description.length < 1}
              type='submit'
              className='btn btn-primary mt-3 rounded-pill'
              onClick={handleClick}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
      <hr className='my-4' />
    </div>
  );
};

export default AddNote;
