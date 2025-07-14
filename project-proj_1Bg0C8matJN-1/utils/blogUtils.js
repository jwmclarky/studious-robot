// Blog utility functions

function formatReadingTime(content) {
  try {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  } catch (error) {
    console.error('Error calculating reading time:', error);
    return 5; // Default reading time
  }
}

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Unknown date';
  }
}

function truncateText(text, maxLength = 150) {
  try {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  } catch (error) {
    console.error('Error truncating text:', error);
    return text;
  }
}

function generateSlug(title) {
  try {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  } catch (error) {
    console.error('Error generating slug:', error);
    return 'untitled';
  }
}