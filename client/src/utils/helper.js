import jsQR from "jsqr";
import QRCode from "qrcode";

export const generateAvatarUrls = (count) => {
  return Array.from(
    { length: count },
    (_, index) => `https://avatar.iran.liara.run/public/${index + 1}`
  );
};

export const generateQRCode = async (text) => {
  try {
    const qrCodeUrl = await QRCode.toDataURL(text);
    return qrCodeUrl;
  } catch (err) {
    console.error(err);
  }
};

export function getAssignee(rotationOrder, createdAt, selectedDate, recurrencePattern = "daily", customInterval = 1) {
  if (!rotationOrder.length) return null; // No assignee if no participants

  const createdDate = new Date(createdAt);
  const targetDate = new Date(selectedDate);

  if (targetDate < createdDate) return null; // Can't assign before creation date

  let cycleLength = rotationOrder.length; // Number of people in rotation
  let index = 0;

  // Calculate how many shifts have occurred based on recurrence
  switch (recurrencePattern) {
    case "daily":
      index = Math.floor((targetDate - createdDate) / (1000 * 60 * 60 * 24)) % cycleLength;
      break;
    case "weekly":
      index = Math.floor((targetDate - createdDate) / (1000 * 60 * 60 * 24 * 7)) % cycleLength;
      break;
    case "custom":
      index = Math.floor((targetDate - createdDate) / (1000 * 60 * 60 * 24 * customInterval)) % cycleLength;
      break;
    default:
      return null; // Unsupported recurrence
  }

  return rotationOrder[index]; // Return the user whose turn it is
}

