import React from 'react';
import Router from 'next/router';
import { NextAuth } from 'next-auth/client';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({ force: true, req: req }),
    };
  }

  async componentDidMount() {
    // Get latest session data after rendering on client then redirect.
    // The ensures client state is always updated after signing in or out.
    await NextAuth.init({ force: true });
    Router.push('/');
  }

  render() {
    return <p>Loading…</p>;
  }
}
