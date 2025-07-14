function ConversionPopup() {
  try {
    const [isVisible, setIsVisible] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        const hasSeenPopup = localStorage.getItem('bytegeist_popup_seen');
        if (!hasSeenPopup) {
          setIsVisible(true);
        }
      }, 30000); // Show after 30 seconds

      return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
      setIsVisible(false);
      localStorage.setItem('bytegeist_popup_seen', 'true');
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await trickleCreateObject('contact_lead', {
          email: email,
          message: 'Exit intent popup signup',
          project_type: 'Newsletter',
          status: 'New'
        });
        setSubmitted(true);
        Analytics.trackFormSubmission('exit_intent_popup', { email });
        setTimeout(() => {
          handleClose();
        }, 2000);
      } catch (error) {
        console.error('Error submitting popup form:', error);
      }
    };

    if (!isVisible) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-name="conversion-popup" data-file="components/ConversionPopup.js">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <div className="icon-x text-xl"></div>
          </button>

          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-check text-2xl text-white"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">We'll send you exclusive growth tips and insights.</p>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Wait! Don't Miss Out
              </h3>
              <p className="text-gray-600 mb-6">
                Get our free AI Growth Marketing guide and discover how to 3x your revenue in 90 days.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                />
                <button type="submit" className="btn-primary w-full">
                  Get Free Guide
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ConversionPopup component error:', error);
    return null;
  }
}