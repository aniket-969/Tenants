import { generateQRCode } from "@/utils/helper";
import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent  } from "./card";
  

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

  // console.log(paymentMethod);
  return (
    <Carousel className="w-full max-w-sm">
    <CarouselContent>
      {paymentMethod.map((payment, index) => (
        <CarouselItem key={payment._id}>
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <p className="text-xl font-semibold mb-2">{payment.appName}</p>
                {/* <p className="text-sm text-gray-500 mb-2">{payment.paymentId}</p> */}
                <p className="text-sm text-gray-500 mb-2">{payment.type}</p>
                {qrImages[payment._id] ? (
                  <img
                    src={qrImages[payment._id]}
                    alt={`QR Code for ${payment.appName}`}
                    className="w- object-contain"
                  />
                ) : (
                  <p>Loading QR code...</p>
                )}
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  );
};
