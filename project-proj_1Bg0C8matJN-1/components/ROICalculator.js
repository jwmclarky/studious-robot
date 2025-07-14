function ROICalculator() {
  try {
    const [inputs, setInputs] = React.useState({
      monthlyRevenue: '',
      conversionRate: '',
      averageOrderValue: '',
      monthlyTraffic: '',
      marketingBudget: ''
    });
    const [results, setResults] = React.useState(null);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputs(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const calculateROI = () => {
      const revenue = parseFloat(inputs.monthlyRevenue) || 0;
      const conversion = parseFloat(inputs.conversionRate) || 0;
      const aov = parseFloat(inputs.averageOrderValue) || 0;
      const traffic = parseFloat(inputs.monthlyTraffic) || 0;
      const budget = parseFloat(inputs.marketingBudget) || 0;

      // Calculate potential improvements with Bytegeist
      const improvedConversion = conversion * 1.5; // 50% improvement
      const improvedTraffic = traffic * 1.3; // 30% improvement
      const newRevenue = (improvedTraffic * (improvedConversion / 100) * aov);
      const revenueIncrease = newRevenue - revenue;
      const roi = budget > 0 ? ((revenueIncrease * 12) / budget) * 100 : 0;

      setResults({
        currentRevenue: revenue,
        projectedRevenue: newRevenue,
        revenueIncrease: revenueIncrease,
        annualIncrease: revenueIncrease * 12,
        roi: roi
      });

      Analytics.trackFormSubmission('roi_calculator', inputs);
    };

    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50" data-name="roi-calculator" data-file="components/ROICalculator.js">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              ROI <span className="gradient-text">Calculator</span>
            </h2>
            <p className="text-xl text-gray-600">
              See how much revenue Bytegeist could generate for your business.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Your Current Metrics</h3>
              <div className="space-y-4">
                <input
                  type="number"
                  name="monthlyRevenue"
                  placeholder="Monthly Revenue ($)"
                  value={inputs.monthlyRevenue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="number"
                  name="conversionRate"
                  placeholder="Conversion Rate (%)"
                  value={inputs.conversionRate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="number"
                  name="averageOrderValue"
                  placeholder="Average Order Value ($)"
                  value={inputs.averageOrderValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="number"
                  name="monthlyTraffic"
                  placeholder="Monthly Website Traffic"
                  value={inputs.monthlyTraffic}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="number"
                  name="marketingBudget"
                  placeholder="Annual Marketing Budget ($)"
                  value={inputs.marketingBudget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={calculateROI}
                  className="btn-primary w-full"
                >
                  Calculate ROI
                </button>
              </div>
            </div>

            {results && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Your Potential Results</h3>
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-green-600 font-medium">Monthly Revenue Increase</div>
                    <div className="text-2xl font-bold text-green-700">
                      +${results.revenueIncrease.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-600 font-medium">Annual Revenue Increase</div>
                    <div className="text-2xl font-bold text-blue-700">
                      +${results.annualIncrease.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-sm text-purple-600 font-medium">ROI</div>
                    <div className="text-2xl font-bold text-purple-700">
                      {results.roi.toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    *Based on typical improvements: 50% conversion increase, 30% traffic growth
                  </div>
                  <button className="btn-primary w-full">
                    Get Your Custom Strategy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('ROICalculator component error:', error);
    return null;
  }
}