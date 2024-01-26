// Note.jsx
import React, { useState } from 'react';

const Note = ({ note, onUpdate, onDelete, onArchive }) => {
  const [editing, setEditing] = useState(!note.id);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedBody, setEditedBody] = useState(note.body);

  const handleUpdate = () => {
    onUpdate(note.id, editedTitle, editedBody);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(note.id);
  };

  const handleArchive = () => {
    onArchive(note.id);
  };

  return (
    <div className={`note ${editing ? 'editing' : ''} ${note.archived ? 'archived' : ''}`}>
      {!editing ? (
        <>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleArchive}>{note.archived ? 'Unarchive' : 'Archive'}</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            placeholder="Note"
          ></textarea>
          <button onClick={handleUpdate}>Update</button>
        </>
      )}
    </div>
  );
};

export default Note;
