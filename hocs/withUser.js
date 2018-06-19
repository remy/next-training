import React from 'react';
import fetch from 'isomorphic-unfetch';

const API = process.env.API;

function getToken({ req, token }) {
  if (token) {
    return token;
  }

  if (req) {
    const cookie = require('cookie');

    if (!req.headers || !req.headers.cookie) {
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);
    return token;
  } else {
    const cookie = require('js-cookie');
    return cookie.get('token');
  }
}

async function getUser(token) {
  const res = await fetch(`${API}/user`, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  if (res.status === 200) {
    return res.json();
  }

  // throw new Error(`failed: ${res.status}`);
  return null;
}

export const appWithUser = App => {
  return class AppWithUser extends React.Component {
    static async getInitialProps(appContext) {
      const token = getToken(appContext.ctx);
      const user = await getUser(token);

      appContext.ctx.user = user;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      return {
        ...appProps,
      };
    }

    render() {
      return <App {...this.props} />;
    }
  };
};

export default Component => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      let props = {};

      const token = getToken(ctx);
      const user = await getUser(token);

      if (typeof Component.getInitialProps === 'function') {
        props = await Component.getInitialProps(ctx);
      }

      return { ...props, user };
    }
    render() {
      return <Component {...this.props} />;
    }
  };
};
