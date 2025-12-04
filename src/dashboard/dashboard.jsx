import React, { useState } from 'react';
import { Home, Tag } from 'lucide-react';
import './dashboard.css';

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

const SUGGESTED_TOPICS = [
  'Faith', 'Prayer', 'Covenant Path', 'Atonement', 'Testimony',
  'Holy Ghost', 'Obedience', 'Service', 'Repentance', 'Love',
  'Scripture Study', 'Temple', 'Family', 'Mission', 'Charity'
];

export default function Dashboard({ notes, setNotes }) {
  const [currentNote, setCurrentNote] = useState({
    book: '1 Nephi',
    chapter: '1',
    endChapter: '',
    text: '',
    topics: [],
    date: new Date().toISOString().split('T')[0]
  });
  const [newTopic, setNewTopic] = useState('');
  const [isRangeMode, setIsRangeMode] = useState(false);

const handleSaveNote = async () => {
    if (!currentNote.text.trim()) {
      alert('Please write a note before saving');
      return;
    }

    const noteId = `note_${Date.now()}`;
    const noteToSave = { 
      ...currentNote, 
      id: noteId, 
      isFavorite: false,
      chapterRange: isRangeMode && currentNote.endChapter ? 
        `${currentNote.chapter}-${currentNote.endChapter}` : 
        currentNote.chapter
    };
    
    try {
      const updatedNotes = [...notes, noteToSave];
      
      // Use localStorage directly since window.storage is not available
      localStorage.setItem('bom-notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      
      setCurrentNote({
        book: '1 Nephi',
        chapter: '1',
        endChapter: '',
        text: '',
        topics: [],
        date: new Date().toISOString().split('T')[0]
      });
      setIsRangeMode(false);
      
      alert('Note saved successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note. Please try again.');
    }
  };

  const addTopic = (topic) => {
    if (!currentNote.topics.includes(topic)) {
      setCurrentNote({ ...currentNote, topics: [...currentNote.topics, topic] });
    }
  };

  const removeTopic = (topicToRemove) => {
    setCurrentNote({
      ...currentNote,
      topics: currentNote.topics.filter(t => t !== topicToRemove)
    });
  };

  const addCustomTopic = () => {
    if (newTopic.trim() && !currentNote.topics.includes(newTopic.trim())) {
      addTopic(newTopic.trim());
      setNewTopic('');
    }
  };

  const maxChapter = BOM_BOOKS.find(b => b.name === currentNote.book)?.chapters || 1;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">
          <Home className="title-icon" />
          Daily Study Notes
        </h2>

        <div className="dashboard-form">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              value={currentNote.date}
              onChange={(e) => setCurrentNote({ ...currentNote, date: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Book</label>
            <select
              value={currentNote.book}
              onChange={(e) => setCurrentNote({ ...currentNote, book: e.target.value, chapter: '1', endChapter: '' })}
              className="form-select"
            >
              {BOM_BOOKS.map(book => (
                <option key={book.name} value={book.name}>{book.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <div className="chapter-mode-toggle">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isRangeMode}
                  onChange={(e) => {
                    setIsRangeMode(e.target.checked);
                    if (!e.target.checked) {
                      setCurrentNote({ ...currentNote, endChapter: '' });
                    }
                  }}
                  className="checkbox-input"
                />
                <span>I read multiple chapters</span>
              </label>
            </div>
          </div>

          {isRangeMode ? (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Starting Chapter</label>
                <select
                  value={currentNote.chapter}
                  onChange={(e) => setCurrentNote({ ...currentNote, chapter: e.target.value })}
                  className="form-select"
                >
                  {Array.from({ length: maxChapter }, (_, i) => i + 1).map(ch => (
                    <option key={ch} value={ch}>{ch}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Ending Chapter</label>
                <select
                  value={currentNote.endChapter}
                  onChange={(e) => setCurrentNote({ ...currentNote, endChapter: e.target.value })}
                  className="form-select"
                >
                  <option value="">Select end chapter</option>
                  {Array.from({ length: maxChapter }, (_, i) => i + 1)
                    .filter(ch => ch >= parseInt(currentNote.chapter))
                    .map(ch => (
                      <option key={ch} value={ch}>{ch}</option>
                    ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Chapter</label>
              <select
                value={currentNote.chapter}
                onChange={(e) => setCurrentNote({ ...currentNote, chapter: e.target.value })}
                className="form-select"
              >
                {Array.from({ length: maxChapter }, (_, i) => i + 1).map(ch => (
                  <option key={ch} value={ch}>{ch}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <Tag className="label-icon" />
              Topics/Tags
            </label>
            <div className="topics-grid">
              {SUGGESTED_TOPICS.map(topic => (
                <button
                  key={topic}
                  onClick={() => addTopic(topic)}
                  disabled={currentNote.topics.includes(topic)}
                  className={`topic-btn ${currentNote.topics.includes(topic) ? 'topic-btn-active' : ''}`}
                >
                  {topic}
                </button>
              ))}
            </div>
            
            {currentNote.topics.length > 0 && (
              <div className="selected-topics">
                <p className="selected-topics-label">Selected Topics:</p>
                <div className="selected-topics-list">
                  {currentNote.topics.map(topic => (
                    <span key={topic} className="selected-topic">
                      {topic}
                      <button
                        onClick={() => removeTopic(topic)}
                        className="remove-topic-btn"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="custom-topic-row">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomTopic()}
                placeholder="Add custom topic..."
                className="custom-topic-input"
              />
              <button onClick={addCustomTopic} className="add-topic-btn">
                Add
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Your Notes</label>
            <textarea
              value={currentNote.text}
              onChange={(e) => setCurrentNote({ ...currentNote, text: e.target.value })}
              placeholder="Write your insights, impressions, and thoughts here..."
              rows={10}
              className="form-textarea"
            />
          </div>

          <button onClick={handleSaveNote} className="save-btn">
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}