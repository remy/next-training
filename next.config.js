require('@remy/envy');
const webpack = require('webpack');

module.exports = {
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(['SHOW_SPEAKER']));

    return config;
  },
};
