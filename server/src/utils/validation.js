const isUPIValid = (data) => /^upi:\/\/pay\?/.test(data);
const isPayPalValid = (data) => /https:\/\/www\.paypal\.com\//.test(data);
const isStripeValid = (data) => /https:\/\/checkout\.stripe\.com\//.test(data);
const isBankTransferValid = (data) => /^[A-Z0-9]+$/.test(data);  // Just an example, refine as needed
const isApplePayValid = (data) => /applepay\.com|apple\.com/.test(data);
const isCashAppValid = (data) => /^cash\.app\/\$.+/.test(data) || /^https:\/\/cash\.me\/\$.+/.test(data);
const isWeChatPayValid = (data) => /weixin:\/\/|https:\/\/pay\.wechat\.com/.test(data);

export{isUPIValid,isApplePayValid,isBankTransferValid,isWeChatPayValid,isPayPalValid,isStripeValid,isCashAppValid}