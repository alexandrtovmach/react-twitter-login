import { HmacSHA1, enc } from "crypto-js";

export const makeSignature = ({
  method,
  url,
  accessToken,
  consumerKey,
  consumerSecret,
  accessTokenSecret
}: {
  method: string;
  url: string;
  accessToken: string;
  consumerKey: string;
  consumerSecret: string;
  accessTokenSecret: string;
}) => {
  const params = {
    oauth_consumer_key: consumerKey,
    oauth_token: accessToken,
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
      return (prev += `&${el}="${params[el]}"`);
    }, "")
    .substr(1);

  const signatureBaseString = `${method.toUpperCase()}&${encodeURIComponent(
    url
  )}&${encodeURIComponent(paramsBaseString)}`;
  const signingKey = encodeURIComponent(
    `${consumerSecret}&${accessTokenSecret}`
  );

  const oauth_signature = enc.Base64.stringify(
    HmacSHA1(signatureBaseString, signingKey)
  );

  return `${paramsBaseString.replace(
    /&/g,
    ","
  )},oauth_signature="${encodeURIComponent(oauth_signature)}"`;
};
