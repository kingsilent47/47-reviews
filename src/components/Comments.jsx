import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function Comments({ reviewSlug, reviewTitle }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch approved comments when the component loads
  useEffect(() => {
    fetchComments();
  }, [reviewSlug]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('review_slug', reviewSlug)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setComments(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const { error } = await supabase.from('comments').insert([
      {
        review_slug: reviewSlug,
        author_name: name,
        author_email: email,
        content: content,
        is_approved: false, // You will approve these manually in Supabase
      },
    ]);

    if (!error) {
      setName('');
      setEmail('');
      setContent('');
      setSuccessMessage('Thank you! Your comment is pending approval.');
    } else {
      alert('Error submitting comment. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="mt-24 pt-12 border-t border-gray-200">
      <h2 className="font-serif text-3xl font-bold mb-8">Discussion</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 p-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 bg-paper text-ink focus:outline-none focus:border-ink transition-colors rounded-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 bg-paper text-ink focus:outline-none focus:border-ink transition-colors rounded-none"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-2">Comment</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 bg-paper text-ink focus:outline-none focus:border-ink transition-colors rounded-none resize-none"
            placeholder="Share your thoughts on this review..."
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-ink text-paper font-medium uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 rounded-none"
        >
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </button>
        {successMessage && (
          <p className="mt-4 text-sm text-green-700 font-medium">{successMessage}</p>
        )}
      </form>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.length === 0 ? (
          <p className="text-muted italic">No comments yet. Be the first to share your thoughts.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-8 last:border-0">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-serif font-bold text-lg text-ink">{comment.author_name}</span>
                <span className="text-xs text-muted uppercase tracking-wider">{formatDate(comment.created_at)}</span>
              </div>
              <p className="text-ink leading-relaxed whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Comments;
