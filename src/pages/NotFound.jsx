import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="py-24 md:py-40">
      <div className="container-editorial max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-muted mb-8">
          Error 404
        </p>
        
        {/* Massive Brutalist Typography */}
        <h1 className="font-serif text-[10rem] md:text-[15rem] font-bold leading-[0.85] tracking-tighter text-ink mb-12">
          404
        </h1>
        
        {/* Sharp 1px Divider */}
        <div className="w-full h-px bg-ink mb-12"></div>
        
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-ink">
          Page Not Found
        </h2>
        
        <p className="text-lg text-muted leading-relaxed mb-12 max-w-xl mx-auto">
          The article you are looking for does not exist, has been moved, or was never written.
        </p>
        
        {/* Sharp Return Button */}
        <Link
          to="/"
          className="inline-block px-10 py-4 bg-ink text-paper text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          Return Home &rarr;
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
