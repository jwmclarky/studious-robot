function ResourceLibrary() {
  try {
    const [resources, setResources] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [loading, setLoading] = React.useState(true);

    const categories = ['All', 'Templates', 'Guides', 'Case Studies', 'Tools', 'Checklists'];

    React.useEffect(() => {
      loadResources();
    }, []);

    const loadResources = async () => {
      try {
        const response = await trickleListObjects('resource', 50, true);
        setResources(response.items.filter(r => r.objectData.published));
      } catch (error) {
        console.error('Error loading resources:', error);
      } finally {
        setLoading(false);
      }
    };

    const filteredResources = selectedCategory === 'All' 
      ? resources 
      : resources.filter(r => r.objectData.category === selectedCategory);

    const downloadResource = async (resource) => {
      Analytics.trackClick('download_resource', resource.objectData.title);
      window.open(resource.objectData.download_url, '_blank');
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-name="resource-library" data-file="components/ResourceLibrary.js">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resource <span className="gradient-text">Library</span>
          </h1>
          <p className="text-xl text-gray-600">
            Download our proven templates, guides, and tools to accelerate your growth.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 justify-center">
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
          {filteredResources.map((resource) => (
            <div key={resource.objectId} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-4">
                <div className={`icon-${resource.objectData.icon} text-2xl text-white`}></div>
              </div>
              <div className="mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {resource.objectData.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.objectData.title}</h3>
              <p className="text-gray-600 mb-4">{resource.objectData.description}</p>
              <button 
                onClick={() => downloadResource(resource)}
                className="btn-primary w-full"
              >
                Download Free
              </button>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No resources found in this category.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('ResourceLibrary component error:', error);
    return null;
  }
}