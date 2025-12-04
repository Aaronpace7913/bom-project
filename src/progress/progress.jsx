import React from 'react';
import { TrendingUp } from 'lucide-react';
import './progress.css';

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

export default function Progress({ notes }) {
  const progress = BOM_BOOKS.map(book => {
    const bookNotes = notes.filter(note => note.book === book.name);
    const chaptersWithNotes = [...new Set(bookNotes.map(note => note.chapter))].length;
    const percentage = (chaptersWithNotes / book.chapters) * 100;
    
    return {
      ...book,
      notesCount: bookNotes.length,
      chaptersWithNotes,
      percentage: percentage.toFixed(0)
    };
  });

  const totalChapters = BOM_BOOKS.reduce((sum, book) => sum + book.chapters, 0);
  const totalChaptersWithNotes = progress.reduce((sum, book) => sum + book.chaptersWithNotes, 0);
  const overallPercentage = ((totalChaptersWithNotes / totalChapters) * 100).toFixed(0);

  return (
    <div className="progress-container">
      <div className="progress-card">
        <h2 className="progress-title">
          <TrendingUp className="title-icon" />
          Study Progress
        </h2>

        <div className="overall-progress">
          <h3 className="overall-title">Overall Progress</h3>
          <div className="overall-bar-container">
            <div
              className="overall-bar"
              style={{ width: `${overallPercentage}%` }}
            >
              {overallPercentage}%
            </div>
          </div>
          <p className="overall-stat">
            {totalChaptersWithNotes} of {totalChapters} chapters with notes
          </p>
          <p className="overall-stat">
            Total Notes: {notes.length}
          </p>
        </div>

        <div className="books-progress">
          {progress.map(book => (
            <div key={book.name} className="book-progress">
              <div className="book-progress-header">
                <h4 className="book-progress-title">{book.name}</h4>
                <span className="book-progress-stats">
                  {book.chaptersWithNotes}/{book.chapters} chapters • {book.notesCount} notes
                </span>
              </div>
              <div className="book-bar-container">
                <div
                  className="book-bar"
                  style={{ width: `${book.percentage}%` }}
                >
                  {book.percentage > 10 && `${book.percentage}%`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}