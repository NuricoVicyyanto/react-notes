// index.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Note from './components/Note';
import './styles/style.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      body: '',
      archived: false,
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const updateNote = (id, title, body) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title, body } : note
    );

    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const archiveNote = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: !note.archived } : note
    );

    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const toggleShowArchived = () => {
    setShowArchived(!showArchived);
  };

  const filteredNotes = showArchived ? notes : notes.filter((note) => !note.archived);

  return (
    <div>
      <h1>Notes App</h1>
      <button onClick={addNote}>Add Note</button>
      <button onClick={toggleShowArchived}>
        {showArchived ? 'Hide Archived' : 'Show Archived'}
      </button>
      <div className="notes-container">
        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onUpdate={updateNote}
            onDelete={deleteNote}
            onArchive={archiveNote}
          />
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
