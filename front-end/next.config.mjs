const nextConfig = {
  async headers() {
    return [
      { source: "/.well-known/apple-app-site-association", headers: [{ key: "Content-Type", value: "application/json" }] },
      { source: "/family/invite/:token", headers: [
        { key: "Referrer-Policy", value: "no-referrer" },
        { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        { key: "Cache-Control", value: "private, no-store" },
      ] },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL || "http://127.0.0.1:4000"}/api/:path*`,
      },
    ];
  },
};
export default nextConfig;


// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: `${process.env.BACKEND_URL || "http://127.0.0.1:4000"}/api/:path*`,
//       },
//     ];
//   },
// };
// export default nextConfig;
