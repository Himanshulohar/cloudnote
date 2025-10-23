import { useContext } from 'react';
import notecontext from '../context/notes/NoteContext';

const NoteItem = props => {
  const context = useContext(notecontext);
  const { deleteNote } = context;
  const { note, updateNote } = props; // Helper function to calculate time elapsed and return a human-readable string

  const timeSince = dateString => {
    if (!dateString) return 'Date unavailable';

    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + ' years ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes ago';
    }
    return Math.floor(seconds) <= 5
      ? 'just now'
      : Math.floor(seconds) + ' seconds ago';
  };

  return (
    <div className='col-md-3'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex align-items-center justify-content-between'>
            <h5 className='card-title'>{note.title}</h5>
            <div>
              <i
                className='far fa-edit mx-2'
                onClick={() => {
                  updateNote(note);
                }}
              ></i>

              <i
                className='far fa-trash-alt mx-2'
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert('Deleted Successfully', 'success');
                }}
              ></i>
            </div>
          </div>

          <p className='card-text'>{note.description}</p>
          <div className='fst-italic form-text fw-lighter text-md-end'>
            <p>{timeSince(note.date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
