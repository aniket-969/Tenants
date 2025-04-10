import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { QRCarousel } from "./ui/QRCarousel";
import PaymentMethod from "./ui/PaymentMethod";
import QrCodeSkeleton from "./skeleton/Room/qrCode";

export default function QRScanner() {
  const { sessionQuery } = useAuth();
  const { data, isLoading, isError } = sessionQuery;

  if (isLoading) {
    return <QrCodeSkeleton/>;
  }
  if (isError) {
    return <>Something went wrong . Please refresh</>
  }
  return (
    <div className="">
      {data?.paymentMethod?.length > 0 ? (
        <>
          {/* <PaymentMethod /> */}
          <QRCarousel paymentMethod={data?.paymentMethod} />
        </>
      ) : (
        <PaymentMethod />
      )}
    </div>
  );
}
