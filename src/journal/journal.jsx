import React, { useState } from 'react';
import { BookMarked, Star } from 'lucide-react';
import './journal.css';

const BOM_BOOKS = [
  { name: '1 Nephi', chapters: 22 },
  { name: '2 Nephi', chapters: 33 },
  { name: 'Jacob', chapters: 7 },
  { name: 'Enos', chapters: 1 },
  { name: 'Jarom', chapters: 1 },
  { name: 'Omni', chapters: 1 },
  { name: 'Words of Mormon', chapters: 1 },
  { name: 'Mosiah', chapters: 29 },
  { name: 'Alma', chapters: 63 },
  { name: 'Helaman', chapters: 16 },
  { name: '3 Nephi', chapters: 30 },
  { name: '4 Nephi', chapters: 1 },
  { name: 'Mormon', chapters: 9 },
  { name: 'Ether', chapters: 15 },
  { name: 'Moroni', chapters: 10 }
];

export default function Journal({ notes, setNotes }) {
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const toggleFavorite = async (noteId) => {
    try {
      const updatedNotes = notes.map(note =>
        note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
      );
      await window.storage.set('bom-notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const deleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const updatedNotes = notes.filter(note => note.id !== noteId);
        await window.storage.set('bom-notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const allTopics = [...new Set(notes.flatMap(note => note.topics))].sort();

  const filteredNotes = notes.filter(note => {
    if (showFavoritesOnly && !note.isFavorite) return false;
    if (selectedBook !== 'all' && note.book !== selectedBook) return false;
    if (selectedTopic !== 'all' && !note.topics.includes(selectedTopic)) return false;
    return true;
  });

  const groupedNotes = BOM_BOOKS.reduce((acc, book) => {
    acc[book.name] = filteredNotes.filter(note => note.book === book.name);
    return acc;
  }, {});

  return (
    <div className="journal-container">
      <div className="journal-card">
        <h2 className="journal-title">
          <BookMarked className="title-icon" />
          Study Journal
        </h2>

        <div className="journal-filters">
          <div className="filter-group">
            <label className="filter-label">Filter by Book</label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Books</option>
              {BOM_BOOKS.map(book => (
                <option key={book.name} value={book.name}>{book.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Filter by Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Topics</option>
              {allTopics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div className="filter-group-btn">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`favorites-btn ${showFavoritesOnly ? 'favorites-btn-active' : ''}`}
            >
              <Star className={`favorites-icon ${showFavoritesOnly ? 'favorites-icon-filled' : ''}`} />
              {showFavoritesOnly ? 'Showing Favorites' : 'Show Favorites'}
            </button>
          </div>
        </div>

        <div className="notes-list">
          {filteredNotes.length === 0 ? (
            <p className="empty-state">
              No notes found. Start your study journey on the Dashboard!
            </p>
          ) : (
            BOM_BOOKS.map(book => {
              const bookNotes = groupedNotes[book.name];
              if (!bookNotes || bookNotes.length === 0) return null;

              return (
                <div key={book.name} className="book-section">
                  <h3 className="book-title">{book.name}</h3>
                  <div className="book-notes">
                    {bookNotes.map(note => (
                      <div key={note.id} className="note-card">
                        <div className="note-header">
                          <div>
                            <h4 className="note-title">
                              {note.book} {note.chapter}
                            </h4>
                            <p className="note-date">{note.date}</p>
                          </div>
                          <div className="note-actions">
                            <button
                              onClick={() => toggleFavorite(note.id)}
                              className="favorite-btn"
                            >
                              <Star className={`favorite-icon ${note.isFavorite ? 'favorite-icon-filled' : ''}`} />
                            </button>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="delete-btn"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                        
                        {note.topics.length > 0 && (
                          <div className="note-topics">
                            {note.topics.map(topic => (
                              <span key={topic} className="note-topic">
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <p className="note-text">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}