import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AuroraGlow } from "@/components/aurora-glow"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abhishek Balasaheb Bubane | Multidisciplinary Digital Studio",
  description:
    "Data Analyst • Data Scientist • Full-Stack Developer • Salesforce Developer • UI/UX Designer • Photographer • AI/ML Enthusiast. Transforming raw data, complex business processes, and software into intelligent digital experiences.",
  keywords: [
    "Abhishek Bubane",
    "Data Analyst",
    "Data Scientist",
    "Full-Stack Developer",
    "Salesforce Developer",
    "Apex LWC",
    "UI/UX Designer",
    "Photographer",
    "AI/ML",
    "Next.js Portfolio",
    "Midnight Aurora",
  ],
  authors: [{ name: "Abhishek Balasaheb Bubane" }],
  openGraph: {
    title: "Abhishek Balasaheb Bubane | Data • AI • Code • Design • Photography",
    description:
      "All-in-one personal digital studio. Data analytics, machine learning pipelines, full-stack architecture, Salesforce CRM automation, UI/UX systems, and visual storytelling.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Balasaheb Bubane | Multidisciplinary Portfolio",
    description:
      "I turn data into intelligence and ideas into digital experiences. Data Analyst, Full-Stack & Salesforce Developer, Designer, and Photographer.",
    creator: "@AbhiBubane",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-[#070B14] text-[#F8FAFC] antialiased selection:bg-cyan-500/30 selection:text-cyan-200`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="portfolio-theme">
          <AuroraGlow />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
