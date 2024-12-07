import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { isApplePayValid, isBankTransferValid, isCashAppValid, isPayPalValid, isStripeValid, isUPIValid, isWeChatPayValid } from "../utils/validation.js";
export const validateQRCodeData = (req, res, next) => {
  const { paymentMethod } = req.body;

  paymentMethod.forEach((payment) => {
    const { type, qrCodeData } = payment;

    if (qrCodeData) {
      switch (type) {
        case "UPI":
          if (!isUPIValid(qrCodeData)) {
            return res.status(400).json({ error: "Invalid UPI QR Code" });
          }
          break;
        case "PayPal":
          if (!isPayPalValid(qrCodeData)) {
            return res.status(400).json({ error: "Invalid PayPal QR Code" });
          }
          break;
        case "Stripe":
          if (!isStripeValid(qrCodeData)) {
            return res.status(400).json({ error: "Invalid Stripe QR Code" });
          }
          break;
        case "BankTransfer":
          if (!isBankTransferValid(qrCodeData)) {
            return res
              .status(400)
              .json({ error: "Invalid Bank Transfer QR Code" });
          }
          break;
        case "ApplePay":
          if (!isApplePayValid(qrCodeData)) {
            return res.status(400).json({ error: "Invalid Apple Pay QR Code" });
          }
          break;
        case "CashApp":
          if (!isCashAppValid(qrCodeData)) {
            return res.status(400).json({ error: "Invalid Cash App QR Code" });
          }
          break;
        case "WeChatPay":
          if (!isWeChatPayValid(qrCodeData)) {
            return res
              .status(400)
              .json({ error: "Invalid WeChat Pay QR Code" });
          }
          break;
        default:
          return res.status(400).json({ error: "Unknown payment method" });
      }
    } else {
      return res.status(400).json({ error: "QR code data is missing" });
    }
  });

  next();
};
