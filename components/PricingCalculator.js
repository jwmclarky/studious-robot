function PricingCalculator() {
  try {
    const [selections, setSelections] = React.useState({
      services: [],
      projectSize: '',
      timeline: '',
      support: ''
    });
    const [estimatedPrice, setEstimatedPrice] = React.useState(0);

    const serviceOptions = [
      { id: 'ai-growth', name: 'AI-Powered Growth', price: 15000, description: 'Advanced analytics & automation' },
      { id: 'brand-strategy', name: 'Brand Strategy & Design', price: 12000, description: 'Complete brand transformation' },
      { id: 'ai-automation', name: 'AI Automation', price: 8000, description: 'Intelligent workflow systems' },
      { id: 'website', name: 'Website Development', price: 10000, description: 'High-converting websites' },
      { id: 'content', name: 'Content Strategy', price: 6000, description: 'AI-driven content systems' }
    ];

    const projectSizeMultipliers = {
      'small': { label: 'Small Business (1-10 employees)', multiplier: 0.7 },
      'medium': { label: 'Growing Business (11-50 employees)', multiplier: 1.0 },
      'large': { label: 'Enterprise (50+ employees)', multiplier: 1.5 }
    };

    const timelineMultipliers = {
      'rush': { label: 'Rush (1-2 months)', multiplier: 1.3 },
      'standard': { label: 'Standard (3-4 months)', multiplier: 1.0 },
      'extended': { label: 'Extended (6+ months)', multiplier: 0.9 }
    };

    const supportOptions = {
      'basic': { label: 'Basic Support', price: 0 },
      'premium': { label: 'Premium Support', price: 2000 },
      'enterprise': { label: 'Enterprise Support', price: 5000 }
    };

    React.useEffect(() => {
      calculatePrice();
    }, [selections]);

    const calculatePrice = () => {
      let basePrice = selections.services.reduce((total, serviceId) => {
        const service = serviceOptions.find(s => s.id === serviceId);
        return total + (service ? service.price : 0);
      }, 0);

      const sizeMultiplier = projectSizeMultipliers[selections.projectSize]?.multiplier || 1;
      const timeMultiplier = timelineMultipliers[selections.timeline]?.multiplier || 1;
      const supportPrice = supportOptions[selections.support]?.price || 0;

      const finalPrice = (basePrice * sizeMultiplier * timeMultiplier) + supportPrice;
      setEstimatedPrice(Math.round(finalPrice));
    };

    const handleServiceToggle = (serviceId) => {
      setSelections(prev => ({
        ...prev,
        services: prev.services.includes(serviceId)
          ? prev.services.filter(id => id !== serviceId)
          : [...prev.services, serviceId]
      }));
    };

    const handleOptionChange = (category, value) => {
      setSelections(prev => ({
        ...prev,
        [category]: value
      }));
    };

    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50" data-name="pricing-calculator" data-file="components/PricingCalculator.js">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Project <span className="gradient-text">Calculator</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get an instant estimate for your growth project. Select the services you need.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Services</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {serviceOptions.map(service => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selections.services.includes(service.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        <span className="text-blue-600 font-bold">${service.price.toLocaleString()}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Size</h3>
                <div className="space-y-2">
                  {Object.entries(projectSizeMultipliers).map(([key, option]) => (
                    <label key={key} className="flex items-center p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="projectSize"
                        value={key}
                        checked={selections.projectSize === key}
                        onChange={(e) => handleOptionChange('projectSize', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Timeline</h3>
                <div className="space-y-2">
                  {Object.entries(timelineMultipliers).map(([key, option]) => (
                    <label key={key} className="flex items-center p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="timeline"
                        value={key}
                        checked={selections.timeline === key}
                        onChange={(e) => handleOptionChange('timeline', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg h-fit sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Estimate</h3>
              
              {selections.services.length > 0 && (
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-gray-700">Selected Services:</h4>
                  {selections.services.map(serviceId => {
                    const service = serviceOptions.find(s => s.id === serviceId);
                    return (
                      <div key={serviceId} className="flex justify-between text-sm">
                        <span className="text-gray-600">{service.name}</span>
                        <span className="text-gray-900">${service.price.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="border-t pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    ${estimatedPrice.toLocaleString()}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Estimated project cost</p>
                  <button className="btn-primary w-full">
                    Get Detailed Quote
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    *Final pricing may vary based on project complexity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('PricingCalculator component error:', error);
    return null;
  }
}