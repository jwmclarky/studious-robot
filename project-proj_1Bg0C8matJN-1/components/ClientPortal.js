function ClientPortal() {
  try {
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadProjects();
    }, []);

    const loadProjects = async () => {
      try {
        const response = await trickleListObjects('client_project', 20, true);
        setProjects(response.items);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'In Progress': return 'bg-blue-100 text-blue-800';
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'On Hold': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-name="client-portal" data-file="components/ClientPortal.js">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Portal</h1>
          <p className="text-gray-600">Track your project progress and access resources</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.objectId} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{project.objectData.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.objectData.status)}`}>
                  {project.objectData.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{project.objectData.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{project.objectData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                    style={{ width: `${project.objectData.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Start Date:</span>
                  <span className="text-gray-900">{project.objectData.start_date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Due Date:</span>
                  <span className="text-gray-900">{project.objectData.due_date}</span>
                </div>
              </div>

              <button className="btn-primary w-full mt-4">
                View Details
              </button>
            </div>
          ))}
        </div>

        {projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-folder text-2xl text-gray-400"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Yet</h3>
            <p className="text-gray-600">Your projects will appear here once we start working together.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('ClientPortal component error:', error);
    return null;
  }
}