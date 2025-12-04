import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, BookMarked, TrendingUp, ExternalLink } from 'lucide-react';
import './navigation.css';

export default function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/journal', label: 'Journal', icon: BookMarked },
    { path: '/progress', label: 'Progress', icon: TrendingUp },
    { path: '/resources', label: 'Resources', icon: ExternalLink }
  ];

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-header">
          <BookOpen className="nav-icon" />
          <h1 className="nav-title">Book of Mormon Study Journal</h1>
        </div>
        <div className="nav-links">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <Icon className="nav-link-icon" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}