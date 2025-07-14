function Header({ navigateTo, currentPage }) {
  try {
    return (
      <header className="bg-white shadow-sm sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              <img 
                src="https://app.trickle.so/storage/public/images/usr_12a5a9ed68000001/dd46d459-b1a7-4cdd-bb9f-b357e1f9a1e2.png" 
                alt="Bytegeist Logo" 
                className="h-10 w-auto"
              />
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => navigateTo('home')}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${currentPage === 'home' ? 'text-blue-600 font-semibold' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateTo('blog')}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${currentPage === 'blog' ? 'text-blue-600 font-semibold' : ''}`}
              >
                Blog
              </button>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <button 
                onClick={() => navigateTo('assessment')}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${currentPage === 'assessment' ? 'text-blue-600 font-semibold' : ''}`}
              >
                Assessment
              </button>
              <button 
                onClick={() => navigateTo('resources')}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${currentPage === 'resources' ? 'text-blue-600 font-semibold' : ''}`}
              >
                Resources
              </button>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <button 
                onClick={() => navigateTo('admin')}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${currentPage === 'admin' ? 'text-blue-600 font-semibold' : ''}`}
              >
                Admin
              </button>
            </nav>

            <button 
              onClick={() => navigateTo('onboarding')}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}