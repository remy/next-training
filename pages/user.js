import React from 'react';
import { NextAuth } from 'next-auth/client';
import Layout from '../components/Layout';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({ req }),
    };
  }

  render() {
    if (this.props.session.user) {
      return (
        <Layout>
          <p>
            You are logged in as{' '}
            {this.props.session.user.name || this.props.session.user.email}.
          </p>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <p>You are not logged in.</p>
        </Layout>
      );
    }
  }
}
