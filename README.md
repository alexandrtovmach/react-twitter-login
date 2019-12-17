# react-twitter-login

[![npm](https://img.shields.io/npm/v/react-twitter-login?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/react-twitter-login)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-twitter-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-twitter-login)
[![npm](https://img.shields.io/npm/dt/react-twitter-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-twitter-login)

React component for a simple OAuth login with Twitter.

[DEMO HERE](https://alexandrtovmach.github.io/react-twitter-login/)

![image](https://user-images.githubusercontent.com/28801003/70518342-dc895280-1b42-11ea-905a-eed1bdf63694.png)

## 🚀 Get Started

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
         consumerKey={CONSUMER_KEY}
         consumerSecret={CONSUMER_SECRET}
         callbackUrl={CALLBACK_URL}
       />
     );
   };
   ```
   Or add custom style
   
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
         consumerKey={CONSUMER_KEY}
         consumerSecret={CONSUMER_SECRET}
         callbackUrl={CALLBACK_URL}
       >
         <p>Login With Twitter</p>
       </TwitterLogin>
     );
   };
   ```

3. Find more info about keys and Twitter developer apps in [official docs](https://developer.twitter.com/en/docs/basics/apps/overview).

## 📖 API

| Property       | Type                                                       | Default   | Description                                                                                                            |
| -------------- | ---------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| authCallback   | function                                                   | required  | Callback function which takes two arguments `(error, authData)`                                                        |
| consumerKey    | string                                                     | required  | Consumer API Key of your Twitter developer app (not Access Token)                                                      |
| consumerSecret | string                                                     | required  | Consumer API Secret of your Twitter developer app (not Access Token Secret)                                            |
| callbackUrl    | string                                                     | required  | Whitelisted [callback URL](https://developer.twitter.com/en/docs/basics/apps/guides/callback-urls) of your Twitter app |
| buttonTheme    | enum(`"light"`, `"light_short"`, `"dark"`, `"dark_short"`) | `"light"` | Button style theme, that based on [Twitter Brand Design](https://about.twitter.com/en_us/company/brand-resources.html) |
| className      | string                                                     | `""`      | Custom class name                                                                                                      |
| children       | React.Component                                            | `""`      | Provide any component as a "children" prop to use custom button                                                        |

## 📝 License

[MIT](https://github.com/alexandrtovmach/react-twitter-login/blob/master/LICENSE)
