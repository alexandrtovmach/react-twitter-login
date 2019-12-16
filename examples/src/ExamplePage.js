import React from 'react';
import { Container, Header, Label, Icon, Segment, Select, Form, Radio } from 'semantic-ui-react';

import config from "./config";
import TwitterLogin from "../../dist";

export default class ExaplePage extends React.Component {
  constructor(props, context) {
    super(props, context);

		const { consumerKey, consumerSecret, themeOptions } = config;    
    this.state = {
      customButton: false,
      consumerKey,
      consumerSecret,
      callbackUrl: config.callbackUrl || window.location.href,
			customClassName: config.customClassName,
      buttonTheme: themeOptions[0].value
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
    const { consumerKey, consumerSecret, buttonTheme, customClassName, callbackUrl, customButton } = this.state;
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
                    placeholder={config.consumerKey}
                    value={consumerKey}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Consumer Secret</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "consumerSecret")}
                    placeholder={config.consumerSecret}
                    value={consumerSecret}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Redirect URI</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "callbackUrl")}
                    placeholder='https://example.com'
                    value={callbackUrl}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Button theme</label>
                  <Select
                    onChange={(e, data) => this.handleChange(data.value, "buttonTheme")}
                    labeled
                    label="Button theme"
                    placeholder='Select your country'
                    options={config.themeOptions}
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
                  <label>Custom button</label>
                  <Radio
                    onChange={(e, data) => this.handleChange(data.checked, "customButton")}
                    label="children={<button>My button</button>}"
                    toggle
                  />
                </Form.Field>
                <Form.Field>
                  <label>Auth callback</label>
                  <code>
                    (err, data) => console.log(err, data)
                  </code>
                </Form.Field>
              </Form>
            </Segment>
            <Segment>
              <TwitterLogin
                // debug={debug}
                consumerKey={consumerKey}
                consumerSecret={consumerSecret}
                authCallback={this.loginHandler}
                buttonTheme={buttonTheme}
                className={customClassName}
                callbackUrl={callbackUrl}
                children={customButton && <button>My button</button>}
							/>
            </Segment>
          </Container>
        </Segment>
      </div>
    );
  }
}