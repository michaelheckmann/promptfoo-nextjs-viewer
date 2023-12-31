import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { ExperimentProvider } from "@/lib/experiment-context"
import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <ExperimentProvider>
            <div className="relative flex flex-col min-h-screen pb-28">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
          </ExperimentProvider>
          <TailwindIndicator />
        </body>
      </html>
    </>
  )
}
