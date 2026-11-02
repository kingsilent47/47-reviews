import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadReviews } from '../lib/content';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Fetch and filter reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }
      const allReviews = await loadReviews();
      const lowerQuery = query.toLowerCase();
      
      const filtered = allReviews.filter(r => 
        r.title.toLowerCase().includes(lowerQuery) ||
        r.category.toLowerCase().includes(lowerQuery) ||
        (r.artist && r.artist.toLowerCase().includes(lowerQuery)) ||
        (r.director && r.director.toLowerCase().includes(lowerQuery))
      ).slice(0, 8); // Limit to 8 results for clean UI
      
      setResults(filtered);
      setSelectedIndex(0);
    };
    
    // Debounce slightly for performance
    const timer = setTimeout(fetchReviews, 150);
    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + Math.max(1, results.length)) % Math.max(1, results.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results.length > 0) {
          const selected = results[selectedIndex];
          navigate(`/${selected.category}/${selected.slug}`);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-paper border border-gray-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-gray-200 px-4">
          <svg className="w-5 h-5 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reviews, artists, directors..."
            className="w-full px-4 py-4 bg-transparent text-ink placeholder-muted focus:outline-none text-lg"
          />
          <kbd className="hidden md:inline-block px-2 py-1 text-xs font-medium text-muted bg-gray-100 border border-gray-200">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-muted text-sm">
              Type to search for films, music, or games...
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-muted text-sm">
              No reviews found matching "{query}".
            </div>
          ) : (
            <ul className="py-2">
              {results.map((review, index) => (
                <li key={review.slug}>
                  <button
                    onClick={() => {
                      navigate(`/${review.category}/${review.slug}`);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                      index === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-ink">{review.title}</span>
                      <span className="text-xs text-muted uppercase tracking-wider mt-1">
                        {review.category} {review.artist ? `• ${review.artist}` : ''}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-muted">{review.rating} ★</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer Hints */}
        <div className="border-t border-gray-200 px-4 py-2.5 flex items-center gap-4 text-xs text-muted bg-gray-50">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 text-[10px]">↑</kbd>
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 text-[10px]">↓</kbd> 
            to navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 text-[10px]">↵</kbd> 
            to open
          </span>
        </div>
      </div>
    </div>
  );
}
