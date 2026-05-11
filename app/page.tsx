import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { WelcomeSection } from "@/components/welcome-section"
import { HistorySection } from "@/components/history-section"
import { ServiceTimes } from "@/components/service-times"
import { Ministries } from "@/components/ministries"
import { WatchSection } from "@/components/watch-section"
import { getRecentMessageCards } from "@/lib/site"

/** Lee miniaturas y textos desde `.env` en cada carga (no solo al hacer build). */
export const dynamic = "force-dynamic"
import { GiveSection } from "@/components/give-section"
import { AppDownloadSection } from "@/components/app-download-section"
import { Footer } from "@/components/footer"
import { HomeScrollRestore } from "@/components/home-scroll-restore"

export default function Home() {
  const recentMessages = getRecentMessageCards()

  return (
    <main className="min-h-screen">
      <HomeScrollRestore />
      <Header />
      <Hero />
      <WelcomeSection />
      <HistorySection />
      <ServiceTimes />
      <Ministries />
      <WatchSection messages={recentMessages} />
      <GiveSection />
      <AppDownloadSection />
      <Footer />
    </main>
  )
}
