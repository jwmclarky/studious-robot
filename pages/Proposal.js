function Proposal({ navigateTo }) {
  try {
    React.useEffect(() => {
      Analytics.trackPageView('proposal');
    }, []);

    return (
      <div className="min-h-screen bg-gray-50" data-name="proposal" data-file="pages/Proposal.js">
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
            >
              <div className="icon-arrow-left text-lg mr-2"></div>
              Back to Home
            </button>
          </div>
        </div>
        <ProposalGenerator />
      </div>
    );
  } catch (error) {
    console.error('Proposal component error:', error);
    return null;
  }
}