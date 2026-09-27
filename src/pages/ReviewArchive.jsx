import { useState, useEffect } from 'react';
import ReviewCard from '../components/ReviewCard';
import { loadReviews } from '../lib/content';

function ReviewArchive() {
  const [reviews, setReviews] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  useEffect(() => {
    loadReviewsData();
  }, []);

  const loadReviewsData = async () => {
    const data = await loadReviews();
    setReviews(data);
  };

  const filteredReviews = reviews.filter(review => {
    if (categoryFilter !== 'all' && review.category !== categoryFilter) return false;
    if (yearFilter !== 'all' && !review.date.includes(yearFilter)) return false;
    if (ratingFilter !== 'all') {
      const rating = review.rating;
      if (ratingFilter === '5' && rating < 4.5) return false;
      if (ratingFilter === '4' && (rating < 3.5 || rating >= 4.5)) return false;
      if (ratingFilter === '3' && (rating < 2.5 || rating >= 3.5)) return false;
      if (ratingFilter === '2' && (rating < 1.5 || rating >= 2.5)) return false;
      if (ratingFilter === '1' && rating >= 1.5) return false;
    }
    return true;
  });

  const years = [...new Set(reviews.map(r => r.date.split('-')[0]))].sort().reverse();

  return (
    <div className="py-16">
      <div className="container-editorial">
        <h1 className="font-serif text-5xl font-bold mb-4">Archive</h1>
        <p className="text-xl text-muted mb-12">All reviews in one place.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:border-ink focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="films">Films</option>
              <option value="music">Music</option>
              <option value="games">Games</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:border-ink focus:outline-none"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:border-ink focus:outline-none"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars (Masterpiece)</option>
              <option value="4">4 Stars (Excellent)</option>
              <option value="3">3 Stars (Good)</option>
              <option value="2">2 Stars (Average)</option>
              <option value="1">1 Star (Poor)</option>
            </select>
          </div>
        </div>

        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredReviews.map(review => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-muted">No reviews match your filters.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewArchive;