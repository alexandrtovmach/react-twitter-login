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
   * Callback function which takes two arguments (error, authData)
   */
  authCallback: (error?: any, result?: any) => void;

  /**
   * DEPRECATED
   * "callbackUrl" is not supported from version 1.2.0 and higher. It's hardcoded inside the package with "window.location.href". More details: https://github.com/alexandrtovmach/react-twitter-login/issues/8
   * The redirect URI of the application, this should be same as the value in the application registration portal.
   */
  callbackUrl?: string;

  /**
   * Name of theme for button style.
   */
  buttonTheme?: TwitterLoginButtonTheme;

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

