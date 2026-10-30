// Read all JSON files in the content folder at build time
const modules = import.meta.glob('../../content/**/*.json', { eager: true });

function parseReview(path, module) {
  const data = module.default || module;
  
  const normalizedPath = path.replace(/\\/g, '/');
  const match = normalizedPath.match(/content\/([^/]+)\//);
  const category = match ? match[1] : 'unknown';
  
  const fileName = normalizedPath.split('/').pop();
  const slug = fileName.replace('.json', '');

  return {
    ...data,
    category,
    slug,
  };
}

export async function loadReviews(category = null) {
  // Filter out the 'playlists' folder so they don't mix with reviews
  const reviews = Object.entries(modules)
    .filter(([path]) => !path.includes('/playlists/'))
    .map(([path, module]) => parseReview(path, module));

  if (category) {
    return reviews
      .filter(r => r.category === category)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function loadReviewBySlug(category, slug) {
  const reviews = await loadReviews(category);
  return reviews.find(r => r.slug === slug) || null;
}

// New function specifically for loading playlists
export async function loadPlaylists() {
  const playlists = Object.entries(modules)
    .filter(([path]) => path.includes('/playlists/'))
    .map(([path, module]) => {
      const data = module.default || module;
      return {
        ...data,
        slug: path.split('/').pop().replace('.json', '')
      };
    });
  
  // Sort by the 'order' field (ascending), then alphabetically by title
  return playlists.sort((a, b) => {
    if ((a.order || 0) !== (b.order || 0)) {
      return (a.order || 0) - (b.order || 0);
    }
    return a.title.localeCompare(b.title);
  });
}
