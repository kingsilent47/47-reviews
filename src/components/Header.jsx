import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/films', label: 'Films' },
    { path: '/music', label: 'Music' },
    { path: '/games', label: 'Games' },
    { path: '/playlists', label: 'Playlists' },
    { path: '/archive', label: 'Archive' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header className="border-b border-gray-200 bg-paper sticky top-0 z-50">
      <div className="container-editorial">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-ink">
            47 Reviews
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex space-x-8">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-ink border-b-2 border-ink pb-1'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Sharp Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-paper">
            <nav className="container-editorial py-6 flex flex-col gap-5">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-serif border-b border-gray-200 pb-4 last:border-0 last:pb-0 transition-colors ${
                    location.pathname === item.path ? 'text-ink font-bold' : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
