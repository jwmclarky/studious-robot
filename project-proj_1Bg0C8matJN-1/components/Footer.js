function Footer() {
  try {
    return (
      <footer id="contact" className="bg-gray-900 text-white py-16" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://app.trickle.so/storage/public/images/usr_12a5a9ed68000001/c77da622-25c0-40db-9a69-0e69b356be86.png" 
                  alt="Bytegeist Logo" 
                  className="h-10 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Brand fuel for the next era. Creative growth studio specializing in AI-driven strategy & storytelling.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">AI-Powered Growth</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Brand Strategy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Design & Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketing Automation</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Get Started</h3>
              <p className="text-gray-400 mb-4">Ready to scale smarter?</p>
              <button className="btn-primary w-full">
                Let's Talk Growth
              </button>
              <div className="flex space-x-4 mt-6">
                <a href="https://x.com/Trickle_HQ" className="text-gray-400 hover:text-white transition-colors">
                  <div className="icon-twitter text-xl"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="icon-linkedin text-xl"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="icon-instagram text-xl"></div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bytegeist. All rights reserved. Based in Sydney, working globally.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}