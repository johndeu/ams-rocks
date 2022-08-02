const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const webpack = require("webpack");
const path = require("path");

/**
 * @type {import('next').NextConfig}
 */

module.exports = withPlugins([[withImages]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    config.plugins.push(
      new webpack.ProvidePlugin({
        'jQuery' : 'jquery',
        '$' : 'jquery'
      })
    )
    return config;
  },
  images: {
    loader: "imgix", 
    path: "https://noop/", // See issue with 'custom' loader here - https://github.com/vercel/next.js/issues/21079
    // limit of 25 deviceSizes values
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
   // disable static imports for image files
   disableStaticImages: false,
   // minimumCacheTTL is in seconds, must be integer 0 or more
   //minimumCacheTTL: 60,
  },
});

