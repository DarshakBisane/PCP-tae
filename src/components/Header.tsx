import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="container">
        <div className="header-inner">
          <a href="#" className="brand-link" aria-label="PCP Solver Home">
            <div className="brand-icon">PCP</div>
            <span>PCP Solver</span>
          </a>

          <nav className="header-nav" aria-label="Main Navigation">
            <a href="#solver" className="nav-link">Solver</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#example" className="nav-link">Example</a>
            <a href="#complexity" className="nav-link">Complexity</a>
            <a href="#academic-info" className="nav-link">Project Info</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
