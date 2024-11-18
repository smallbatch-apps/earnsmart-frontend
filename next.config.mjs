/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            dimensions: false,
            svgProps: {
              className: "w-full h-full aspect-square object-contain",
            },
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
