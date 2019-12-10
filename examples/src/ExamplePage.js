import React from 'react';
import { Container, Header, Label, Icon, Segment, Select, Radio, Form } from 'semantic-ui-react';

import initialConfig from "./config";
import TwitterLogin from "../../dist";

export default class ExaplePage extends React.Component {
  constructor(props, context) {
    super(props, context);

		const { consumerKey, consumerSecret, accessToken, accessTokenSecret, scope, domain } = initialConfig;    
    this.state = {
      consumerKey,
      consumerSecret,
      accessToken,
      accessTokenSecret,
      redirectUri: window.location.href,
			scope,
			domain,
			customClassName: "my-custom-class",
      buttonTheme: "dark",
      withUserData: true,
      customButton: false,
      forceRedirectStrategy: false,
      debug: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  
  handleChange(value, type) {
    this.setState({
      [type]: value
    });
  }

  loginHandler(err, data) {
    console.log(err, data);
  };

  render() {
    const { consumerKey, consumerSecret, scope, buttonTheme, accessToken, accessTokenSecret, domain, customClassName, redirectUri } = this.state;
    return (
      <div className="viewport">
        <Segment basic>
          <Container text>
            <Header as='h2'>
              react-twitter-login
              <Label basic size="mini" as='a' href="https://github.com/alexandrtovmach/react-twitter-login">
                <Icon name='github' />GitHub
              </Label>
              <Label basic size="mini" as='a' href="https://www.npmjs.com/package/react-twitter-login">
                <Icon name='npm' />NPM
              </Label>
            </Header>
            
            <p>
              React component for easy login to Twitter services using OAuth technology without backend.
            </p>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Consumer Key</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "consumerKey")}
                    placeholder={initialConfig.consumerKey}
                    value={consumerKey}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Consumer Secret</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "consumerSecret")}
                    placeholder={initialConfig.consumerSecret}
                    value={consumerSecret}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Accesss Token</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "accessToken")}
                    placeholder={initialConfig.accessToken}
                    value={accessToken}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Accesss Token Secret</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "accessTokenSecret")}
                    placeholder={initialConfig.accessTokenSecret}
                    value={accessTokenSecret}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Redirect URI</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "redirectUri")}
                    placeholder='https://example.com'
                    value={redirectUri}
                  />
                </Form.Field>
                {/* <Form.Field>
                  <label>Domain</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "domain")}
                    placeholder='alexandrtovmach'
                    value={domain}
                  />
                </Form.Field> */}
                {/* <Form.Field>
                  <label>Scope</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "scope")}
                    placeholder='tm'
                    value={scope}
                  />
                </Form.Field> */}
                <Form.Field>
                  <label>Button theme</label>
                  <Select
                    onChange={(e, data) => this.handleChange(data.value, "buttonTheme")}
                    labeled
                    label="Button theme"
                    placeholder='Select your country'
                    options={initialConfig.themeOptions}
                    defaultValue={buttonTheme}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Class name</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "customClassName")}
                    placeholder='my-custom-class'
                    value={customClassName}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Auth callback</label>
                  <code>
                    {`(err, data) => console.log(err, data)`}
                  </code>
                </Form.Field>
                {/* <Form.Field>
                  <Radio
                    onChange={(e, data) => this.handleChange(data.checked, "debug")}
                    label="Debug"
                    defaultChecked={debug}
                    toggle
                  />
                </Form.Field> */}
              </Form>
            </Segment>
            <Segment>
              <TwitterLogin
                // debug={debug}
                consumerKey={consumerKey}
                consumerSecret={consumerSecret}
                accessToken={accessToken}
                accessTokenSecret={accessTokenSecret}
                domain={domain}
                authCallback={this.loginHandler}
                buttonTheme={buttonTheme}
                className={customClassName}
                redirectUri={redirectUri}
                scope={scope}
							/>
            </Segment>
          </Container>
        </Segment>
      </div>
    );
  }
}