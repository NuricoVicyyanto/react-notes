// components/Note.js
import React from 'react';

const Note = ({ note, onDelete, onEdit }) => {
  return (
    <div>
      <p>{note}</p>
      <button onClick={onDelete}>Hapus</button>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

export default Note;
