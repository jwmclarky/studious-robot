function Blog({ navigateTo }) {
  try {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const categories = ['All', 'AI Strategy', 'Growth Marketing', 'Brand Design', 'Case Studies', 'Industry Insights'];

    React.useEffect(() => {
      loadPosts();
    }, []);

    const loadPosts = async () => {
      try {
        const response = await trickleListObjects('blog_post', 50, true);
        const publishedPosts = response.items.filter(post => post.objectData.published);
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    const filteredPosts = selectedCategory === 'All' 
      ? posts 
      : posts.filter(post => post.objectData.category === selectedCategory);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center" data-name="blog" data-file="pages/Blog.js">
          <div className="animate-pulse text-xl">Loading insights...</div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50" data-name="blog" data-file="pages/Blog.js">
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Growth <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sharp strategies, proven tactics, and the future of AI-powered growth marketing.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.objectId} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                <img 
                  src={post.objectData.featured_image} 
                  alt={post.objectData.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {post.objectData.category}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {post.objectData.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.objectData.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {post.objectData.author}</span>
                    <button 
                      onClick={() => navigateTo('post', post)}
                      className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No posts found in this category.</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Blog component error:', error);
    return null;
  }
}