import * as React from "react";

type TwitterLoginButtonTheme = "dark_short" | "light_short" | "dark" | "light";

interface TwitterLoginProps {
  /**
   * Consumer API key
   */
  consumerKey: string;

  /**
   * Consumer API secret key
   */
  consumerSecret: string;

/**
   * Access key
   */
  accessToken: string;

  /**
   * Access secret key
   */
  accessTokenSecret: string;

  /**
   * Callback function which takes two arguments (error, authData)
   */
  authCallback: (error?: any, result?: any) => void;

  /**
   * Select the access your app requires from the list of scopes available
   */
  scope: string;

  /**
   * Organization domain name
   */
  domain: string;

  /**
   * The redirect URI of the application, this should be same as the value in the application registration portal.
   */
  redirectUri: string;

  /**
   * Name of theme for button style.
   */
  buttonTheme?: TwitterLoginButtonTheme;

  /**
   * Enable detailed logs of authorization process.
   */
  debug?: boolean;

  /**
   * Additional class name string.
   */
  className?: string;
}


interface TwitterLoginState {
  isCompleted: boolean;
  popup?: Window;
}

declare class TwitterLogin extends React.Component<
  TwitterLoginProps,
  TwitterLoginState
> {}

export { TwitterLogin, TwitterLoginProps, TwitterLoginState, TwitterLoginButtonTheme };

export default TwitterLogin;

