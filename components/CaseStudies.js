function CaseStudies() {
  try {
    const [caseStudies, setCaseStudies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadCaseStudies();
    }, []);

    const loadCaseStudies = async () => {
      try {
        const response = await trickleListObjects('case_study', 10, true);
        const publishedCases = response.items.filter(study => study.objectData.published);
        setCaseStudies(publishedCases);
      } catch (error) {
        console.error('Error loading case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <section className="py-20 bg-white" data-name="case-studies" data-file="components/CaseStudies.js">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">Loading success stories...</div>
          </div>
        </section>
      );
    }

    return (
      <section className="py-20 bg-white" data-name="case-studies" data-file="components/CaseStudies.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real clients. See how we've transformed businesses across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div key={study.objectId} className="bg-gray-50 rounded-2xl overflow-hidden card-hover">
                <img 
                  src={study.objectData.featured_image} 
                  alt={study.objectData.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                      {study.objectData.industry}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {study.objectData.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {study.objectData.challenge}
                  </p>
                  <div className="space-y-2">
                    {JSON.parse(study.objectData.metrics).slice(0, 2).map((metric, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="icon-trending-up text-green-500 mr-2"></div>
                        <span className="text-gray-700">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('CaseStudies component error:', error);
    return null;
  }
}