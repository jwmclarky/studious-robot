function Onboarding({ navigateTo }) {
  try {
    const [completed, setCompleted] = React.useState(false);

    React.useEffect(() => {
      Analytics.trackPageView('onboarding');
    }, []);

    const handleOnboardingComplete = (data) => {
      setCompleted(true);
    };

    if (completed) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center" data-name="onboarding" data-file="pages/Onboarding.js">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="icon-check text-3xl text-white"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Bytegeist!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for completing the onboarding. We'll be in touch within 24 hours with your custom growth strategy.
            </p>
            <div className="space-x-4">
              <button onClick={() => navigateTo('home')} className="btn-secondary">
                Back to Home
              </button>
              <button onClick={() => navigateTo('resources')} className="btn-primary">
                Explore Resources
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50" data-name="onboarding" data-file="pages/Onboarding.js">
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
              Let's Get <span className="gradient-text">Started</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us about your business so we can create a custom growth strategy just for you.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Onboarding component error:', error);
    return null;
  }
}