/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static site: `next build` writes plain HTML/CSS/JS to ./out.
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
