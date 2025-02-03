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

export const getCurrentAssignee = (task, currentDate) => {
  const { rotationOrder, dueDate, currentAssignee } = task;

  const dateDiff = Math.floor(
    (currentDate - new Date(dueDate)) / (1000 * 60 * 60 * 24)
  );

  const currentIndex = rotationOrder.findIndex(
    (user) => user.toString() === currentAssignee.toString()
  );

  const assigneeIndex = (currentIndex + dateDiff) % rotationOrder.length;

  return rotationOrder[assigneeIndex];
};
