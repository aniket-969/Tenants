import { generateQRCode } from "@/utils/helper";
import { useEffect, useState } from "react";

export const QRCarousel = ({ paymentMethod }) => {
  const [qrImages, setQrImages] = useState({});
  useEffect(() => {
    const generateAllQRImages = async () => {
      const images = {};
      for (const payment of paymentMethod) {
        if (payment.qrCodeData) {
          const qrImage = await generateQRCode(payment.qrCodeData);
          images[payment._id] = qrImage;
        }
      }
      setQrImages(images);
    };

    generateAllQRImages();
  }, [paymentMethod]);

  console.log(paymentMethod);
  return (
    <div className="">
      {paymentMethod.map((payment) => (
        <div key={payment._id}>
          <p>{payment.appName}</p>
          <p>{payment.paymentId}</p>
          <p>{payment.type}</p>
          {qrImages[payment._id] ? (
            <img
              src={qrImages[payment._id]}
              alt={`QR Code for ${payment.appName}`}
            />
          ) : (
            <p>Loading QR code...</p>
          )}
        </div>
      ))}
    </div>
  );
};
