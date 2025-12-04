import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './navigation/navigation.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import Journal from './journal/journal.jsx';
import Resources from './resources/resources.jsx';
import Progress from './progress/progress.jsx';
import './app.css';

function AppContent() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const notesResult = await window.storage.get('bom-notes');
      if (notesResult) {
        const loadedNotes = JSON.parse(notesResult.value);
        setNotes(loadedNotes);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-2xl text-blue-900 font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard notes={notes} setNotes={setNotes} />} />
        <Route path="/journal" element={<Journal notes={notes} setNotes={setNotes} />} />
        <Route path="/progress" element={<Progress notes={notes} />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}