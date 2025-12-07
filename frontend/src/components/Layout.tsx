import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toggleTheme, getTheme } from '../utils/theme';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [theme, setThemeState] = useState<'light' | 'dark'>(getTheme());

  useEffect(() => {
    const currentTheme = getTheme();
    setThemeState(currentTheme);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setThemeState(newTheme);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">Incident Manager</h1>
        </div>
        <nav className="sidebar-nav">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <span className="nav-icon">📋</span>
            <span>All Incidents</span>
          </Link>
          <Link
            to="/create"
            className={`nav-link ${isActive('/create') ? 'active' : ''}`}
          >
            <span className="nav-icon">➕</span>
            <span>Create Incident</span>
          </Link>
        </nav>
        <div className="sidebar-footer">
          <button
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

