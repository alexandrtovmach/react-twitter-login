import React from 'react';
import { Container, Header, Label, Icon, Segment, Select, Radio, Form } from 'semantic-ui-react';

import initialConfig from "./config";
import TwitterLogin from "../../dist";

export default class ExaplePage extends React.Component {
  constructor(props, context) {
    super(props, context);

		const { clientId, clientSecret, scope, domain } = initialConfig;    
    this.state = {
      clientId,
      clientSecret,
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
    const { clientId, clientSecret, scope, buttonTheme, debug, domain, customClassName, redirectUri } = this.state;
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
                  <label>Client ID</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "clientId")}
                    placeholder={initialConfig.clientId}
                    value={clientId}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Client Secret</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "clientSecret")}
                    placeholder={initialConfig.clientSecret}
                    value={clientSecret}
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
                <Form.Field>
                  <label>Domain</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "domain")}
                    placeholder='alexandrtovmach'
                    value={domain}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Scope</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "scope")}
                    placeholder='tm'
                    value={scope}
                  />
                </Form.Field>
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
                clientId={clientId}
                clientSecret={clientSecret}
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