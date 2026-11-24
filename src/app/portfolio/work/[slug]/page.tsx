import { notFound } from "next/navigation"
import { PortfolioProjectPage } from "../../../../modules/portfolio/pages"
import { projects } from "../../../../modules/portfolio/projects"

export default async function PortfolioProjectRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!projects.some((project) => project.slug === slug)) notFound()
  return <PortfolioProjectPage slug={slug} />
}
