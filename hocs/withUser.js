import React from 'react';
import fetch from 'isomorphic-unfetch';

const API = process.env.API;

function getToken({ req }) {
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

export default Component => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      let props = {};

      const token = getToken(ctx);

      console.log(token);

      const user = await getUser(token);

      console.log(user);

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
