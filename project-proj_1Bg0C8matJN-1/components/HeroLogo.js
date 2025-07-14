function HeroLogo() {
  try {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 py-12" data-name="hero-logo" data-file="components/HeroLogo.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src="https://app.trickle.so/storage/public/images/usr_12a5a9ed68000001/dd46d459-b1a7-4cdd-bb9f-b357e1f9a1e2.png" 
            alt="Bytegeist - Brand Fuel for the Next Era" 
            className="h-32 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-600">
            Brand Fuel for the Next Era
          </h1>
        </div>
      </div>
    );
  } catch (error) {
    console.error('HeroLogo component error:', error);
    return null;
  }
}