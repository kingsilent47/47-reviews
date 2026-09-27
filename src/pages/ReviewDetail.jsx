import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadReviewBySlug } from '../lib/content';

function ReviewDetail() {
  const { category, id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    loadReview();
  }, [category, id]);

  const loadReview = async () => {
    const data = await loadReviewBySlug(category, id);
    setReview(data);
  };

  if (!review) {
    return (
      <div className="py-16">
        <div className="container-editorial">
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    );
  }

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
    <div className="py-16">
      <div className="container-editorial max-w-3xl">
        <Link 
          to={`/${category}`}
          className="inline-block text-sm text-muted hover:text-ink mb-8 transition-colors"
        >
          Back to {category}
        </Link>

        <article>
          <header className="mb-12">
            <p className="text-sm text-muted uppercase tracking-wide mb-4">
              {review.category}
            </p>
            
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 leading-tight">
              {review.title}
            </h1>

            {review.subtitle && (
              <p className="text-2xl text-muted mb-6">{review.subtitle}</p>
            )}

            <div className="flex items-center gap-6 text-sm text-muted mb-6">
              <span className="text-2xl font-medium tracking-wide">
                {renderStars(review.rating)}
              </span>
              <span>{review.date}</span>
            </div>

            {review.image && (
              <div className="aspect-[16/9] bg-gray-100 mb-8 overflow-hidden">
                <img 
                  src={review.image} 
                  alt={review.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          <div className="space-y-6 text-lg leading-relaxed">
            {review.summary && (
              <p className="text-xl text-muted leading-relaxed mb-8 font-serif italic">
                {review.summary}
              </p>
            )}

            {review.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {review.pros && review.pros.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="font-serif text-2xl font-bold mb-4">Pros</h2>
                <ul className="space-y-2">
                  {review.pros.map((pro, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-700 mr-3 font-bold">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {review.cons && review.cons.length > 0 && (
              <div className="mt-8">
                <h2 className="font-serif text-2xl font-bold mb-4">Cons</h2>
                <ul className="space-y-2">
                  {review.cons.map((con, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-700 mr-3 font-bold">-</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {review.verdict && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="font-serif text-2xl font-bold mb-4">Verdict</h2>
                <p className="text-lg leading-relaxed">{review.verdict}</p>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default ReviewDetail;