// A/B Testing utilities
const ABTesting = {
  // Get or set user variant
  getUserVariant: (testName, variants) => {
    try {
      const storageKey = `ab_test_${testName}`;
      let variant = localStorage.getItem(storageKey);
      
      if (!variant) {
        variant = variants[Math.floor(Math.random() * variants.length)];
        localStorage.setItem(storageKey, variant);
        
        // Track assignment
        ABTesting.trackVariantAssignment(testName, variant);
      }
      
      return variant;
    } catch (error) {
      console.error('A/B Testing error:', error);
      return variants[0]; // Default to first variant
    }
  },

  // Track variant assignment
  trackVariantAssignment: async (testName, variant) => {
    try {
      const event = {
        type: 'ab_test_assignment',
        test_name: testName,
        variant: variant,
        timestamp: new Date().toISOString()
      };
      await trickleCreateObject('analytics_event', event);
    } catch (error) {
      console.error('Failed to track A/B test assignment:', error);
    }
  },

  // Track conversion for A/B test
  trackConversion: async (testName, conversionType) => {
    try {
      const storageKey = `ab_test_${testName}`;
      const variant = localStorage.getItem(storageKey);
      
      if (variant) {
        const event = {
          type: 'ab_test_conversion',
          test_name: testName,
          variant: variant,
          conversion_type: conversionType,
          timestamp: new Date().toISOString()
        };
        await trickleCreateObject('analytics_event', event);
      }
    } catch (error) {
      console.error('Failed to track A/B test conversion:', error);
    }
  }
};