import { useState, useEffect } from 'react';
import ReviewCard from '../components/ReviewCard';
import { loadReviews } from '../lib/content';

function Films() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviewsData();
  }, []);

  const loadReviewsData = async () => {
    const data = await loadReviews('films');
    setReviews(data);
  };

  return (
    <div className="py-16">
      <div className="container-editorial">
        <h1 className="font-serif text-5xl font-bold mb-4">Films</h1>
        <p className="text-xl text-muted mb-12">Reviews of movies worth watching.</p>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reviews.map(review => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-muted">No film reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default Films;