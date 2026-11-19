import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ThisWeekSection } from "@/components/this-week-section"
import { WelcomeSection } from "@/components/welcome-section"
import { HistorySection } from "@/components/history-section"
import { ServiceTimes } from "@/components/service-times"
import { FirstVisitSection } from "@/components/first-visit-section"
import { CommunityGallery } from "@/components/community-gallery"
import { Segmentos } from "@/components/segmentos"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("home")

export const dynamic = "force-dynamic"
import { GiveSection } from "@/components/give-section"
import { AppDownloadSection } from "@/components/app-download-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ThisWeekSection />
      <WelcomeSection />
      <HistorySection />
      <FirstVisitSection />
      <ServiceTimes />
      <CommunityGallery />
      <Segmentos />
      <GiveSection />
      <AppDownloadSection />
      <Footer />
    </main>
  )
}
