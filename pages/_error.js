import { Component } from 'react';

export default class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode, err: err ? err.message : '' };
  }

  render() {
    return (
      <p>
        {this.props.err}:
        {this.props.statusCode
          ? `An error ${this.props.statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  }
}
