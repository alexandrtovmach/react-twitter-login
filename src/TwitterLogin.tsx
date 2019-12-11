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
    const url = callbackUrl || window.location.href;
    const {
      oauth_callback_confirmed,
      oauth_token
    } = await obtainOauthRequestToken({
      apiUrl: "https://api.twitter.com/oauth/request_token",
      callbackUrl: url,
      consumerKey,
      consumerSecret,
      method: "POST"
    });
    if (oauth_callback_confirmed === "true") {
      const popup = openWindow({
        url: `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`,
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
        `Callback URL "${url}" is not confirmed. Please check that is whitelisted within the Twitter app settings.`
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
    const { buttonTheme, className } = this.props;

    return (
      <>
        <TwitterLoginButton
          buttonTheme={buttonTheme || "light"}
          buttonClassName={className}
          onClick={this.handleLoginClick}
        />
      </>
    );
  }
}
