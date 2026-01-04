/**
 * Generate a unique ID for new items
 * @param {string} type - 'unit' or 'org'
 * @returns {string} Unique ID
 */
export const generateId = (type) => {
  return `${type}-custom-${Date.now()}`;
};

/**
 * Format date for display
 * @param {string|null} dateString - ISO date string or null
 * @returns {string} Formatted date or empty string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get current date in ISO format (YYYY-MM-DD)
 * @returns {string} Current date
 */
export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Check if an item is custom (user-created)
 * @param {string} id - Item ID
 * @returns {boolean} True if custom item
 */
export const isCustomItem = (id) => {
  return id.includes('-custom-');
};

/**
 * Filter items based on search query and filters
 * @param {Array} data - Array of items to filter
 * @param {Object} filters - Filter criteria
 * @param {string} mode - 'users' or 'buyers'
 * @returns {Array} Filtered items
 */
export const filterData = (data, filters, mode) => {
  const { status, service, category, search } = filters;

  return data.filter(item => {
    const matchesStatus = status === 'all' || item.status === status;
    const matchesService = service === 'all' || item.service === service;
    const matchesCategory = mode === 'users' || category === 'all' || item.category === category;

    const searchFields = mode === 'users'
      ? [item.name, item.location, item.componentType, item.mission]
      : [item.name, item.organization, item.category, item.description];

    const matchesSearch = !search ||
      searchFields.some(f => f && f.toLowerCase().includes(search.toLowerCase()));

    return matchesStatus && matchesService && matchesCategory && matchesSearch;
  });
};

/**
 * Group items by service
 * @param {Array} items - Array of items to group
 * @returns {Object} Items grouped by service
 */
export const groupByService = (items) => {
  const groups = {};
  items.forEach(item => {
    const key = item.service;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
};

/**
 * Calculate engagement statistics
 * @param {Array} data - Array of items
 * @returns {Object} Statistics object
 */
export const calculateStats = (data) => {
  const total = data.length;
  const engaged = data.filter(d => ['engaged', 'deployed', 'contract'].includes(d.status)).length;
  const pipeline = data.filter(d => d.status === 'contacted').length;
  const notEngaged = data.filter(d => d.status === 'not-engaged').length;
  const onIce = data.filter(d => d.status === 'on-ice').length;

  return { total, engaged, pipeline, notEngaged, onIce };
};
