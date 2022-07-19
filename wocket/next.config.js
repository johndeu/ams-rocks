const webpack = require("webpack");
const path = require("path");

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    publicRuntimeConfig: {
      // Will be available on both server and client
      staticFolder: '/static',
    },
    devIndicators: {
      buildActivityPosition: 'bottom-right',
    },
  }
  return nextConfig
}