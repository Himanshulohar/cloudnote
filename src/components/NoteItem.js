import { useContext } from 'react';
import notecontext from '../context/notes/NoteContext';
const NoteItem = props => {
  const context = useContext(notecontext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className='col-md-3'>
      <div className='card my-3'>
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
                }}
              ></i>
            </div>
          </div>
          <p className='card-text'>{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
