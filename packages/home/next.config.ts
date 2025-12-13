import type { NextConfig } from "next";
import NextFederationPlugin from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./ProductList": "./app/components/ProductList",
          "./ProductCard": "./app/components/ProductCard",
        },
        remotes: {
          cart: "cart@http://localhost:3001/_next/static/chunks/remoteEntry.js",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
          },
        },
        extraOptions: {},
      })
    );
    return config;
  },
};

export default nextConfig;
