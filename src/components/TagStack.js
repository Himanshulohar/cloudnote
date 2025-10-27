import React, { useContext, useMemo } from 'react';
import notecontext from '../context/notes/NoteContext';

const TagStack = () => {
  // Destructure notes, plus the new filter state, setter, and clear function from context
  const { notes, filterTag, setFilterTag, clearFilter } =
    useContext(notecontext);

  const uniqueTags = useMemo(() => {
    // 1. Flatten all tag strings into a single array
    const allTags = notes.flatMap(note => {
      // Safely handle notes where 'tag' might be missing or not a valid string.
      if (
        !note.tag ||
        typeof note.tag !== 'string' ||
        note.tag.trim().length === 0
      ) {
        return [];
      }
      // Assuming 'tag' is a single string per note based on the existing logic
      return note.tag;
    });

    // 2. Use a Set to extract only the unique values and sort them alphabetically
    return [...new Set(allTags)].sort();
  }, [notes]);

  // Function to handle tag click and toggle the filter
  const handleTagClick = tag => {
    // If the clicked tag is already the active filter, clear it (set to null).
    // Otherwise, set the new filter tag.
    if (tag === filterTag) {
      setFilterTag(null);
    } else {
      setFilterTag(tag);
    }
  };

  return (
    // CORRECTION APPLIED HERE:
    // 1. Added 'd-flex' and 'justify-content-center' to the main wrapper.
    // 2. Fixed the typo 'justify content-center' to 'justify-content-center'.
    // 3. The card inside uses 'maxWidth: 50%' so centering works well.
    <div className='d-none d-lg-flex sticky-top m-5 justify-content-center'>
      <div
        className='card rounded-4 shadow-sm '
        style={{ maxWidth: '50%', minWidth: '30%' }}
      >
        <div className='card-header bg-primary text-white rounded-top-4'>
          <h5 className='mb-0 p-1'>
            <i className='fas fa-tags me-2'></i>Used Tags
          </h5>
        </div>

        {/* Filter Status Display and Clear Button - Renders only if a filter is active */}
        {filterTag && (
          <div className='alert alert-info d-flex justify-content-between align-items-center mb-0 p-2 rounded-0'>
            <small>
              <i className='fas fa-filter me-2'></i>
              Filtering by: <strong>{filterTag}</strong>
            </small>
            <button
              type='button'
              className='btn btn-sm btn-link text-info p-0 ms-3 text-decoration-none'
              onClick={clearFilter}
              aria-label='Remove Filter'
            >
              <i className='fas fa-times-circle me-1'></i>
              Clear
            </button>
          </div>
        )}

        {uniqueTags.length === 0 ? (
          <div className='p-3 text-center text-muted'>
            No unique tags found.
          </div>
        ) : (
          // List group for the tags, with a scrollbar if the list is too long
          <div
            className='list-group list-group-flush overflow-auto'
            style={{ maxHeight: '300px' }}
          >
            {uniqueTags.map((tag, index) => (
              <button
                key={index}
                type='button'
                // Conditionally apply the 'active' class from Bootstrap
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  tag === filterTag ? 'active' : ''
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
                {/* Display the count of notes associated with this tag */}

                <span
                  className={`badge rounded-pill ${
                    tag === filterTag ? 'bg-light text-dark' : 'bg-secondary'
                  }`}
                >
                  {
                    // This count needs to be based on the original list of notes
                    // (if you had access to rawNotes here), but since you only have
                    // the filtered 'notes', the count will only reflect notes visible
                    // after any filtering is applied. For accurate counts, it should
                    // ideally count against the raw list. Since we don't have rawNotes
                    // here, we rely on the logic that all notes are present if filterTag is null.
                    notes.filter(note => note.tag && note.tag.includes(tag))
                      .length
                  }
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagStack;
