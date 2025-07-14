function Admin({ navigateTo }) {
  try {
    return (
      <div className="min-h-screen bg-gray-50" data-name="admin" data-file="pages/Admin.js">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <button 
                onClick={() => navigateTo('home')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to Website
              </button>
            </div>
          </div>
        </div>
        <BlogAdmin />
      </div>
    );
  } catch (error) {
    console.error('Admin component error:', error);
    return null;
  }
}