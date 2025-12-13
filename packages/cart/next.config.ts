import type { NextConfig } from "next";
import NextFederationPlugin from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "cart",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Cart": "./app/components/Cart",
          "./CartItem": "./app/components/CartItem",
        },
        remotes: {
          home: "home@http://localhost:3000/_next/static/chunks/remoteEntry.js",
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
