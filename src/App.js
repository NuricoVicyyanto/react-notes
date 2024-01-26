// App.js
import React, { useState } from 'react';
import Note from './components/Note';
import './index.css';  

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addNote = () => {
    if (newNote.trim() !== '') {
      if (editingIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = newNote;
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        setNotes([...notes, newNote]);
      }
      setNewNote('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const editNote = (index) => {
    setNewNote(notes[index]);
    setEditingIndex(index);
  };

  return (
    <div>
      <h1>Daftar Catatan</h1>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button onClick={addNote}>
        {editingIndex !== null ? 'Simpan Perubahan' : 'Tambah Catatan'}
      </button>
      {notes.map((note, index) => (
        <Note
          key={index}
          note={note}
          onDelete={() => deleteNote(index)}
          onEdit={() => editNote(index)}
        />
      ))}
    </div>
  );
};

export default App;
