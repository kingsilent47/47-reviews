// Read all JSON files in the content folder at build time
const modules = import.meta.glob('../../content/**/*.json', { eager: true });

function parseReview(path, module) {
  const data = module.default || module;
  
  // 1. Normalize path to use forward slashes (fixes Windows backslash issues)
  const normalizedPath = path.replace(/\\/g, '/');
  
  // 2. Extract category using regex: matches "content/films/" or "content/games/"
  const match = normalizedPath.match(/content\/([^/]+)\//);
  const category = match ? match[1] : 'unknown';
  
  // 3. Extract slug from the filename (e.g., "need-for-speed.json" -> "need-for-speed")
  const fileName = normalizedPath.split('/').pop();
  const slug = fileName.replace('.json', '');

  return {
    ...data,
    category,
    slug,
  };
}

export async function loadReviews(category = null) {
  const reviews = Object.entries(modules).map(([path, module]) =>
    parseReview(path, module)
  );

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
