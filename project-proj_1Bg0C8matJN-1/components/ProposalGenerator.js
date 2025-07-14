function ProposalGenerator() {
  try {
    const [formData, setFormData] = React.useState({
      company_name: '',
      industry: '',
      project_type: '',
      timeline: '',
      budget: '',
      challenges: '',
      goals: ''
    });
    const [proposal, setProposal] = React.useState(null);
    const [generating, setGenerating] = React.useState(false);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateProposal = async () => {
      setGenerating(true);
      try {
        const systemPrompt = `You are a professional proposal writer for Bytegeist, a creative growth studio. Create a detailed project proposal based on the client information. Include executive summary, project scope, timeline, deliverables, and investment. Format as JSON with sections: executive_summary, project_scope, timeline, deliverables, investment. Keep professional but engaging tone.`;
        
        const userPrompt = `Company: ${formData.company_name}
Industry: ${formData.industry}
Project Type: ${formData.project_type}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
Challenges: ${formData.challenges}
Goals: ${formData.goals}`;

        let response = await invokeAIAgent(systemPrompt, userPrompt);
        response = response.replaceAll('```json', '').replaceAll('```', '');
        const proposalData = JSON.parse(response);
        
        setProposal(proposalData);
        Analytics.trackFormSubmission('proposal_generated', formData);
      } catch (error) {
        console.error('Error generating proposal:', error);
        alert('Error generating proposal. Please try again.');
      } finally {
        setGenerating(false);
      }
    };

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-name="proposal-generator" data-file="components/ProposalGenerator.js">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Proposal <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-xl text-gray-600">
            Get a custom project proposal in minutes, powered by AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Project Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="company_name"
                placeholder="Company Name"
                value={formData.company_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              />
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Retail">Retail</option>
                <option value="Education">Education</option>
              </select>
              <select
                name="project_type"
                value={formData.project_type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Project Type</option>
                <option value="AI-Powered Growth">AI-Powered Growth</option>
                <option value="Brand Strategy">Brand Strategy</option>
                <option value="Website Development">Website Development</option>
                <option value="Full Growth Package">Full Growth Package</option>
              </select>
              <textarea
                name="challenges"
                placeholder="Current challenges..."
                value={formData.challenges}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              ></textarea>
              <textarea
                name="goals"
                placeholder="Project goals..."
                value={formData.goals}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:outline-none"
              ></textarea>
              <button
                onClick={generateProposal}
                disabled={generating}
                className="btn-primary w-full disabled:opacity-50"
              >
                {generating ? 'Generating...' : 'Generate Proposal'}
              </button>
            </div>
          </div>

          {proposal && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Custom Proposal</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Executive Summary</h3>
                  <p className="text-gray-700 text-sm">{proposal.executive_summary}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Project Scope</h3>
                  <p className="text-gray-700 text-sm">{proposal.project_scope}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                  <p className="text-gray-700 text-sm">{proposal.timeline}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Investment</h3>
                  <p className="text-gray-700 text-sm">{proposal.investment}</p>
                </div>
                <button className="btn-primary w-full">
                  Download Full Proposal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProposalGenerator component error:', error);
    return null;
  }
}