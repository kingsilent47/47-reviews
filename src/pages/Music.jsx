import { useState, useEffect } from 'react';
import ReviewCard from '../components/ReviewCard';
import { loadReviews } from '../lib/content';

function Music() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviewsData();
  }, []);

  const loadReviewsData = async () => {
    const data = await loadReviews('music');
    setReviews(data);
  };

  return (
    <div className="py-16">
      <div className="container-editorial">
        <h1 className="font-serif text-5xl font-bold mb-4">Music</h1>
        <p className="text-xl text-muted mb-12">Albums and tracks that deserve attention.</p>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reviews.map(review => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-muted">No music reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default Music;