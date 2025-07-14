function StrategyAssessment({ onComplete }) {
  try {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [answers, setAnswers] = React.useState({});
    const [completed, setCompleted] = React.useState(false);

    const questions = [
      {
        id: 'business_stage',
        question: 'What stage is your business in?',
        options: [
          { value: 'startup', label: 'Startup (0-1 years)' },
          { value: 'growth', label: 'Growth stage (1-5 years)' },
          { value: 'established', label: 'Established (5+ years)' }
        ]
      },
      {
        id: 'monthly_revenue',
        question: 'What is your current monthly revenue?',
        options: [
          { value: 'under_10k', label: 'Under $10k' },
          { value: '10k_50k', label: '$10k - $50k' },
          { value: '50k_100k', label: '$50k - $100k' },
          { value: 'over_100k', label: 'Over $100k' }
        ]
      },
      {
        id: 'marketing_channels',
        question: 'Which marketing channels do you currently use?',
        options: [
          { value: 'social_media', label: 'Social Media' },
          { value: 'google_ads', label: 'Google Ads' },
          { value: 'content_marketing', label: 'Content Marketing' },
          { value: 'email_marketing', label: 'Email Marketing' },
          { value: 'none', label: 'None/Very limited' }
        ]
      },
      {
        id: 'biggest_challenge',
        question: 'What is your biggest marketing challenge?',
        options: [
          { value: 'lead_generation', label: 'Generating quality leads' },
          { value: 'conversion', label: 'Converting leads to customers' },
          { value: 'brand_awareness', label: 'Building brand awareness' },
          { value: 'scaling', label: 'Scaling marketing efforts' }
        ]
      }
    ];

    const handleAnswer = (value) => {
      const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCompleted(true);
        Analytics.trackFormSubmission('strategy_assessment', newAnswers);
        if (onComplete) onComplete(newAnswers);
      }
    };

    const getRecommendation = () => {
      const revenue = answers.monthly_revenue;
      const stage = answers.business_stage;
      
      if (revenue === 'under_10k' || stage === 'startup') {
        return {
          title: 'Foundation Package',
          description: 'Perfect for startups ready to establish their market presence',
          price: '$5k - $15k',
          features: ['Brand Strategy', 'Website Development', 'Basic AI Automation']
        };
      } else if (revenue === '10k_50k' || stage === 'growth') {
        return {
          title: 'Growth Accelerator',
          description: 'Ideal for scaling businesses ready to dominate their market',
          price: '$15k - $50k',
          features: ['AI-Powered Growth Campaigns', 'Advanced Analytics', 'Conversion Optimization']
        };
      } else {
        return {
          title: 'Enterprise Solution',
          description: 'Comprehensive growth system for established businesses',
          price: '$50k+',
          features: ['Full AI Integration', 'Custom Automation', 'Dedicated Growth Team']
        };
      }
    };

    if (completed) {
      const recommendation = getRecommendation();
      return (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="icon-check text-2xl text-white"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Assessment Complete!</h3>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-bold text-blue-900 mb-2">{recommendation.title}</h4>
            <p className="text-blue-700 mb-3">{recommendation.description}</p>
            <div className="text-2xl font-bold text-blue-600 mb-4">{recommendation.price}</div>
            <ul className="text-left space-y-1">
              {recommendation.features.map((feature, index) => (
                <li key={index} className="flex items-center text-blue-700">
                  <div className="icon-check text-green-500 mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button className="btn-primary">
            Get Your Custom Strategy
          </button>
        </div>
      );
    }

    const question = questions[currentQuestion];

    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-8">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('StrategyAssessment component error:', error);
    return null;
  }
}