function BlogPost({ post, navigateTo }) {
  try {
    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center" data-name="blog-post" data-file="components/BlogPost.js">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
            <button onClick={() => navigateTo('blog')} className="btn-primary">
              Back to Blog
            </button>
          </div>
        </div>
      );
    }

    const formatContent = (content) => {
      return content.split('\n\n').map((paragraph, index) => (
        <p key={index} className="mb-6 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ));
    };

    return (
      <div className="min-h-screen bg-gray-50" data-name="blog-post" data-file="components/BlogPost.js">
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button 
              onClick={() => navigateTo('blog')}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
            >
              <div className="icon-arrow-left text-lg mr-2"></div>
              Back to Blog
            </button>

            <article>
              <header className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {post.objectData.category}
                  </span>
                  <span className="text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {post.objectData.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span>By {post.objectData.author}</span>
                  <span>•</span>
                  <span>{formatReadingTime(post.objectData.content)} min read</span>
                </div>
              </header>

              <div className="mb-8">
                <img 
                  src={post.objectData.featured_image} 
                  alt={post.objectData.title}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                {formatContent(post.objectData.content)}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.objectData.tags && JSON.parse(post.objectData.tags).map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => navigateTo('blog')}
                    className="btn-secondary"
                  >
                    View More Posts
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('BlogPost component error:', error);
    return null;
  }
}
