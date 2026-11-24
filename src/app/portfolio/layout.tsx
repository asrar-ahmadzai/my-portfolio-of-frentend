import type { Metadata } from "next"
import { PortfolioExperience } from "../../modules/portfolio/experience"

export const metadata: Metadata = {
  title: "Asrar Kamal | Frontend Developer",
  description: "Portfolio of Asrar Kamal, Frontend Developer at ACIM.",
}

export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PortfolioExperience>{children}</PortfolioExperience>
}
