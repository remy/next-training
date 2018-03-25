require('@remy/envy');
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(['SHOW_SPEAKER']));

    return config;
  },
});
