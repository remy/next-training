import React from 'react';

export default Component => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      let props = {};

      if (typeof Component.getInitialProps === 'function') {
        props = await Component.getInitialProps(ctx);
      }

      return props;
    }
    render() {
      return <Component {...this.props} />;
    }
  };
};

/**
























































const API = process.env.API;

async function getUser({ req }) {
  const res = await fetch(`${API}/user`, {
    mode: 'cors',
    credentials: 'include',
  });

  if (res.status === 200) {
    return res.json();
  }

  return null;
}

export default Component =>
  class extends React.Component {
    static async getInitialProps(ctx) {
      const { req } = ctx;

      let props = {};
      let user = false;
      let token = false;

      try {
        user = await getUser({ req });
      } catch (err) {
        console.error(err);
      }

      if (typeof Component.getInitialProps === 'function') {
        props = await Component.getInitialProps({ ...ctx, user, token });
      }

      return { user, token, ...props };
    }

    render() {
      return <Component {...this.props} />;
    }
  };
 */
