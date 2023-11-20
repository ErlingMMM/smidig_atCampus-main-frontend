const intercept = require("intercept-stdout");

intercept((text) => (text.includes("Duplicate atom key") ? "" : text));

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  flags: {
    DEV_SSR: false,
  },
};
