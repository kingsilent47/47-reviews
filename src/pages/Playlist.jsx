import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadPlaylists } from '../lib/content';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const data = await loadPlaylists();
      setPlaylists(data || []);
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="py-16">
      <div className="container-editorial max-w-4xl">
        <h1 className="font-serif text-5xl font-bold mb-6">My Playlists</h1>
        <p className="text-xl text-muted leading-relaxed mb-12 max-w-2xl">
          A curated collection of what I'm currently listening to. Find my playlists exclusively on Apple Music below.
        </p>

        <div className="space-y-6 mb-16">
          {playlists.length > 0 ? (
            playlists.map((playlist, index) => (
              <a 
                key={playlist.slug || index}
                href={playlist.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 border border-gray-200 hover:border-ink bg-paper transition-all duration-300"
              >
                <div className="flex items-start gap-6 mb-4 md:mb-0">
                  <svg className="w-10 h-10 text-ink flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-ink mb-2 group-hover:underline underline-offset-4 decoration-1 transition-all">
                      {playlist.title}
                    </h2>
                    {playlist.description && (
                      <p className="text-sm text-muted leading-relaxed max-w-md">
                        {playlist.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <span className="px-6 py-3 bg-ink text-paper text-xs font-medium uppercase tracking-widest group-hover:bg-gray-800 transition-colors whitespace-nowrap">
                  Listen on Apple Music &rarr;
                </span>
              </a>
            ))
          ) : (
            <div className="text-center py-12 border border-gray-200 bg-gray-50">
              <p className="text-muted font-serif italic">No playlists added yet. Check back soon!</p>
            </div>
          )}
        </div>
        
        <div className="text-center border-t border-gray-200 pt-12">
          <p className="text-muted mb-6">Want me to review an album or artist you love?</p>
          <Link to="/contact" className="inline-block px-8 py-3 border border-gray-300 text-sm font-medium text-ink uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors">
            Request a Review
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Playlists;
