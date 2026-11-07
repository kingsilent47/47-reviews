import { Link } from 'react-router-dom';

function ReviewCard({ review }) {
  const renderStars = (rating) => {
    if (!rating || rating <= 0) return null;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <span className="flex items-center gap-0.5 text-ink">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            // Full star
            return (
              <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            );
          } else if (i === fullStars && hasHalfStar) {
            // Half star (left side filled, right side outlined)
            return (
              <svg key={i} className="w-5 h-5" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id={`half-star-${i}`}>
                    <stop offset="50%" stopColor="currentColor"/>
                    <stop offset="50%" stopColor="transparent"/>
                  </linearGradient>
                </defs>
                <path 
                  fill={`url(#half-star-${i})`} 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            );
          } else {
            // Empty star
            return (
              <svg key={i} className="w-5 h-5 fill-transparent stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            );
          }
        })}
      </span>
    );
  };

  return (
    <Link
      to={`/${review.category}/${review.slug}`}
      className="group block border border-gray-200 hover:border-ink transition-all duration-300 bg-paper overflow-hidden"
    >
      {/* Image Container with Strict Hover Containment */}
      <div className="aspect-[16/9] bg-gray-100 image-contain">
        {review.image ? (
          <img
            src={review.image}
            alt={review.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center border-b border-gray-200">
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
              No Cover Art
            </span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        {/* Sharp Category Badge */}
        <span className="inline-block px-3 py-1 border border-gray-300 text-[10px] font-bold text-ink uppercase tracking-widest">
          {review.category}
        </span>

        <h3 className="font-serif font-bold text-lg leading-tight break-words line-clamp-2 group-hover:underline underline-offset-4 decoration-1 transition-all">
          {review.title}
        </h3>

        {review.subtitle && (
          <p className="text-sm text-muted">{review.subtitle}</p>
        )}

        <div className="flex items-center justify-between pt-2">
          {/* Only render stars if a rating exists */}
          {review.rating > 0 && (
            <span className="text-sm font-medium tracking-wide">
              {renderStars(review.rating)}
            </span>
          )}
          {review.date && (
            <span className="text-xs text-muted">
              {review.date}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ReviewCard;
