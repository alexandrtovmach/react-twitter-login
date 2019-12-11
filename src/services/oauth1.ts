import { requestTokenSignature, accessTokenSignature } from "./signature";

interface RequestTokenResponse {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed?: string;
}

const parseOAuthRequestToken = (responseText: string) =>
  responseText.split("&").reduce((prev, el) => {
    const [key, value] = el.split("=");
    return { ...prev, [key]: value };
  }, {} as RequestTokenResponse);

export const obtainOauthRequestToken = async ({
  consumerKey,
  consumerSecret,
  callbackUrl,
  method,
  apiUrl
}: {
  method: string;
  apiUrl: string;
  callbackUrl: string;
  consumerKey: string;
  consumerSecret: string;
}) => {
  const oauthSignature = requestTokenSignature({
    method,
    apiUrl,
    callbackUrl,
    consumerKey,
    consumerSecret
  });
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${apiUrl}`, {
    method,
    headers: {
      Authorization: `OAuth ${oauthSignature}`
    }
  });
  const responseText = await res.text();
  return parseOAuthRequestToken(responseText);
};

export const obtainOauthAccessToken = async ({
  consumerKey,
  consumerSecret,
  oauthToken,
  oauthVerifier,
  method,
  apiUrl
}: {
  method: string;
  apiUrl: string;
  consumerKey: string;
  consumerSecret: string;
  oauthToken: string;
  oauthVerifier: string;
}) => {
  const oauthSignature = accessTokenSignature({
    method,
    apiUrl,
    consumerKey,
    consumerSecret,
    oauthToken,
    oauthVerifier
  });
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${apiUrl}`, {
    method,
    headers: {
      Authorization: `OAuth ${oauthSignature}`
    }
  });
  const responseText = await res.text();
  return parseOAuthRequestToken(responseText);
};
