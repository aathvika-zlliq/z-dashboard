export function isDateOlderThan5Days(storedDate) {
  const today = new Date();
  const storedDateObj = new Date(storedDate);

  // Calculate the difference in milliseconds
  const diffInMilliseconds = today - storedDateObj;
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  console.log(diffInDays);
  return diffInDays >= 5; // If the difference is greater than 5 days, return true
}
