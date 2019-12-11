import { HmacSHA1, enc } from "crypto-js";

export const makeSignature = ({
  method,
  url,
  consumerKey,
  consumerSecret
}: {
  method: string;
  url: string;
  consumerKey: string;
  consumerSecret: string;
}) => {
  const params = {
    oauth_consumer_key: consumerKey,
    oauth_version: "1.0",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: (Date.now() / 1000).toFixed(),
    oauth_nonce: Math.random()
      .toString(36)
      .replace(/[^a-z]/, "")
      .substr(2)
  };

  const paramsBaseString = Object.keys(params)
    .sort()
    .reduce((prev: string, el: keyof typeof params) => {
      return (prev += `&${el}=${params[el]}`);
    }, "")
    .substr(1);

  const signatureBaseString = `${method.toUpperCase()}&${encodeURIComponent(
    url
  )}&${encodeURIComponent(paramsBaseString)}`;

  const signingKey = `${encodeURIComponent(consumerSecret)}&`;

  const oauth_signature = enc.Base64.stringify(
    HmacSHA1(signatureBaseString, signingKey)
  );

  const paramsWithSignature = {
    ...params,
    oauth_signature: encodeURIComponent(oauth_signature)
  };

  return Object.keys(paramsWithSignature)
    .sort()
    .reduce((prev: string, el: keyof typeof params) => {
      return (prev += `,${el}="${paramsWithSignature[el]}"`);
    }, "")
    .substr(1);
};
