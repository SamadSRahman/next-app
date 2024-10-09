
// import { withPayload } from "@payloadcms/next/withPayload";
// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default withPayload(withPayload(nextConfig));


import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://localhost:5173" }, // replace with your frontend URL
          { key: "Access-Control-Allow-Origin", value: "'https://e-commerce-am.vercel.app'," }, // replace with your frontend URL
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  }
};

export default withPayload(nextConfig);
