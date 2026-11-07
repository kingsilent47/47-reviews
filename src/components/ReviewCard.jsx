import { Link } from 'react-router-dom';

function ReviewCard({ review }) {
  const renderStars = (rating) => {
    if (!rating || rating <= 0) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('½');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
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
