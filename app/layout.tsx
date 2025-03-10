import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sauna Directory - Find the Best Sauna Near Me",
  description: "Discover top-rated saunas across Canada. From traditional Finnish saunas to modern spa experiences.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 