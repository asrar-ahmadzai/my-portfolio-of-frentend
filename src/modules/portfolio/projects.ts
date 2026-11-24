export type PortfolioProject = {
  slug: string
  number: string
  type: string
  title: string
  description: string
  tags: string[]
  media: string
  mediaType: "video" | "image"
  category: "Development" | "Design"
  imageAlt?: string
}

export const projects: PortfolioProject[] = [
  {
    slug: "first-tailwind-project",
    number: "01",
    type: "FIRST PROJECT · TAILWIND CSS",
    title: "My first Tailwind project",
    description: "A learning project where I practiced building responsive page layouts and styling them with Tailwind CSS.",
    tags: ["Tailwind CSS", "Responsive UI", "Frontend"],
    media: "/portfolio/projects/tailwind-first-project.mp4",
    mediaType: "video",
    category: "Development",
  },
  {
    slug: "horror-web-experience",
    number: "02",
    type: "NEXT.JS PROJECT",
    title: "Horror web experience",
    description: "A dark, cinematic web experience built with Next.js. Watch the walkthrough to see its visual direction and interface in action.",
    tags: ["Next.js", "React", "Web experience"],
    media: "/portfolio/projects/next-horror-project.mp4",
    mediaType: "video",
    category: "Development",
  },
  {
    slug: "acim-erp-dashboard-design",
    number: "03",
    type: "FIGMA · UI/UX DESIGN",
    title: "ACIM ERP dashboard concept",
    description: "A Figma dashboard concept for reviewing applications and approvals, with status cards and visual summaries for quick scanning.",
    tags: ["Figma", "UI/UX", "Dashboard"],
    media: "/portfolio/projects/acim-erp-dashboard.png",
    mediaType: "image",
    category: "Design",
    imageAlt: "ACIM ERP applications dashboard Figma design",
  },
  {
    slug: "king-hotel-seoul",
    number: "04",
    type: "HOTEL BOOKING WEBSITE",
    title: "King Hotel, Seoul",
    description: "A hotel booking flow for choosing a King Hotel location, setting stay dates, and starting a room search.",
    tags: ["Next.js", "Booking flow", "Glass UI"],
    media: "/portfolio/projects/king-hotel-booking.mp4",
    mediaType: "video",
    category: "Development",
  },
  {
    slug: "acim-erp-entity-management",
    number: "05",
    type: "ACIM ERP · PRODUCT WALKTHROUGH",
    title: "ACIM ERP entity management",
    description: "A walkthrough of an ACIM ERP interface for browsing business entities, reviewing records, and exploring organization details.",
    tags: ["Enterprise ERP", "Entity management", "ACIM"],
    media: "/portfolio/projects/acim-erp-walkthrough.mp4",
    mediaType: "video",
    category: "Development",
  },
  {
    slug: "first-react-task-planner",
    number: "06",
    type: "FIRST REACT PROJECT · TASK PLANNER",
    title: "My first React project",
    description: "My first React practice project: a personal task planner for adding tasks and tracking progress in one place.",
    tags: ["React", "Task planner", "First project"],
    media: "/portfolio/projects/first-react-task-planner.mp4",
    mediaType: "video",
    category: "Development",
  },
]
