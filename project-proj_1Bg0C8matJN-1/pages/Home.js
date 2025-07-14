function Home({ navigateTo }) {
  try {
    return (
      <main data-name="home" data-file="pages/Home.js">
        <Hero navigateTo={navigateTo} />
        <Services />
        <Testimonials />
        <CaseStudies />
        <ROICalculator />
        <PricingCalculator />
        <Resources />
        <BlogSection navigateTo={navigateTo} />
        <ContactForm />
      </main>
    );
  } catch (error) {
    console.error('Home component error:', error);
    return null;
  }
}
