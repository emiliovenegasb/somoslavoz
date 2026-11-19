import { churchJsonLd } from "@/lib/seo"

export function ChurchJsonLd() {
  const json = JSON.stringify(churchJsonLd()).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
