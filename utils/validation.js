// Validation helper functions

const validateOrder = (orderData) => {
  const errors = [];
  
  // Check required fields
  if (!orderData.name || orderData.name.trim() === '') {
    errors.push('Name is required');
  }
  
  if (!orderData.phone || orderData.phone.trim() === '') {
    errors.push('Phone is required');
  }
  
  if (!orderData.lessonIDs || !Array.isArray(orderData.lessonIDs) || orderData.lessonIDs.length === 0) {
    errors.push('At least one lesson must be selected');
  }
  
  if (!orderData.numSpaces || !Array.isArray(orderData.numSpaces) || orderData.numSpaces.length === 0) {
    errors.push('Number of spaces must be specified');
  }
  
  // Check arrays have same length
  if (orderData.lessonIDs && orderData.numSpaces && 
      orderData.lessonIDs.length !== orderData.numSpaces.length) {
    errors.push('lessonIDs and numSpaces must have the same length');
  }
  
  // Validate phone format (digits only)
  if (orderData.phone && !/^\d+$/.test(orderData.phone)) {
    errors.push('Phone must contain only digits');
  }
  
  // Validate name format (letters and spaces only)
  if (orderData.name && !/^[a-zA-Z\s]+$/.test(orderData.name)) {
    errors.push('Name must contain only letters and spaces');
  }
  
  // Check all numSpaces are positive integers
  if (orderData.numSpaces && Array.isArray(orderData.numSpaces)) {
    const invalidSpaces = orderData.numSpaces.some(num => !Number.isInteger(num) || num <= 0);
    if (invalidSpaces) {
      errors.push('All space values must be positive integers');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateLessonUpdate = (updateData) => {
  const errors = [];
  
  // Validate spaces if provided
  if ('spaces' in updateData) {
    if (!Number.isInteger(updateData.spaces) || updateData.spaces < 0) {
      errors.push('Spaces must be a non-negative integer');
    }
  }
  
  // Validate price if provided
  if ('price' in updateData) {
    if (typeof updateData.price !== 'number' || updateData.price < 0) {
      errors.push('Price must be a non-negative number');
    }
  }
  
  // Validate subject if provided
  if ('subject' in updateData && typeof updateData.subject !== 'string') {
    errors.push('Subject must be a string');
  }
  
  // Validate location if provided
  if ('location' in updateData && typeof updateData.location !== 'string') {
    errors.push('Location must be a string');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateOrder,
  validateLessonUpdate
};
