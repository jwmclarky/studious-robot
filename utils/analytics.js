// Analytics and tracking utilities
const Analytics = {
  // Track page views
  trackPageView: (page) => {
    try {
      const event = {
        type: 'page_view',
        page: page,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer
      };
      console.log('Analytics: Page View', event);
      Analytics.saveEvent(event);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  },

  // Track button clicks
  trackClick: (button, context = '') => {
    try {
      const event = {
        type: 'click',
        button: button,
        context: context,
        timestamp: new Date().toISOString()
      };
      console.log('Analytics: Click', event);
      Analytics.saveEvent(event);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  },

  // Track form submissions
  trackFormSubmission: (formType, data = {}) => {
    try {
      const event = {
        type: 'form_submission',
        form_type: formType,
        data: data,
        timestamp: new Date().toISOString()
      };
      console.log('Analytics: Form Submission', event);
      Analytics.saveEvent(event);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  },

  // Save event to database
  saveEvent: async (event) => {
    try {
      await trickleCreateObject('analytics_event', event);
    } catch (error) {
      console.error('Failed to save analytics event:', error);
    }
  }
};