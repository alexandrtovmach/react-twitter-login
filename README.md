# React Twitter Login

[![npm](https://img.shields.io/npm/v/react-twitter-login?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/react-twitter-login)
[![npm](https://img.shields.io/npm/dt/react-twitter-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-twitter-login)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-twitter-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-twitter-login)
[![GitHub issues](https://img.shields.io/github/issues/alexandrtovmach/react-twitter-login?cacheSeconds=1800)](https://github.com/alexandrtovmach/react-twitter-login/issues)

React component for a simple OAuth login with Twitter.

[DEMO HERE](https://alexandrtovmach.github.io/react-twitter-login/)

![light border lowerc short](https://raw.github.com/alexandrtovmach/react-twitter-login/master/images/light_border_lowerc_short.svg?sanitize=true)
![light border lowerc](https://raw.github.com/alexandrtovmach/react-twitter-login/master/images/light_border_lowerc.svg?sanitize=true)
![dark border lowerc short](https://raw.github.com/alexandrtovmach/react-twitter-login/master/images/dark_border_lowerc_short.svg?sanitize=true)
![dark border lowerc](https://raw.github.com/alexandrtovmach/react-twitter-login/master/images/dark_border_lowerc.svg?sanitize=true)

### Get Started

Follow these steps to start using React Twitter Login:

1. Installation

```sh
# with npm
npm i react-twitter-login

# with yarn
yarn add react-twitter-login
```

2. Import and configure component.

```jsx
import React from "react";
import TwitterLogin from "react-twitter-login";

export default props => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return (
    <TwitterLogin
      authCallback={authHandler}
      clientId={CLIENT_ID}
      clientSecret={CLIENT_SECRET}
      domain={ORG_DOMAIN}
      redirectUri={REDIRECT_URI}
      scope={SCOPE}
    />
  );
};
```

3. Find more info about keys and OAuth apps in official docs.

### API

| Property     | Type                                                       | Default   | Description                                                     |
| ------------ | ---------------------------------------------------------- | --------- | --------------------------------------------------------------- |
| authCallback | function                                                   | required  | Callback function which takes two arguments `(error, authData)` |
| clientId     | string                                                     | required  | Client ID of your OAuth App                                     |
| clientSecret | string                                                     | required  | Client Secret of your OAuth App                                 |
| domain       | string                                                     | required  | Domain of your Twitter organization                             |
| redirectUri  | string                                                     | required  | Authorization callback URL of your OAuth App                    |
| scope        | string                                                     | required  | Scope that will be requested.                                   |
| buttonTheme  | enum: `"light"`, `"light_short"`, `"dark"`, `"dark_short"` | `"light"` | Button style theme, that based on Login Branding Guidelines     |
| className    | string                                                     | `""`      | Custom class name                                               |

### Contribution

We are happy to accept contributions to the React Twitter Login. To contribute please do the following:

1. Fork the repository on GitHub.
2. Decide which code you want to submit. Commit your changes and push to the new branch.
3. Ensure that your code adheres to standard conventions, as used in the rest of the library.
4. Submit a pull request with your patch on Github.

### Seeking Assistance

If you find any problems or would like to suggest a feature, please feel free to file an issue on Github at [Issues Page](https://github.com/alexandrtovmach/react-twitter-login/issues).

Need help working with React Twitter Login or have any questions?

### Author

- Alexandr Tovmach (alexandrtovmach@gmail.com)

### License

<pre>
Copyright © 2019 Twitter

The React Twitter Login is licensed under the MIT License.
See the LICENSE file distributed with this work for additional
information regarding copyright ownership.

Except as contained in the LICENSE file, the name(s) of the above copyright
holders shall not be used in advertising or otherwise to promote the sale,
use or other dealings in this Software without prior written authorization.
</pre>
