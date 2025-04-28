const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function validateAndParseDates(startDateStr, endDateStr) {
  // Ensure valid date format (yyyy-mm-dd)
  const isValidDateFormat = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateStr);
  };

  if (!isValidDateFormat(startDateStr) || !isValidDateFormat(endDateStr)) {
    return { isValid: false, message: 'Invalid date format. Please use yyyy-mm-dd.' };
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Check if the dates are valid
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return { isValid: false, message: 'Invalid date format.' };
  }

  // Check if the end date is before the start date
  if (endDate < startDate) {
    return { isValid: false, message: 'Invalid date range: End date is before start date.' };
  }

  return { isValid: true, startDate, endDate };
}

module.exports = { delay, validateAndParseDates };
