class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [currentPage, setCurrentPage] = React.useState('home');
    const [selectedPost, setSelectedPost] = React.useState(null);

    const navigateTo = (page, post = null) => {
      setCurrentPage(page);
      setSelectedPost(post);
    };

    const renderPage = () => {
      switch(currentPage) {
        case 'blog':
          return <Blog navigateTo={navigateTo} />;
        case 'post':
          return <BlogPost post={selectedPost} navigateTo={navigateTo} />;
        case 'admin':
          return <Admin navigateTo={navigateTo} />;
        case 'assessment':
          return <Assessment navigateTo={navigateTo} />;
        case 'portal':
          return <Portal navigateTo={navigateTo} />;
        case 'onboarding':
          return <Onboarding navigateTo={navigateTo} />;
        case 'resources':
          return <Resources navigateTo={navigateTo} />;
        case 'proposal':
          return <Proposal navigateTo={navigateTo} />;
        default:
          return <Home navigateTo={navigateTo} />;
      }
    };

    return (
      <div className="min-h-screen bg-white" data-name="app" data-file="app.js">
        <HeroLogo />
        <Header navigateTo={navigateTo} currentPage={currentPage} />
        {renderPage()}
        <ConversionPopup />
        <LiveChat />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);