export default function generateNumber() {
  const timestamp = Date.now(); // Get current timestamp (13 digits)
  const randomDigits = Math.floor(Math.random() * 90 + 10); // Generate 2 random digits
  return `${timestamp}${randomDigits}`; // Combine timestamp and random digits
}
