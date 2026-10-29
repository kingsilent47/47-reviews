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
      className="group block border border-gray-200 hover:border-ink transition-all duration-300 bg-paper overflow-hidden"
    >
      <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
        {review.image ? (
          <img
            src={review.image}
            alt={review.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-5 space-y-2">
        <p className="text-xs text-muted uppercase tracking-wide">
          {review.category}
        </p>

        <h3 className="font-serif font-bold text-lg leading-tight group-hover:underline underline-offset-4 decoration-1 transition-all">
          {review.title}
        </h3>

        {review.subtitle && (
          <p className="text-sm text-muted">{review.subtitle}</p>
        )}

        <div className="flex items-center justify-between pt-2">
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
