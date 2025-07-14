function Services() {
  try {
    const services = [
      {
        icon: 'trending-up',
        title: 'AI-Powered Growth',
        description: 'Strategic growth campaigns using advanced analytics and automation to maximize ROI and accelerate scaling.',
        features: ['Google Ads & Meta Optimization', 'Predictive Analytics', 'Conversion Funnel Design']
      },
      {
        icon: 'palette',
        title: 'Brand Strategy & Design',
        description: 'Conversion-focused branding that turns heads and drives results, powered by data-driven creative decisions.',
        features: ['Brand Identity Design', 'Website Development', 'Visual Strategy']
      },
      {
        icon: 'cpu',
        title: 'AI Automation',
        description: 'Intelligent workflows and automations that streamline operations while maintaining the human touch.',
        features: ['CRM Integration', 'Content Automation', 'Lead Nurturing Systems']
      }
    ];

    return (
      <section id="services" className="py-20 bg-white" data-name="services" data-file="components/Services.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Growth Without the <span className="gradient-text">Boring</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We blend cutting-edge AI with creative strategy to deliver results that don't just move metrics—they move markets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 card-hover">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6">
                  <div className={`icon-${service.icon} text-2xl text-white`}></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="icon-check text-lg text-green-500 mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="btn-primary text-lg px-8 py-4">
              Let's Build Something Bold
            </button>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Services component error:', error);
    return null;
  }
}