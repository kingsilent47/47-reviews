import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-20">
      <div className="container-editorial py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">47 Reviews</h3>
            <p className="text-sm text-muted leading-relaxed">
              Honest reviews of films, music, and video games. No clickbait, no inflated scores, just thoughtful analysis.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/films" className="text-muted hover:text-ink">Films</Link></li>
              <li><Link to="/music" className="text-muted hover:text-ink">Music</Link></li>
              <li><Link to="/games" className="text-muted hover:text-ink">Games</Link></li>
              <li><Link to="/archive" className="text-muted hover:text-ink">Archive</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted hover:text-ink">About</Link></li>
              <li><Link to="/contact" className="text-muted hover:text-ink">Contact</Link></li>
              <li><Link to="/privacy" className="text-muted hover:text-ink">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted hover:text-ink">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} 47 Reviews. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;