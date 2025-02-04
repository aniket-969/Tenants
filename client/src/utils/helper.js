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

export function getAssignee(
  rotationOrder,
  createdAt,
  selectedDate,
  recurrencePattern = "daily"
) {
  if (!rotationOrder.length) return null; 

  const createdDate = new Date(createdAt);
  const targetDate = new Date(selectedDate);

  if (targetDate < createdDate) return null; 

  let cycleLength = rotationOrder.length; 
  let index = 0;

  switch (recurrencePattern) {
    case "daily":
      index =
        Math.floor((targetDate - createdDate) / (1000 * 60 * 60 * 24)) %
        cycleLength;
      break;
    case "weekly":
      index =
        Math.floor((targetDate - createdDate) / (1000 * 60 * 60 * 24 * 7)) %
        cycleLength;
      break;
    default:
      return null; 
  }

  return rotationOrder[index]; 
}
