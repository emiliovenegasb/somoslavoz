import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Cloudinary demo" },
  robots: { index: false, follow: false },
}

export default function CloudinaryDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
