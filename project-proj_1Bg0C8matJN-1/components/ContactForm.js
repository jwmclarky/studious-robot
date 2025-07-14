function ContactForm() {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      company: '',
      phone: '',
      project_type: '',
      budget: '',
      message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await trickleCreateObject('contact_lead', {
          ...formData,
          status: 'New'
        });
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          project_type: '',
          budget: '',
          message: ''
        });
      } catch (error) {
        alert('There was an error submitting your form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    if (submitted) {
      return (
        <section className="py-20 bg-gray-900 text-white" data-name="contact-form" data-file="components/ContactForm.js">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="icon-check text-2xl text-white"></div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-xl text-gray-300 mb-8">
              We've received your message and will get back to you within 24 hours.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="btn-primary"
            >
              Send Another Message
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="py-20 bg-gray-900 text-white" data-name="contact-form" data-file="components/ContactForm.js">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">
              Ready to <span className="gradient-text">Scale Smarter</span>?
            </h2>
            <p className="text-xl text-gray-300">
              Let's discuss how we can accelerate your growth with AI-powered strategies.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <select
                name="project_type"
                value={formData.project_type}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Project Type</option>
                <option value="AI-Powered Growth">AI-Powered Growth</option>
                <option value="Brand Strategy & Design">Brand Strategy & Design</option>
                <option value="AI Automation">AI Automation</option>
                <option value="Full Growth Package">Full Growth Package</option>
                <option value="Consultation">Consultation</option>
              </select>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Budget Range</option>
                <option value="$5k - $15k">$5k - $15k</option>
                <option value="$15k - $50k">$15k - $50k</option>
                <option value="$50k - $100k">$50k - $100k</option>
                <option value="$100k+">$100k+</option>
                <option value="Let's discuss">Let's discuss</option>
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Tell us about your project and goals..."
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
            ></textarea>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary text-lg px-8 py-4 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Start Your Growth Journey'}
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  } catch (error) {
    console.error('ContactForm component error:', error);
    return null;
  }
}