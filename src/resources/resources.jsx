import React from 'react';
import { ExternalLink, BookOpen, BookMarked } from 'lucide-react';
import './resources.css';

export default function Resources() {
  const resources = [
    {
      name: 'Gospel Library',
      url: 'https://www.churchofjesuschrist.org/study/scriptures/bofm?lang=eng',
      description: 'Official scripture study app with the Book of Mormon',
      icon: BookOpen
    },
    {
      name: 'Come Follow Me',
      url: 'https://www.churchofjesuschrist.org/study/come-follow-me?lang=eng',
      description: 'Weekly study resources and lessons',
      icon: BookMarked
    },
    {
      name: 'Scripture Citation Index',
      url: 'https://scriptures.byu.edu/',
      description: 'BYU Scripture Citation Index for cross-references',
      icon: ExternalLink
    },
    {
      name: 'Book of Mormon Central',
      url: 'https://bookofmormoncentral.org/',
      description: 'In-depth Book of Mormon research and resources',
      icon: BookOpen
    },
    {
      name: 'Gospel Topics',
      url: 'https://www.churchofjesuschrist.org/study/manual/gospel-topics?lang=eng',
      description: 'Doctrinal topics and essays',
      icon: BookMarked
    },
    {
      name: 'Scripture Study Tools',
      url: 'https://www.churchofjesuschrist.org/study?lang=eng',
      description: 'General conference, manuals, and more',
      icon: ExternalLink
    }
  ];

  return (
    <div className="resources-container">
      <div className="resources-card">
        <h2 className="resources-title">
          <ExternalLink className="title-icon" />
          Study Resources
        </h2>

<div className="resources-grid">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                <div className="resource-icon-container">
                  <Icon className="resource-icon" />
                </div>
                <div className="resource-content">
                  <h3 className="resource-name">
                    {resource.name}
                    <ExternalLink className="external-icon" />
                  </h3>
                  <p className="resource-description">{resource.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}