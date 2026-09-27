import { Link } from 'react-router-dom';

function ReviewCard({ review }) {
  const renderStars = (rating) => {
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
      className="group block"
    >
      <div className="aspect-[2/3] bg-gray-100 mb-4 overflow-hidden">
        {review.image ? (
          <img
            src={review.image}
            alt={review.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">
            No image
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted uppercase tracking-wide">
          {review.category}
        </p>

        <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-gray-600 transition-colors">
          {review.title}
        </h3>

        {review.subtitle && (
          <p className="text-sm text-muted">{review.subtitle}</p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium tracking-wide">
            {renderStars(review.rating)}
          </span>
          <span className="text-xs text-muted">
            {review.date}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ReviewCard;