import jsQR from "jsqr";
import QRCode from "qrcode";
import { useState } from "react";

const generateQRCode = async (text) => {
  try {
    const qrCodeUrl = await QRCode.toDataURL(text);
    return qrCodeUrl;
  } catch (err) {
    console.error(err);
  }
};

export default function QRScanner() {
  const [imgs, setImg] = useState("");
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = async () => {
      // Set canvas dimensions to the image size
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image on the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Extract image data
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      // Use jsQR to decode the QR code
      const qrCodeData = jsQR(
        imageData.data,
        imageData.width,
        imageData.height
      );

      if (qrCodeData) {
        console.log("QR Code Data:", qrCodeData.data);
        alert(`QR Code Data: ${qrCodeData.data}`);

        // Generate a QR code with the decoded data
        const res = await generateQRCode(qrCodeData.data);
        console.log(res);
        setImg(res);
      } else {
        alert("No QR code found in the image.");
      }
    };
  };

  return (
    <div>
      <h1>Upload QR Code Image</h1>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {imgs && <img src={imgs} alt="Generated QR Code" />}
    </div>
  );
}
