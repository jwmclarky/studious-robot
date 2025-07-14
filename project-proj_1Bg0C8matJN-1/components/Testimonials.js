function Testimonials() {
  try {
    const [testimonials, setTestimonials] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadTestimonials();
    }, []);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [testimonials.length]);

    const loadTestimonials = async () => {
      try {
        const response = await trickleListObjects('testimonial', 20, true);
        const publishedTestimonials = response.items.filter(t => t.objectData.published);
        setTestimonials(publishedTestimonials);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    const renderStars = (rating) => {
      return Array.from({ length: 5 }, (_, i) => (
        <div 
          key={i} 
          className={`icon-star text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        ></div>
      ));
    };

    if (loading || testimonials.length === 0) {
      return null;
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white" data-name="testimonials" data-file="components/Testimonials.js">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-300">
              Don't just take our word for it - hear from the businesses we've transformed.
            </p>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src={currentTestimonial.objectData.avatar_url} 
                    alt={currentTestimonial.objectData.client_name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {renderStars(currentTestimonial.objectData.rating)}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl text-gray-100 mb-6 leading-relaxed">
                    "{currentTestimonial.objectData.testimonial_text}"
                  </blockquote>
                  
                  <div>
                    <div className="font-bold text-lg text-white">
                      {currentTestimonial.objectData.client_name}
                    </div>
                    <div className="text-gray-300">
                      {currentTestimonial.objectData.client_title} at {currentTestimonial.objectData.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-blue-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Testimonials component error:', error);
    return null;
  }
}