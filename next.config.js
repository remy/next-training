require('@remy/envy');
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssModules: false,
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(['SHOW_SPEAKER']));

    return config;
  },
});
