import * as React from "react";

import { TwitterLoginProps, TwitterLoginState } from "../";
import TwitterLoginButton from "./TwitterLoginButton";
import { openWindow, observeWindow } from "./services/window";

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

  buildCodeRequestURL = () => {
    const { clientId, redirectUri, scope, domain } = this.props;
    const uri = encodeURIComponent(redirectUri || window.location.href);
    return `https://api.twitter.com/oauth2/token`;
  };

  sendTokenRequest = (code: string) => {
    const {
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri,
      domain
    } = this.props;
    const redirect_uri = redirectUri || window.location.href;
    return fetch(
      `https://cors-anywhere.herokuapp.com/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          redirect_uri,
          grant_type: "authorization_code",
          domain,
          code
        })
      }
    );
  };

  handleLoginClick = () => {
    const popup = openWindow({
      url: this.buildCodeRequestURL(),
      name: "Log in with Twitter"
    });

    if (popup) {
      observeWindow({ popup, onClose: this.handleClosingPopup });
      this.setState({
        popup
      });
    }
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
