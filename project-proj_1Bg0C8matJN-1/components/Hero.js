function Hero({ navigateTo }) {
  try {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 py-20 overflow-hidden" data-name="hero" data-file="components/Hero.js">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-400/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Brand Fuel for the{' '}
                  <span className="gradient-text">Next Era</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Bytegeist is a creative growth studio fusing AI, strategy, and storytelling 
                  to help bold brands scale smarter, faster, and with serious style.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary text-lg px-8 py-4">
                  Start Your Growth Journey
                </button>
                <button 
                  onClick={() => navigateTo('blog')}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Explore Insights
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">3x</div>
                  <div className="text-sm text-gray-600">Higher Conversion</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50%</div>
                  <div className="text-sm text-gray-600">Lower Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10x</div>
                  <div className="text-sm text-gray-600">Faster Growth</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=600&fit=crop" 
                  alt="AI Growth Marketing"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}