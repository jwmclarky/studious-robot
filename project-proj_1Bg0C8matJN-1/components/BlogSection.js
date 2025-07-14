function BlogSection({ navigateTo }) {
  try {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadPosts();
    }, []);

    const loadPosts = async () => {
      try {
        const response = await trickleListObjects('blog_post', 3, true);
        const publishedPosts = response.items.filter(post => post.objectData.published);
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <section className="py-20 bg-gray-50" data-name="blog-section" data-file="components/BlogSection.js">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">Loading insights...</div>
          </div>
        </section>
      );
    }

    return (
      <section className="py-20 bg-gray-50" data-name="blog-section" data-file="components/BlogSection.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Latest <span className="gradient-text">Insights</span>
            </h2>
            <p className="text-xl text-gray-600">
              Sharp strategies, proven tactics, and the future of growth marketing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
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
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.objectData.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.objectData.excerpt}
                  </p>
                  <button 
                    onClick={() => navigateTo('post', post)}
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigateTo('blog')}
              className="btn-secondary"
            >
              View All Insights
            </button>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('BlogSection component error:', error);
    return null;
  }
}