import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadReviewBySlug, loadReviews } from '../lib/content';
import ReviewCard from '../components/ReviewCard';
import Comments from '../components/Comments';
import Reactions from '../components/Reactions';
import ShareButtons from '../components/ShareButtons';

function ReviewDetail() {
  const { category, id } = useParams();
  
  const [review, setReview] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [relatedReviews, setRelatedReviews] = useState([]);

  useEffect(() => {
    const loadReview = async () => {
      const data = await loadReviewBySlug(category, id);
      setReview(data);
    };
    loadReview();
  }, [category, id]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadRelated = async () => {
      const allInCategory = await loadReviews(category);
      const filtered = allInCategory.filter(r => r.slug !== id).slice(0, 3);
      setRelatedReviews(filtered);
    };
    loadRelated();
  }, [category]);

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
      if (i < fullStars) stars.push('★');
      else if (i === fullStars && hasHalfStar) stars.push('½');
      else stars.push('☆');
    }
    return stars.join('');
  };

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const calculateReadingTime = (text) => {
    if (!text) return 1;
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, minutes);
  };

  const readingTime = calculateReadingTime(review.content);

  const schemaType = category === 'films' ? 'Movie' : category === 'music' ? 'MusicAlbum' : 'VideoGame';
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": { "@type": schemaType, "name": review.title },
    "author": { "@type": "Person", "name": "47 Reviews" },
    "datePublished": review.date,
    "reviewRating": { "@type": "Rating", "ratingValue": review.rating, "bestRating": "5", "worstRating": "1" },
    "reviewBody": review.summary || review.content.substring(0, 200) + "..."
  };

  return (
    <div className="py-16">
      <div className="container-editorial max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink transition-colors">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to={`/${category}`} className="hover:text-ink transition-colors">{capitalize(category)}</Link>
          <span className="text-gray-400">/</span>
          <span className="text-ink font-medium">{review.title}</span>
        </nav>

        <article>
          <header className="mb-12">
            <p className="text-xs text-muted uppercase tracking-widest mb-4">{capitalize(category)}</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">{review.title}</h1>
            {review.subtitle && <p className="text-2xl text-muted mb-6 font-serif italic">{review.subtitle}</p>}

            <div className="flex items-center gap-4 text-sm text-muted mb-8 pb-8 border-b border-gray-200">
              <span className="text-2xl font-medium tracking-wide text-ink">{renderStars(review.rating)}</span>
              <span>{review.date}</span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>

            {review.image && (
              <div className="bg-gray-100 mb-8 overflow-hidden flex justify-center">
                <img src={review.image} alt={review.title} className="w-full h-auto max-h-[600px] object-contain" />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-t border-b border-gray-200 text-sm">
              {review.developer && <div><p className="text-muted uppercase tracking-wider text-xs mb-1">Developer</p><p className="font-medium text-ink">{review.developer}</p></div>}
              {review.director && <div><p className="text-muted uppercase tracking-wider text-xs mb-1">Director</p><p className="font-medium text-ink">{review.director}</p></div>}
              {review.artist && <div><p className="text-muted uppercase tracking-wider text-xs mb-1">Artist</p><p className="font-medium text-ink">{review.artist}</p></div>}
              {review.platform && <div><p className="text-muted uppercase tracking-wider text-xs mb-1">Platform</p><p className="font-medium text-ink">{review.platform}</p></div>}
              {review.release_date && <div><p className="text-muted uppercase tracking-wider text-xs mb-1">Release Date</p><p className="font-medium text-ink">{review.release_date}</p></div>}
              {review.genre && <div><p className="text-muted uppercase tracking-wider text-xs mb-1">Genre</p><p className="font-medium text-ink">{review.genre}</p></div>}
              {review.runtime && <div><p className="text-muted uppercase tracking-wider text-xs mb-1">Runtime</p><p className="font-medium text-ink">{review.runtime}</p></div>}
              {review.playtime && <div><p className="text-muted uppercase tracking-wider text-xs mb-1">Playtime</p><p className="font-medium text-ink">{review.playtime}</p></div>}
              {review.favorite_track && <div><p className="text-muted uppercase tracking-wider text-xs mb-1">Favorite Track</p><p className="font-medium text-ink">{review.favorite_track}</p></div>}
              {review.least_favorite_track && <div><p className="text-muted uppercase tracking-wider text-xs mb-1">Least Favorite Track</p><p className="font-medium text-ink">{review.least_favorite_track}</p></div>}
            </div>
          </header>

          <div className="border border-gray-200 p-8 my-12 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-8">
              <p className="text-xs text-muted uppercase tracking-widest mb-2">Score</p>
              <div className="text-4xl font-serif font-bold text-ink">{review.rating} <span className="text-lg text-muted font-sans font-normal">/ 5</span></div>
              <div className="text-xl mt-2">{renderStars(review.rating)}</div>
            </div>
            {review.verdict && (
              <div className="md:w-2/3 flex flex-col justify-center">
                <p className="text-xs text-muted uppercase tracking-widest mb-2">The Bottom Line</p>
                <p className="font-serif text-xl italic text-ink leading-relaxed">{review.verdict}</p>
              </div>
            )}
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            {review.summary && <p className="text-xl text-muted leading-relaxed mb-8 font-serif italic border-l-4 border-ink pl-6">{review.summary}</p>}
            {review.pull_quote && (
              <blockquote className="my-12 py-8 border-t border-b border-gray-200 text-center">
                <p className="font-serif text-2xl md:text-3xl italic text-ink leading-relaxed">"{review.pull_quote}"</p>
              </blockquote>
            )}

            <div className="space-y-6">
              {review.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className={index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:leading-none first-letter:text-ink" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            {review.pros && review.pros.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="font-serif text-2xl font-bold mb-4">Pros</h2>
                <ul className="space-y-2">
                  {review.pros.map((pro, index) => (<li key={index} className="flex items-start"><span className="text-green-700 mr-3 font-bold">+</span><span>{pro}</span></li>))}
                </ul>
              </div>
            )}

            {review.cons && review.cons.length > 0 && (
              <div className="mt-8">
                <h2 className="font-serif text-2xl font-bold mb-4">Cons</h2>
                <ul className="space-y-2">
                  {review.cons.map((con, index) => (<li key={index} className="flex items-start"><span className="text-red-700 mr-3 font-bold">-</span><span>{con}</span></li>))}
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

        {/* Music Streaming Links */}
        {category === 'music' && (review.spotify_link || review.apple_music_link || review.youtube_music_link) && (
          <div className="my-12 p-6 bg-gray-50 border border-gray-200 flex flex-col md:flex-row items-center gap-6">
            <p className="font-serif font-bold text-lg text-ink md:w-1/4 text-center md:text-left">Listen on:</p>
            <div className="flex flex-wrap gap-4 md:w-3/4 justify-center md:justify-start">
              {review.spotify_link && (
                <a href={review.spotify_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-[#1DB954] text-white rounded-full hover:opacity-90 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                  <span className="font-medium text-sm">Spotify</span>
                </a>
              )}
              {review.apple_music_link && (
                <a href={review.apple_music_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full hover:opacity-90 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  <span className="font-medium text-sm">Apple Music</span>
                </a>
              )}
              {review.youtube_music_link && (
                <a href={review.youtube_music_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-[#FF0000] text-white rounded-full hover:opacity-90 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
                  <span className="font-medium text-sm">YouTube Music</span>
                </a>
              )}
            </div>
          </div>
        )}

        <ShareButtons title={review.title} url={window.location.href} />

        <Reactions slug={id} />

        {relatedReviews.length > 0 && (
          <section className="mt-24 pt-12 border-t border-gray-200">
            <h2 className="font-serif text-3xl font-bold mb-8">More in {capitalize(category)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedReviews.map(r => (<ReviewCard key={r.slug} review={r} />))}
            </div>
          </section>
        )}
        <Comments reviewSlug={id} reviewTitle={review.title} />
      </div>
    </div>
  );
}

export default ReviewDetail;
