import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Asrar Kamal | Frontend Developer",
  description: "Portfolio of Asrar Kamal, Frontend Developer at ACIM.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
