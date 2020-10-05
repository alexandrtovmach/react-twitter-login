import * as React from "react";

import { TwitterLoginProps, TwitterLoginState } from "../";
import TwitterLoginButton from "./TwitterLoginButton";
import { openWindow, observeWindow } from "./services/window";
import {
  obtainOauthRequestToken,
  obtainOauthAccessToken
} from "./services/oauth1";

export default class TwitterLoginComponent extends React.Component<
  TwitterLoginProps,
  TwitterLoginState
> {
  constructor(props: TwitterLoginProps) {
    super(props);

    this.state = {
      isCompleted: false
    };
  }

  componentDidMount() {
    this.initializeProcess();
  }

  initializeProcess = () => {
    if (window.opener) {
      const [, oauthToken, oauthVerifier] =
        window.location.search.match(
          /^(?=.*oauth_token=([^&]+)|)(?=.*oauth_verifier=([^&]+)|).+$/
        ) || [];
      window.opener.postMessage(
        {
          type: "authorized",
          data: {
            oauthToken,
            oauthVerifier
          }
        },
        window.origin
      );
    } else {
      const { authCallback, consumerKey, consumerSecret } = this.props;
      window.onmessage = async ({ data: { type, data } }: any) => {
        if (type === "authorized") {
          const accessTokenData = await obtainOauthAccessToken({
            apiUrl: "https://api.twitter.com/oauth/access_token",
            consumerKey,
            consumerSecret,
            oauthToken: data.oauthToken,
            oauthVerifier: data.oauthVerifier,
            method: "POST"
          });
          const { popup } = this.state;
          this.setState(
            {
              isCompleted: true
            },
            () => {
              authCallback && authCallback(undefined, accessTokenData);
              popup && popup.close();
            }
          );
        }
      };
    }
  };

  handleLoginClick = async () => {
    const { consumerKey, consumerSecret, callbackUrl } = this.props;
    if (callbackUrl) {
      console.warn(
        `DEPRECATED: "callbackUrl" is not supported and ignored from version 1.2.0 and higher. It's hardcoded inside the package with "window.location.href". More details: https://github.com/alexandrtovmach/react-twitter-login/issues/8`
      );
    }
    const obtainRequestTokenConfig = {
      apiUrl: "https://api.twitter.com/oauth/request_token",
      callbackUrl: window.location.href,
      consumerKey,
      consumerSecret,
      method: "POST"
    };
    const requestTokenData = await obtainOauthRequestToken(
      obtainRequestTokenConfig
    );
    if (requestTokenData.oauth_callback_confirmed === "true") {
      const popup = openWindow({
        url: `https://api.twitter.com/oauth/authorize?oauth_token=${requestTokenData.oauth_token}`,
        name: "Log in with Twitter"
      });

      if (popup) {
        observeWindow({ popup, onClose: this.handleClosingPopup });
        this.setState({
          popup
        });
      }
    } else {
      this.handleError(
        `Callback URL "${window.location.href}" is not confirmed. Please check that is whitelisted within the Twitter app settings.`
      );
    }
  };

  handleClosingPopup = () => {
    const { authCallback } = this.props;
    const { isCompleted } = this.state;
    if (!isCompleted) {
      authCallback && authCallback("User closed OAuth popup");
    }
  };

  handleError = (message: string) => {
    const { authCallback } = this.props;
    authCallback(message);
  };

  render() {
    const { buttonTheme, className, children } = this.props;

    return children ? (
      <div onClick={this.handleLoginClick} className={className}>
        {children}
      </div>
    ) : (
      <TwitterLoginButton
        buttonTheme={buttonTheme || "light"}
        buttonClassName={className}
        onClick={this.handleLoginClick}
      />
    );
  }
}
