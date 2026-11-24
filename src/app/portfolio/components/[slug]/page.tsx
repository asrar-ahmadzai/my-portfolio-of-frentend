import { notFound } from "next/navigation"
import { ComponentDetailPage } from "../../../../modules/portfolio/components-lab"

const componentSlugs = new Set(["advanced-table", "async-dropdown", "filters"])

export default async function ComponentWalkthroughRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!componentSlugs.has(slug)) notFound()
  return <ComponentDetailPage slug={slug} />
}
