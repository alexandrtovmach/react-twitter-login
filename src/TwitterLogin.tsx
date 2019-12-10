import * as React from "react";

import { TwitterLoginProps, TwitterLoginState } from "../";
import TwitterLoginButton from "./TwitterLoginButton";
import { openWindow, observeWindow } from "./services/window";
import { makeSignature } from "./services/signature";

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
      const [match, code] =
        window.location.search.match(/.*code=([^&|\n|\t\s]+)/) || [];
      window.opener.postMessage(
        {
          type: "code",
          data: code
        },
        window.origin
      );
    } else {
      const { authCallback } = this.props;
      window.onmessage = ({ data: { type, data } }: any) => {
        if (type === "code") {
          this.sendTokenRequest(data)
            .then(res => res.json())
            .then(data => {
              const { popup } = this.state;
              this.setState(
                {
                  isCompleted: true
                },
                () => {
                  authCallback && authCallback(undefined, data);
                  popup && popup.close();
                }
              );
            });
        }
      };
    }
  };

  sendTokenRequest = (code: string) => {
    const { consumerKey, consumerSecret } = this.props;
    const token = `${consumerKey}:${consumerSecret}`;
    const base64Token = btoa(token);
    return fetch("https://api.twitter.com/oauth/request_token", {
      method: "POST",
      headers: {
        "Content-Type": "oauth_callback",
        Authorization: `Basic ${base64Token}`
      },
      body: "grant_type=client_credentials"
    });
  };

  handleLoginClick = async () => {
    const {
      consumerKey,
      consumerSecret,
      accessToken,
      accessTokenSecret,
      redirectUri
    } = this.props;
    const apiUrl = "https://api.twitter.com/oauth/request_token";
    const uri = encodeURIComponent(redirectUri || window.location.href);
    const oauthSignature = makeSignature({
      method: "POST",
      url: apiUrl,
      accessToken,
      accessTokenSecret,
      consumerKey,
      consumerSecret
    });
    fetch(`https://cors-anywhere.herokuapp.com/${apiUrl}`, {
      method: "POST",
      headers: {
        Authorization: `OAuth ${oauthSignature}`
      }
    })
      .then(res => res.text())
      .then(console.log)
      .catch(console.error);
    // const popup = openWindow({
    //   url: "https://api.twitter.com/oauth2/token",
    //   name: "Log in with Twitter"
    // });

    // if (popup) {
    //   observeWindow({ popup, onClose: this.handleClosingPopup });
    //   this.setState({
    //     popup
    //   });
    // }
  };

  handleClosingPopup = () => {
    const { authCallback } = this.props;
    const { isCompleted } = this.state;
    if (!isCompleted) {
      authCallback && authCallback("User closed OAuth popup");
    }
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
