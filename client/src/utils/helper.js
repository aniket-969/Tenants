import jsQR from "jsqr";
import QRCode from "qrcode";

export const generateAvatarUrls = (count) => {
    return Array.from({ length: count }, (_, index) => 
      `https://avatar.iran.liara.run/public/${index + 1}`
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