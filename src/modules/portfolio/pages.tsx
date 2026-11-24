"use client"

import { useMemo, useState, type FormEvent, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Copy, Layers3, Mail, MessageCircle, Phone, Sparkles } from "lucide-react"
import styles from "./portfolio.module.css"
import { projects, type PortfolioProject } from "./projects"
import { contactEmail, contactPhone, facebookUrl, linkedinUrl, whatsappUrl } from "./contact"
import { portfolioHome } from "./config"
import { PortfolioAtmosphere } from "./atmosphere"

export function PortfolioFrame({ children, active }: { children: ReactNode; active: "Home" | "Experience" | "Projects" | "Contact" | "Lab" }) {
  return (
    <main className={styles.page}>
      <PortfolioAtmosphere />
      <div className={styles.siteShell}>
        <header className={styles.header}>
          <Link className={styles.wordmark} href={portfolioHome} aria-label="Asrar portfolio home">
            <span className={styles.wordmarkIcon}>A<span>.</span></span>
            <span><strong>ASRAR</strong><small>PORTFOLIO · 2026</small></span>
          </Link>
          <nav className={styles.nav} aria-label="Portfolio navigation">
            <Link aria-current={active === "Home" ? "page" : undefined} href={portfolioHome}>Home</Link>
            <Link aria-current={active === "Experience" ? "page" : undefined} href={`${portfolioHome}/experience`}>Experience</Link>
            <Link aria-current={active === "Projects" ? "page" : undefined} href={`${portfolioHome}/projects`}>Projects</Link>
            <Link aria-current={active === "Contact" ? "page" : undefined} href={`${portfolioHome}/contact`}>Contact</Link>
          </nav>
          <Link className={styles.headerAction} href={`${portfolioHome}/contact`}>Let’s talk <ArrowUpRight size={14} /></Link>
        </header>
        {children}
        <footer className={styles.footer}>
          <Link className={styles.wordmark} href={portfolioHome}><span className={styles.wordmarkIcon}>A<span>.</span></span><span><strong>ASRAR</strong><small>PORTFOLIO · 2026</small></span></Link>
          <span>Designed with care. Built with curiosity.</span>
          <Link href={portfolioHome}>BACK TO PORTFOLIO</Link>
        </footer>
      </div>
    </main>
  )
}

function ProjectMedia({ project, detail = false }: { project: PortfolioProject; detail?: boolean }) {
  return (
    <div className={`${styles.projectPreview} ${styles.projectMediaFrame} ${detail ? styles.detailMediaFrame : ""}`}>
      {project.mediaType === "video" ? (
        <video className={styles.projectMedia} controls preload="metadata" playsInline aria-label={`${project.title} project video`}>
          <source src={project.media} type="video/mp4" />
          Your browser does not support embedded videos.
        </video>
      ) : (
        <Image src={project.media} alt={project.imageAlt ?? project.title} fill sizes="(max-width: 760px) 92vw, 760px" className={styles.projectMedia} />
      )}
      {!detail && <span className={styles.previewIndex}>{project.number}</span>}
    </div>
  )
}

export function PortfolioWorkPage() {
  const [filter, setFilter] = useState<"All" | "Development" | "Design">("All")
  const filteredProjects = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter])

  return (
    <PortfolioFrame active="Projects">
      <section className={styles.subpage}>
        <div className={styles.subpageHero}>
          <span className={styles.sectionEyebrow}>SELECTED WORK · PROJECT ARCHIVE</span>
          <h1>Built to be<br /><em>experienced.</em></h1>
          <p>Explore projects from my frontend journey: early experiments, product walkthroughs, and design concepts. I’ll add more as I build and learn.</p>
          <Link className={styles.ghostButton} href={portfolioHome}><ArrowLeft size={15} /> Back to home</Link>
        </div>
        <div className={styles.filterBar} role="group" aria-label="Filter projects">
          {(["All", "Development", "Design"] as const).map((option) => (
            <button key={option} className={filter === option ? styles.filterActive : styles.filterButton} type="button" aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</button>
          ))}
          <span>{filteredProjects.length} projects</span>
        </div>
        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <article key={project.slug} className={`${styles.projectCard} ${project.category === "Design" ? styles.dashboardProject : styles.hotelProject}`}>
              <ProjectMedia project={project} />
              <div className={styles.projectMeta}>
                <span className={styles.projectType}>{project.type}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className={styles.tagRow}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link className={styles.projectDetailsLink} href={`${portfolioHome}/projects/${project.slug}`}>Open project <ArrowUpRight size={14} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PortfolioFrame>
  )
}

type SkillMark = "react" | "next" | "typescript" | "javascript" | "tailwind" | "html" | "css" | "figma" | "zod" | "cpp" | "oop" | "problem" | "data-structures" | "shadcn" | "tanstack-query"

function SkillLogo({ mark }: { mark: SkillMark }) {
  const base = { viewBox: "0 0 32 32", className: styles.skillLogo, "aria-hidden": true as const }

  switch (mark) {
    case "react":
      return <svg {...base} fill="none" stroke="#61dafb" strokeWidth="1.6"><ellipse cx="16" cy="16" rx="14" ry="5.3" /><ellipse cx="16" cy="16" rx="14" ry="5.3" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="14" ry="5.3" transform="rotate(120 16 16)" /><circle cx="16" cy="16" r="2.1" fill="#61dafb" stroke="none" /></svg>
    case "next":
      return <svg {...base} fill="none" stroke="#f8fafc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3"><path d="M6 25V7l20 18V7" /><path d="M20 7h6v6" opacity=".65" /></svg>
    case "typescript":
      return <svg {...base}><path fill="#3178c6" d="M3 4h26v24H3z" /><text x="7" y="21" fill="#fff" fontSize="11" fontWeight="700">TS</text></svg>
    case "javascript":
      return <svg {...base}><path fill="#f7df1e" d="M3 4h26v24H3z" /><text x="7" y="21" fill="#242424" fontSize="11" fontWeight="700">JS</text></svg>
    case "tailwind":
      return <svg {...base} fill="none" stroke="#38bdf8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8"><path d="M4 12c2.2-4 5.3-6 9.4-6 6.2 0 6.8 4.6 10 4.6 1.8 0 3.2-.9 4.6-2.6-2.2 4-5.3 6-9.4 6-6.2 0-6.8-4.6-10-4.6-1.8 0-3.2.9-4.6 2.6Z" /><path d="M4 23c2.2-4 5.3-6 9.4-6 6.2 0 6.8 4.6 10 4.6 1.8 0 3.2-.9 4.6-2.6" /></svg>
    case "html":
      return <svg {...base}><path fill="#e44d26" d="m5 3 2 23 9 3 9-3 2-23z" /><path fill="#f16529" d="M16 5v22l7-2 1.7-20z" /><path fill="#fff" d="M9 8h14l-.3 3H12l.3 3h10.1l-.8 8-5.6 1.7-5.6-1.7-.3-3.2h3l.2 1 2.7.7 2.7-.7.3-3.1h-9z" /></svg>
    case "css":
      return <svg {...base}><path fill="#1572b6" d="m5 3 2 23 9 3 9-3 2-23z" /><path fill="#33a9dc" d="M16 5v22l7-2 1.7-20z" /><path fill="#fff" d="M9 8h14l-.3 3H12l.2 2h10.2l-.8 9-5.6 1.7-5.6-1.7-.3-3.2h3l.2 1 2.7.7 2.7-.7.3-3.1h-9z" /></svg>
    case "figma":
      return <svg {...base}><path fill="#f24e1e" d="M10 3h6v9h-6a4.5 4.5 0 1 1 0-9Z" /><path fill="#ff7262" d="M16 3h6a4.5 4.5 0 1 1 0 9h-6z" /><path fill="#a259ff" d="M10 12h6v9h-6a4.5 4.5 0 1 1 0-9Z" /><circle cx="20.5" cy="16.5" r="4.5" fill="#1abcfe" /><path fill="#0acf83" d="M10 21h6v4.5a4.5 4.5 0 1 1-6-4.2Z" /></svg>
    case "zod":
      return <svg {...base} fill="none" stroke="#b6c6e3" strokeLinejoin="round" strokeWidth="2"><path d="M6 5h20v5L11 22h15v5H6v-5L21 10H6z" /><path d="M6 5h20" stroke="#8ee8f0" /></svg>
    case "cpp":
      return <svg {...base} fill="none" stroke="#659ad2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M24 7.5a12 12 0 1 0 0 17" /><path d="M8.5 13h5M11 10.5v5M20 17h7M23.5 13.5v7" /></svg>
    case "oop":
      return <svg {...base} fill="none" stroke="#a9b7d0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3"><path d="M12 7H9a2 2 0 0 0-2 2v4a3 3 0 0 1-3 3 3 3 0 0 1 3 3v4a2 2 0 0 0 2 2h3M20 7h3a2 2 0 0 1 2 2v4a3 3 0 0 0 3 3 3 3 0 0 0-3 3v4a2 2 0 0 1-2 2h-3" /></svg>
    case "problem":
      return <svg {...base} fill="none" stroke="#f0c674" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="14" cy="14" r="9" /><circle cx="14" cy="14" r="4" /><path d="m20.5 20.5 6 6M14 1v3M27 14h3" /></svg>
    case "data-structures":
      return <svg {...base} fill="none" stroke="#8ee8c1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M9 7h13M9 16h7M9 25h13M6 7h.01M22 16h.01M6 25h.01" /><circle cx="6" cy="7" r="2.5" /><circle cx="22" cy="16" r="2.5" /><circle cx="6" cy="25" r="2.5" /></svg>
    case "shadcn":
      return <svg {...base} fill="none" stroke="#f3f5fa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"><rect x="4.5" y="4.5" width="23" height="23" rx="5" /><path d="m11 21 10-10M15 25l10-10" /><path d="M8 8h.01" stroke="#8ee8f0" strokeWidth="3" /></svg>
    case "tanstack-query":
      return <svg {...base} fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9 16 4l10 5-10 5z" stroke="#f59e0b" strokeWidth="2" /><path d="m6 15 10 5 10-5M6 21l10 5 10-5" stroke="#fbbf24" strokeWidth="2" /><circle cx="24" cy="8" r="5" fill="#172033" stroke="#f8fafc" strokeWidth="1.5" /><path d="m27.5 11.5 2 2" stroke="#f8fafc" strokeWidth="1.7" /></svg>
  }
}

export function PortfolioAboutPage() {
  const [activeStep, setActiveStep] = useState(0)
  const skillGroups: { number: string; title: string; skills: { name: string; mark: SkillMark }[] }[] = [
    { number: "01", title: "Frontend development", skills: [{ name: "React.js", mark: "react" }, { name: "Next.js", mark: "next" }, { name: "TypeScript", mark: "typescript" }, { name: "JavaScript", mark: "javascript" }] },
    { number: "02", title: "UI and developer tools", skills: [{ name: "Tailwind CSS", mark: "tailwind" }, { name: "shadcn/ui", mark: "shadcn" }, { name: "HTML", mark: "html" }, { name: "CSS", mark: "css" }, { name: "Figma UI/UX", mark: "figma" }, { name: "Zod", mark: "zod" }] },
    { number: "03", title: "Data and foundations", skills: [{ name: "TanStack Query", mark: "tanstack-query" }, { name: "Data Structures", mark: "data-structures" }, { name: "C++", mark: "cpp" }, { name: "Object-Oriented Programming", mark: "oop" }, { name: "Problem solving", mark: "problem" }] },
  ]
  const workflow = [
    { title: "Understand", label: "Start with the why", icon: Compass, description: "Get clear on the goal, the people using the product, and the problem the interface needs to solve.", tags: ["Listen", "Explore", "Define"] },
    { title: "Shape", label: "Give ideas a form", icon: Layers3, description: "Turn the direction into considered layouts, reusable pieces, and a responsive visual system.", tags: ["Structure", "Design", "Build"] },
    { title: "Refine", label: "Make every detail count", icon: Sparkles, description: "Polish the interactions, check the experience across screen sizes, and keep improving the small details.", tags: ["Test", "Polish", "Improve"] },
  ]
  const activeWorkflow = workflow[activeStep]
  const WorkflowIcon = activeWorkflow.icon

  return (
    <PortfolioFrame active="Experience">
      <section className={styles.subpage}>
        <div className={styles.aboutPageHero}>
          <div className={styles.aboutPageCopy}>
            <span className={styles.sectionEyebrow}>A LITTLE ABOUT ME</span>
            <h1>Curious mind.<br /><em>Careful craft.</em></h1>
            <p>I’m Asrar, a Frontend Developer at ACIM. I build responsive web interfaces with a focus on clarity, usability, and detail.</p>
            <p>I enjoy turning product ideas into practical experiences, learning new tools, and working with people who care about the craft. My C++ and object-oriented programming foundation shaped the analytical way I approach problems.</p>
            <div className={styles.subpageActions}>
              <Link className={styles.primaryButton} href={`${portfolioHome}/projects`}>Explore my work <ArrowRight size={15} /></Link>
              <Link className={styles.ghostButton} href={`${portfolioHome}/contact`}>Start a conversation <Mail size={15} /></Link>
            </div>
          </div>
        </div>
        <section className={styles.skillsSection}>
          <div className={styles.skillsIntro}>
            <div>
              <span className={styles.sectionEyebrow}>MY TOOLKIT · 15 SKILLS</span>
              <h2>The tools behind<br /><em>the experience.</em></h2>
            </div>
            <p className={styles.skillsLead}>From responsive interfaces to data-driven experiences, these tools and foundations help me build clear, dependable products.</p>
          </div>
          <div className={styles.skillGroups}>
            {skillGroups.map((group) => (
              <article key={group.title} className={styles.skillGroup}>
                <div className={styles.skillGroupHeading}><span>{group.number}</span><i /><h3>{group.title}</h3></div>
                <div className={styles.skillList}>{group.skills.map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <SkillLogo mark={skill.mark} />
                    <span>{skill.name}</span>
                  </div>
                ))}</div>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.processSection} aria-labelledby="process-title">
          <div className={styles.processHeading}>
            <span className={styles.sectionEyebrow}>A THOUGHTFUL WAY OF WORKING</span>
            <h2 id="process-title">From first thought<br /><em>to finished detail.</em></h2>
            <p>My process keeps the goal in view while making room for careful design and useful details.</p>
          </div>
          <div className={styles.processInterface}>
            <div className={styles.processTabs} role="tablist" aria-label="My project process">
              {workflow.map((step, index) => (
                <button key={step.title} className={activeStep === index ? styles.processTabActive : styles.processTab} type="button" role="tab" id={`process-tab-${index}`} aria-selected={activeStep === index} aria-controls="process-panel" onClick={() => setActiveStep(index)}>
                  <span className={styles.processTabNumber}>0{index + 1}</span><span>{step.title}</span><ArrowRight size={15} />
                </button>
              ))}
            </div>
            <div className={styles.processProgress} data-step={activeStep} aria-hidden="true"><span /></div>
            <div className={styles.processPanel} key={activeStep} id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${activeStep}`}>
              <div className={styles.processIcon}><WorkflowIcon size={22} /></div>
              <span className={styles.processPanelLabel}>STEP 0{activeStep + 1} · {activeWorkflow.label}</span>
              <h3>{activeWorkflow.title}</h3>
              <p>{activeWorkflow.description}</p>
              <div className={styles.processTags}>{activeWorkflow.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </div>
        </section>
        <div className={styles.quotePanel}><Sparkles size={18} /><p>“My goal is to contribute to impactful projects, create meaningful digital experiences, and keep growing as a developer.”</p></div>
        <aside className={styles.portraitFeature}>
          <div className={styles.portraitFeatureImage}>
            <Image src="/portfolio/images/asrar-thoughtful-professional.png" alt="Asrar in a thoughtful pose wearing a navy suit" fill sizes="(max-width: 760px) 75vw, 260px" />
          </div>
          <div><span className={styles.sectionEyebrow}>ALWAYS LEARNING</span><h2>Good work starts<br /><em>with curiosity.</em></h2><p>I keep exploring new technologies and applying what I learn to useful, real-world interfaces.</p></div>
        </aside>
      </section>
    </PortfolioFrame>
  )
}

function ContactComposer() {
  const [status, setStatus] = useState("")
  const [manualMessage, setManualMessage] = useState("")

  async function copyMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = [
      `Hello Asrar, my name is ${formData.get("name")}.`,
      `You can reach me at ${formData.get("email")}.`,
      "",
      String(formData.get("message")),
    ].join("\n")

    try {
      await navigator.clipboard.writeText(message)
      setManualMessage("")
      setStatus("Your message is ready. Paste it into your email or chat app when you’re ready to send it.")
    } catch {
      setManualMessage(message)
      setStatus("Clipboard access is unavailable here. Please select and copy your prepared message below.")
    }
  }

  return (
    <form className={styles.contactForm} onSubmit={copyMessage}>
      <label>Name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
      <label>What would you like to build?<textarea name="message" required rows={5} placeholder="Share a little about the project or opportunity..." /></label>
      <button className={styles.primaryButton} type="submit"><Copy size={15} /> Prepare message</button>
      <p className={styles.formStatus} aria-live="polite">{status || "Your message stays in this browser. Nothing is sent or stored by this form."}</p>
      {manualMessage && <textarea className={styles.manualCopy} aria-label="Prepared message to copy" readOnly value={manualMessage} onFocus={(event) => event.currentTarget.select()} />}
    </form>
  )
}

function FacebookMark() {
  return <svg width="18" height="18" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="#1877f2" /><path fill="#fff" d="M18.2 27V17.4h3.2l.5-3.8h-3.7v-2.4c0-1.1.3-1.8 1.9-1.8H22V6c-.8-.1-1.8-.2-3.1-.2-3.1 0-5.2 1.9-5.2 5.4v2.4h-3.3v3.8h3.3V27z" /></svg>
}

function LinkedInMark() {
  return <svg width="18" height="18" viewBox="0 0 32 32" aria-hidden="true"><rect x="1" y="1" width="30" height="30" rx="6" fill="#0a66c2" /><path fill="#fff" d="M7 12h3.7v13H7zm1.9-6A2.1 2.1 0 1 1 8.8 10a2.1 2.1 0 0 1 .1-4m4.2 6h3.5v1.8h.1a3.9 3.9 0 0 1 3.5-2c3.8 0 4.5 2.5 4.5 5.7V25H21v-4.9c0-1.2 0-2.9-1.8-2.9s-2.1 1.3-2.1 2.8V25h-3.7z" /></svg>
}

export function PortfolioContactPage() {
  return (
    <PortfolioFrame active="Contact">
      <section className={`${styles.subpage} ${styles.contactPage}`}>
        <div className={styles.contactPageIntro}>
          <span className={styles.sectionEyebrow}>LET’S WORK TOGETHER</span>
          <h1>Let’s build something<br /><em>meaningful.</em></h1>
          <p>Tell me about a project, an opportunity, or an idea you’d like to bring to life. You can prepare a message here and copy it when you’re ready.</p>
          <div className={styles.contactNote}><Mail size={17} /><span>I welcome thoughtful collaborations, frontend opportunities, and interesting product challenges.</span></div>
          <div className={styles.contactMethods}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>WhatsApp<strong>0773 265 564</strong></span><ArrowUpRight size={15} /></a>
            <a href={`tel:${contactPhone}`}><Phone size={18} /><span>Call me<strong>+93 773 265 564</strong></span><ArrowUpRight size={15} /></a>
            <a href={`mailto:${contactEmail}`}><Mail size={18} /><span>Email<strong>{contactEmail}</strong></span><ArrowUpRight size={15} /></a>
            <a href={facebookUrl} target="_blank" rel="noreferrer"><FacebookMark /><span>Facebook<strong>Visit my page</strong></span><ArrowUpRight size={15} /></a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer"><LinkedInMark /><span>LinkedIn<strong>View my profile</strong></span><ArrowUpRight size={15} /></a>
          </div>
        </div>
        <ContactComposer />
      </section>
    </PortfolioFrame>
  )
}

export function PortfolioProjectPage({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug)
  if (!project) return null

  return (
    <PortfolioFrame active="Projects">
      <article className={styles.subpage}>
        <div className={styles.projectDetailHead}>
          <Link className={styles.ghostButton} href={`${portfolioHome}/projects`}><ArrowLeft size={15} /> All projects</Link>
          <span className={styles.sectionEyebrow}>{project.type}</span>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
        <ProjectMedia project={project} detail />
        <div className={styles.projectDetailBottom}>
          <div><span className={styles.sectionEyebrow}>TOOLS & THEMES</span><div className={styles.tagRow}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          <div className={styles.subpageActions}>
            <Link className={styles.ghostButton} href={`${portfolioHome}/projects`}><ArrowLeft size={15} /> More projects</Link>
          <Link className={styles.primaryButton} href={`${portfolioHome}/contact`}>Discuss a project <ArrowRight size={15} /></Link>
          </div>
        </div>
      </article>
    </PortfolioFrame>
  )
}
