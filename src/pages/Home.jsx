import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { loadReviews } from '../lib/content';

function Home() {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadReviewsData();
  }, []);

  const loadReviewsData = async () => {
    const data = await loadReviews();
    setReviews(data);
  };

  const latestReviews = reviews.slice(0, 6);
  const featuredReview = reviews[0];
  const highestRated = [...reviews].sort((a, b) => b.rating - a.rating)[0];
  const lowestRated = [...reviews].sort((a, b) => a.rating - b.rating)[0];

  const filteredReviews = searchQuery
    ? reviews.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push('★');
      else if (i === fullStars && hasHalfStar) stars.push('½');
      else stars.push('☆');
    }
    return stars.join('');
  };

  return (
    <div>
      <section className="border-b border-gray-200 py-20">
        <div className="container-editorial">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Honest reviews.<br />No fluff.
          </h1>
          <p className="text-xl text-muted max-w-2xl leading-relaxed mb-8">
            A personal corner of the internet dedicated to thoughtful reviews of films, music, and video games.
          </p>

          <div className="max-w-xl">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 focus:border-ink focus:outline-none transition-colors"
            />
          </div>

          {searchQuery && (
            <div className="mt-8">
              <h2 className="font-serif text-2xl font-bold mb-6">Search Results</h2>
              {filteredReviews.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredReviews.map(review => (
                    <ReviewCard key={review.slug} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-muted">No reviews found.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {!searchQuery && (
        <>
          {featuredReview && (
            <section className="border-b border-gray-200 py-16">
              <div className="container-editorial">
                <h2 className="font-serif text-3xl font-bold mb-8">Featured Review</h2>
                <Link to={`/${featuredReview.category}/${featuredReview.slug}`} className="group block">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-[2/3] bg-gray-100 overflow-hidden">
                      {featuredReview.image ? (
                        <img
                          src={featuredReview.image}
                          alt={featuredReview.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-muted uppercase tracking-wide mb-2">
                        {featuredReview.category}
                      </p>
                      <h3 className="font-serif text-4xl font-bold mb-4 group-hover:text-gray-600 transition-colors">
                        {featuredReview.title}
                      </h3>
                      {featuredReview.subtitle && (
                        <p className="text-lg text-muted mb-4">{featuredReview.subtitle}</p>
                      )}
                      <p className="text-muted leading-relaxed mb-6">
                        {featuredReview.summary}
                      </p>
                      <span className="text-lg font-medium tracking-wide">
                        {renderStars(featuredReview.rating)}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          <section className="py-16">
            <div className="container-editorial">
              <h2 className="font-serif text-3xl font-bold mb-8">Latest Reviews</h2>
              {latestReviews.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {latestReviews.map(review => (
                    <ReviewCard key={review.slug} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-muted">No reviews yet. Start writing!</p>
              )}
            </div>
          </section>

          {(highestRated || lowestRated) && (
            <section className="border-t border-gray-200 py-16">
              <div className="container-editorial">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {highestRated && (
                    <div>
                      <h2 className="font-serif text-2xl font-bold mb-6">Highest Rated</h2>
                      <ReviewCard review={highestRated} />
                    </div>
                  )}
                  {lowestRated && (
                    <div>
                      <h2 className="font-serif text-2xl font-bold mb-6">Lowest Rated</h2>
                      <ReviewCard review={lowestRated} />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Home;