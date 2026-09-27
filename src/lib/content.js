// Read all JSON files in the content folder at build time
const modules = import.meta.glob('../content/**/*.json', { eager: true });

function parseReview(path, module) {
  const data = module.default || module;
  
  // Extract category from path: ../content/films/slug.json becomes 'films'
  const category = path.split('/')[2];
  
  // Extract slug from path: ../content/films/slug.json becomes 'slug'
  const slug = path.split('/').pop().replace('.json', '');

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