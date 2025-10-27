import React, { useContext, useMemo } from 'react';
import notecontext from '../context/notes/NoteContext';

const TagStack = () => {
  const { notes } = useContext(notecontext); // Define the offset from the top for the sticky element (to clear the fixed Navbar)

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
      } // 2. The tag is a single string, which is fine for your current logic. // Note: If you want to support multiple tags separated by spaces, you'd use note.tag.split(' ') here.

      return note.tag;
    }); // 3. Use a Set to extract only the unique values and sort them alphabetically

    return [...new Set(allTags)].sort();
  }, [notes]); // Placeholder function for filtering notes (you will implement this filtering logic in your context later)

  const handleTagClick = tag => {
    console.log(`Filtering notes by tag: ${tag}`); // Future step: Call a context function here, e.g., context.setFilter(tag);
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
                className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                onClick={() => handleTagClick(tag)}
              >
                {tag}
                {/* Display the count of notes associated with this tag */}

                <span className='badge bg-secondary rounded-pill'>
                  {
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
