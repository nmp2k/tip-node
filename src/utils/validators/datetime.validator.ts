export function isValidDate(dateString) {
  const date = new Date(dateString);
  return date.toString() === "Invalid Date" ? false : true;
}
