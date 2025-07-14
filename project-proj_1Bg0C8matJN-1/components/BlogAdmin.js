function BlogAdmin() {
  try {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showForm, setShowForm] = React.useState(false);
    const [editingPost, setEditingPost] = React.useState(null);
    const [formData, setFormData] = React.useState({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      category: '',
      featured_image: '',
      tags: '',
      published: false
    });

    React.useEffect(() => {
      loadPosts();
    }, []);

    const loadPosts = async () => {
      try {
        const response = await trickleListObjects('blog_post', 50, true);
        setPosts(response.items);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const postData = {
          ...formData,
          tags: JSON.stringify(formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag))
        };

        if (editingPost) {
          await trickleUpdateObject('blog_post', editingPost.objectId, postData);
        } else {
          await trickleCreateObject('blog_post', postData);
        }

        resetForm();
        loadPosts();
        alert(editingPost ? 'Post updated successfully!' : 'Post created successfully!');
      } catch (error) {
        alert('Error saving post. Please try again.');
      }
    };

    const handleEdit = (post) => {
      setEditingPost(post);
      setFormData({
        ...post.objectData,
        tags: JSON.parse(post.objectData.tags || '[]').join(', ')
      });
      setShowForm(true);
    };

    const handleDelete = async (post) => {
      if (confirm('Are you sure you want to delete this post?')) {
        try {
          await trickleDeleteObject('blog_post', post.objectId);
          loadPosts();
          alert('Post deleted successfully!');
        } catch (error) {
          alert('Error deleting post. Please try again.');
        }
      }
    };

    const resetForm = () => {
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        category: '',
        featured_image: '',
        tags: '',
        published: false
      });
      setEditingPost(null);
      setShowForm(false);
    };

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-name="blog-admin" data-file="components/BlogAdmin.js">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Administration</h1>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'New Post'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Post Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="author"
                  placeholder="Author Name"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="AI Strategy">AI Strategy</option>
                  <option value="Growth Marketing">Growth Marketing</option>
                  <option value="Brand Design">Brand Design</option>
                  <option value="Case Studies">Case Studies</option>
                  <option value="Industry Insights">Industry Insights</option>
                </select>
                <input
                  type="url"
                  name="featured_image"
                  placeholder="Featured Image URL"
                  value={formData.featured_image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                />
              </div>
              <textarea
                name="excerpt"
                placeholder="Post Excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              ></textarea>
              <textarea
                name="content"
                placeholder="Post Content"
                value={formData.content}
                onChange={handleInputChange}
                rows="8"
                required
                className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              ></textarea>
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Publish immediately</span>
                </label>
                <div className="space-x-4">
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.objectId}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{post.objectData.title}</div>
                      <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{post.objectData.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{post.objectData.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        post.objectData.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.objectData.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button 
                        onClick={() => handleEdit(post)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(post)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('BlogAdmin component error:', error);
    return null;
  }
}