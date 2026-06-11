import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/ministerios/:path*",
        destination: "/segmentos/:path*",
        permanent: true,
      },
      {
        source: "/segmentos/jovenes-adultos",
        destination: "/segmentos/jovenes",
        permanent: true,
      },
      {
        source: "/segmentos/ninos",
        destination: "/segmentos/kids",
        permanent: true,
      },
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
