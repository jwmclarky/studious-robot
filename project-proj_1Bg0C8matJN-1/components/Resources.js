function Resources() {
  try {
    const [email, setEmail] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    const resources = [
      {
        title: 'AI Growth Marketing Playbook',
        description: 'Complete guide to implementing AI-powered growth strategies',
        type: 'PDF Guide',
        icon: 'book-open',
        downloadUrl: '#'
      },
      {
        title: 'Brand Strategy Template',
        description: 'Professional brand positioning framework and worksheets',
        type: 'Template',
        icon: 'palette',
        downloadUrl: '#'
      },
      {
        title: 'Marketing Automation Checklist',
        description: '50-point checklist for optimizing your marketing workflows',
        type: 'Checklist',
        icon: 'check-square',
        downloadUrl: '#'
      }
    ];

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await trickleCreateObject('contact_lead', {
          email: email,
          message: 'Downloaded resources',
          project_type: 'Resources Download',
          status: 'New'
        });
        setSubmitted(true);
        setEmail('');
      } catch (error) {
        alert('There was an error. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <section id="resources" className="py-20 bg-gray-50" data-name="resources" data-file="components/Resources.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Free <span className="gradient-text">Resources</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download our proven templates, guides, and checklists to accelerate your growth journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg card-hover">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6">
                  <div className={`icon-${resource.icon} text-2xl text-white`}></div>
                </div>
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <button className="btn-secondary w-full">
                  Download Now
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get Instant Access
              </h3>
              <p className="text-gray-600">
                Enter your email to download all resources and get exclusive growth tips.
              </p>
            </div>

            {submitted ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-check text-2xl text-white"></div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Resources Sent!</h4>
                <p className="text-gray-600">Check your email for download links.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Get Resources'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Resources component error:', error);
    return null;
  }
}