function Assessment({ navigateTo }) {
  try {
    const [assessmentComplete, setAssessmentComplete] = React.useState(false);

    React.useEffect(() => {
      Analytics.trackPageView('assessment');
    }, []);

    const handleAssessmentComplete = (answers) => {
      setAssessmentComplete(true);
    };

    return (
      <div className="min-h-screen bg-gray-50" data-name="assessment" data-file="pages/Assessment.js">
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
            >
              <div className="icon-arrow-left text-lg mr-2"></div>
              Back to Home
            </button>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Growth Strategy <span className="gradient-text">Assessment</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take our 2-minute assessment to discover the perfect growth strategy for your business.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <StrategyAssessment onComplete={handleAssessmentComplete} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Assessment component error:', error);
    return null;
  }
}