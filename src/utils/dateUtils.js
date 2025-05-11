// utils/dateUtils.js

/**
 * Calculates age from ISO date string (e.g., "1989-04-20T00:00:00.000Z")
 * @param {string | Date} dob - Date of birth
 * @returns {number} - Age in years
 */
function calculateAge(dob) {
  const dateOfBirth = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  const dayDiff = today.getDate() - dateOfBirth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

module.exports = { calculateAge }; // For Node.js
// For React Native (ESM)
export { calculateAge };
