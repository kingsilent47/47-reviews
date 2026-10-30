import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { path: '/', label: 'Home' },
    { path: '/films', label: 'Films' },
    { path: '/music', label: 'Music' },
    { path: '/games', label: 'Games' },
    { path: '/archive', label: 'Archive' },
  ];

  const infoLinks = [
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
  ];

  return (
    <footer className="border-t border-gray-200 bg-paper mt-20">
      <div className="container-editorial py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-ink">
              47 Reviews
            </Link>
            <p className="text-sm text-muted mt-4 leading-relaxed max-w-xs">
              Honest reviews. No fluff. A personal corner of the internet dedicated to thoughtful critiques of films, music, and video games.
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="text-xs font-medium text-ink uppercase tracking-widest mb-6">Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted hover:text-ink transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h3 className="text-xs font-medium text-ink uppercase tracking-widest mb-6">Information</h3>
            <ul className="space-y-3">
              {infoLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted hover:text-ink transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
                {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-muted">
            &copy; {currentYear} 47 Reviews. All rights reserved.
          </p>
        </div>
    </footer>
  );
}

export default Footer;
