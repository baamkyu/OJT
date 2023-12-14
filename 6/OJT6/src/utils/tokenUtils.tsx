import CryptoJS from "crypto-js";

const header = {
  alg: "HS256",
  typ: "JWT",
};

const base64 = (json: any): string => {
  const stringified = JSON.stringify(json);
  const uint8Array = new TextEncoder().encode(stringified);
  const uint8ArrayAsArray = Array.from(uint8Array);
  const base64Encoded = btoa(
    String.fromCharCode.apply(null, uint8ArrayAsArray)
  );
  return base64Encoded.replace(/=/g, "");
};

const secretKey = "1235sgduagndksnt34fghds0fgnkadvoisdajvdsankr29rjsdnxcvz";

export const generateToken = (userId: string): string => {
  const payload = {
    userId,
  };
  const encodedHeader = base64(header);
  const encodedPayload = base64(JSON.stringify(payload));

  console.log(encodedPayload);

  const data = `${encodedHeader}.${encodedPayload}`;
  const key = CryptoJS.enc.Base64.parse(secretKey);

  const signature = CryptoJS.HmacSHA256(data, key)
    .toString(CryptoJS.enc.Base64)
    .replace(/=+$/, "");

  const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
  console.log("jwt", jwt);

  return jwt;
};
