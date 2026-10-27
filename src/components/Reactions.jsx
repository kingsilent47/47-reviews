import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Reactions({ slug }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Generate or retrieve user ID
  useEffect(() => {
    let id = localStorage.getItem('user_id');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('user_id', id);
    }
    setUserId(id);
  }, []);

  // Load reactions count and user's reaction
  useEffect(() => {
    if (!userId || !slug) return;

    const loadReactions = async () => {
      try {
        // Get counts
        const { data: likesData, error: likesError } = await supabase
          .from('reactions')
          .select('*', { count: 'exact', head: true })
          .eq('slug', slug)
          .eq('reaction_type', 'like');

        const { data: dislikesData, error: dislikesError } = await supabase
          .from('reactions')
          .select('*', { count: 'exact', head: true })
          .eq('slug', slug)
          .eq('reaction_type', 'dislike');

        if (likesError) throw likesError;
        if (dislikesError) throw dislikesError;

        setLikes(likesData?.length || 0);
        setDislikes(dislikesData?.length || 0);

        // Check if user has already reacted
        const { data: userReactionData } = await supabase
          .from('reactions')
          .select('reaction_type')
          .eq('slug', slug)
          .eq('user_id', userId)
          .single();

        if (userReactionData) {
          setUserReaction(userReactionData.reaction_type);
        }
      } catch (error) {
        console.error('Error loading reactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReactions();
  }, [slug, userId]);

  const handleReaction = async (type) => {
    if (loading || !userId) return;

    try {
      // If user already has this reaction, remove it (toggle off)
      if (userReaction === type) {
        await supabase
          .from('reactions')
          .delete()
          .eq('slug', slug)
          .eq('user_id', userId)
          .eq('reaction_type', type);

        setUserReaction(null);
        if (type === 'like') setLikes(prev => Math.max(0, prev - 1));
        else setDislikes(prev => Math.max(0, prev - 1));
        return;
      }

      // If switching reactions (e.g., from like to dislike)
      const oldType = userReaction;
      
      // Remove old reaction if exists
      if (oldType) {
        await supabase
          .from('reactions')
          .delete()
          .eq('slug', slug)
          .eq('user_id', userId)
          .eq('reaction_type', oldType);
        
        if (oldType === 'like') setLikes(prev => Math.max(0, prev - 1));
        else setDislikes(prev => Math.max(0, prev - 1));
      }

      // Add new reaction
      await supabase
        .from('reactions')
        .insert({
          slug: slug,
          reaction_type: type,
          user_id: userId
        });

      setUserReaction(type);
      if (type === 'like') setLikes(prev => prev + 1);
      else setDislikes(prev => prev + 1);

    } catch (error) {
      console.error('Error saving reaction:', error);
      // Revert on error
      if (userReaction === type) {
        setUserReaction(oldType);
        if (type === 'like') setLikes(prev => prev + 1);
        else setDislikes(prev => prev + 1);
      }
    }
  };

  return (
    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
      <button
        onClick={() => handleReaction('like')}
        disabled={loading || !userId}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
          userReaction === 'like' 
            ? 'bg-ink text-paper border-ink' 
            : 'bg-transparent text-ink border-gray-300 hover:bg-gray-100'
        } ${loading || !userId ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <svg className="w-5 h-5" fill={userReaction === 'like' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
        <span>{likes}</span>
      </button>

      <button
        onClick={() => handleReaction('dislike')}
        disabled={loading || !userId}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
          userReaction === 'dislike' 
            ? 'bg-ink text-paper border-ink' 
            : 'bg-transparent text-ink border-gray-300 hover:bg-gray-100'
        } ${loading || !userId ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <svg className="w-5 h-5 rotate-180" fill={userReaction === 'dislike' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
        <span>{dislikes}</span>
      </button>
    </div>
  );
}

export default Reactions;
