import { useContext, useEffect, useRef, useState } from 'react';
import React from 'react';
import notecontext from '../context/notes/NoteContext';
import Noteitem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = props => {
  const context = useContext(notecontext);
  const Navigate = useNavigate(); // Include getNotes in the destructuring
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: '',
  }); // Initialize the component and fetch notes on mount
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes(); // eslint-disable-next-line
    } else {
      props.showAlert('Please login to access your notes', 'warning');
      Navigate('/login');
    }
  }, []);

  const updateNote = currentNote => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag ? currentNote.tag : 'General',
    });
  };
  const ref = useRef(null);
  const refclose = useRef(null); // FIX: Made handleClick async and called getNotes() to refresh the state after edit
  const handleClick = async e => {
    // Assuming editNote is an asynchronous API call, we should await it
    await editNote(note.id, note.etitle, note.edescription, note.etag); // Refresh the notes list from the backend to ensure the UI is up-to-date
    getNotes();
    refclose.current.click();
    props.showAlert('Updated Successfully', 'success');
  };
  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className='p-3 bg-light rounded-4'>
      <AddNote showAlert={props.showAlert} />

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
                Updating Node
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
                    minLength={3}
                    required
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
                    minLength={3}
                    required
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
                    minLength={3}
                  />

                  <div className='fst-italic form-text fw-lighter text-md-end'>
                    <p>*(Optional) by default tag will be 'General'</p>
                  </div>
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
        <h2 className=' mb-4'> Your Notes </h2>
        <div className='container mx-3'>
          {notes.length === 0 && 'No notes to display'}
        </div>

        {notes.map(note => {
          return (
            <Noteitem
              showAlert={props.showAlert}
              key={note._id}
              updateNote={updateNote}
              note={note}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
