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
    setReviews(data || []);
  };

  // Find the specifically featured review, fallback to the latest if none is featured
  const featuredReview = reviews.find(r => r.featured === true) || reviews[0];
  
  // Get latest reviews, excluding the featured one so it doesn't appear twice
  const latestReviews = featuredReview 
    ? reviews.filter(r => r.slug !== featuredReview.slug).slice(0, 6)
    : reviews.slice(1, 7);

  const filteredReviews = searchQuery
    ? reviews.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <section className="border-b border-gray-200 py-12 md:py-20">
        <div className="container-editorial">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight reveal-text">
            Honest reviews.<br />No fluff.
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-6 md:mb-8">
            A personal corner of the internet dedicated to thoughtful reviews of films, music, and video games.
          </p>

          <div className="max-w-xl">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 focus:border-ink focus:outline-none transition-colors rounded-none bg-paper text-ink placeholder-muted"
            />
          </div>

          {searchQuery && (
            <div className="mt-8">
              <h2 className="font-serif text-2xl font-bold mb-6 reveal-text">Search Results</h2>
              {filteredReviews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
            <section className="border-b border-gray-200 py-12 md:py-16">
              <div className="container-editorial">
                <h2 className="font-serif text-3xl font-bold mb-8 flex items-center gap-3 reveal-text">
                  Featured Review
                  <span className="px-2 py-0.5 border border-ink text-[10px] font-bold uppercase tracking-widest text-ink">
                    Editor's Pick
                  </span>
                </h2>
                <Link 
                  to={`/${featuredReview.category}/${featuredReview.slug}`} 
                  className="group block border border-gray-200 hover:border-ink transition-all duration-300 bg-paper overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Sharp Image Container with Strict Hover Containment */}
                    <div className="image-contain bg-gray-100 aspect-[16/9] md:aspect-auto md:min-h-[500px] flex items-center justify-center">
                      {featuredReview.image ? (
                        <img
                          src={featuredReview.image}
                          alt={featuredReview.title}
                          loading="eager"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                          No Cover Art
                        </span>
                      )}
                    </div>
                    
                    {/* Editorial Text Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">
                        {capitalize(featuredReview.category)}
                      </p>
                      <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight break-words line-clamp-2 group-hover:underline underline-offset-4 decoration-1 transition-all">
                        {featuredReview.title}
                      </h3>
                      {featuredReview.subtitle && (
                        <p className="text-lg text-muted mb-6 font-serif italic">{featuredReview.subtitle}</p>
                      )}
                      <p className="text-muted leading-relaxed mb-8 line-clamp-4">
                        {featuredReview.summary}
                      </p>
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-auto">
                        {featuredReview.rating > 0 && (
                          <span className="text-lg font-medium tracking-wide text-ink">
                            {renderStars(featuredReview.rating)}
                          </span>
                        )}
                        <span className="text-xs font-bold text-muted uppercase tracking-widest group-hover:text-ink transition-colors">
                          Read Review &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          <section className="py-12 md:py-16">
            <div className="container-editorial">
              <h2 className="font-serif text-3xl font-bold mb-8 reveal-text">Latest Reviews</h2>
              {latestReviews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {latestReviews.map(review => (
                    <ReviewCard key={review.slug} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-muted">No reviews yet. Start writing!</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Home;
