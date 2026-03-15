import type { NextConfig } from "next";
import { version } from "./package.json";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
  compiler: {
    removeConsole: isProd
      ? {
          exclude: ["error"],
        }
      : false,
  },
};

export default nextConfig;
