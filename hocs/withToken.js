import React from 'react';

function setToken({ res, query }) {
  const cookie = require('cookie');
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', String(query.token), {
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  );
}

export const appWithToken = App => {
  return class AppWithToken extends React.Component {
    static async getInitialProps(appContext) {
      const { ctx } = appContext;
      const { query = {}, req } = ctx;

      if (req && query.token) {
        setToken(ctx);
        ctx.token = query.token;
      }

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

      const { query = {}, req } = ctx;

      if (req && query.token) {
        setToken(ctx);
        ctx.token = query.token;
      }

      if (typeof Component.getInitialProps === 'function') {
        props = await Component.getInitialProps(ctx);
      }

      return { ...props };
    }
    render() {
      return <Component {...this.props} />;
    }
  };
};
