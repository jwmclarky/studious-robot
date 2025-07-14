function OnboardingFlow({ onComplete }) {
  try {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [formData, setFormData] = React.useState({
      business_name: '',
      industry: '',
      website: '',
      team_size: '',
      monthly_revenue: '',
      main_goal: '',
      timeline: '',
      budget: '',
      contact_name: '',
      email: '',
      phone: ''
    });

    const steps = [
      {
        title: 'Tell us about your business',
        fields: ['business_name', 'industry', 'website', 'team_size']
      },
      {
        title: 'Your current situation',
        fields: ['monthly_revenue', 'main_goal']
      },
      {
        title: 'Project details',
        fields: ['timeline', 'budget']
      },
      {
        title: 'Contact information',
        fields: ['contact_name', 'email', 'phone']
      }
    ];

    const fieldLabels = {
      business_name: 'Business Name',
      industry: 'Industry',
      website: 'Current Website URL',
      team_size: 'Team Size',
      monthly_revenue: 'Monthly Revenue',
      main_goal: 'Main Goal',
      timeline: 'Project Timeline',
      budget: 'Budget Range',
      contact_name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone Number'
    };

    const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    };

    const handleSubmit = async () => {
      try {
        await trickleCreateObject('onboarding_lead', {
          ...formData,
          status: 'New',
          completed_at: new Date().toISOString()
        });
        Analytics.trackFormSubmission('onboarding_complete', formData);
        if (onComplete) onComplete(formData);
      } catch (error) {
        console.error('Error submitting onboarding:', error);
      }
    };

    const currentStepData = steps[currentStep];
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
      <div className="max-w-2xl mx-auto" data-name="onboarding-flow" data-file="components/OnboardingFlow.js">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentStepData.title}</h2>
          
          <div className="space-y-4">
            {currentStepData.fields.map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {fieldLabels[field]}
                </label>
                {field === 'industry' ? (
                  <select
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                ) : field === 'team_size' ? (
                  <select
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Team Size</option>
                    <option value="1-5">1-5 employees</option>
                    <option value="6-20">6-20 employees</option>
                    <option value="21-50">21-50 employees</option>
                    <option value="50+">50+ employees</option>
                  </select>
                ) : (
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                    placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-50"
            >
              Previous
            </button>
            <button onClick={handleNext} className="btn-primary">
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('OnboardingFlow component error:', error);
    return null;
  }
}
