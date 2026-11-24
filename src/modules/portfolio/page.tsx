"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk, Code2, Layers3, Sparkles } from "lucide-react"
import styles from "./portfolio.module.css"
import { projects } from "./projects"
import { portfolioHome } from "./config"
import { contactEmail, whatsappUrl } from "./contact"
import { PortfolioAtmosphere } from "./atmosphere"

export default function PortfolioPage() {
  const [motionReady, setMotionReady] = useState(false)

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>("[data-reveal]")
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.setAttribute("data-visible", "true"))
      setMotionReady(true)
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true")
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.16, rootMargin: "0px 0px -35px 0px" })

    revealTargets.forEach((target) => observer.observe(target))
    setMotionReady(true)
    return () => observer.disconnect()
  }, [])

  return (
    <main className={styles.page} data-motion-ready={motionReady}>
      <PortfolioAtmosphere />
      <div className={styles.siteShell}>
        <header className={styles.header}>
          <a className={styles.wordmark} href="#top" aria-label="Asrar portfolio home">
            <span className={styles.wordmarkIcon}>A<span>.</span></span>
            <span><strong>ASRAR</strong><small>PORTFOLIO · 2026</small></span>
          </a>
          <nav className={styles.nav} aria-label="Portfolio navigation">
            <Link aria-current="page" href={portfolioHome}>Home</Link>
            <Link href={`${portfolioHome}/experience`}>Experience</Link>
            <Link href={`${portfolioHome}/projects`}>Projects</Link>
            <Link href={`${portfolioHome}/contact`}>Contact</Link>
          </nav>
          <Link className={styles.headerAction} href={`${portfolioHome}/contact`}>Let’s talk <ArrowUpRight size={14} /></Link>
        </header>

        <section className={styles.hero} id="top">
          <div className={styles.heroCopy}>
            <div className={styles.availability}><span /> OPEN TO THOUGHTFUL PROJECTS</div>
            <p className={styles.heroKicker}>FRONTEND DEVELOPER AT ACIM</p>
            <h1>Interfaces with purpose.<br />Built to <em>feel right.</em></h1>
            <p className={styles.heroLead}>I build modern, responsive web experiences with React, Next.js, and TypeScript, pairing thoughtful UI with reliable frontend code.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href={`${portfolioHome}/projects`}>Explore my work <ArrowRight size={16} /></Link>
              <Link className={styles.ghostButton} href={`${portfolioHome}/experience`}>View my experience <ArrowDown size={15} /></Link>
            </div>
            <div className={styles.skillLine}>
              <span><Code2 size={14} /> REACT · NEXT.JS</span><i />
              <span><Layers3 size={14} /> TYPESCRIPT</span><i />
              <span><Asterisk size={14} /> UI CRAFT</span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.visualHalo} aria-hidden="true" />
            <div className={styles.photoFrame}>
              <div className={styles.photoTopline}><span>ASRAR · FRONTEND DEVELOPER</span><Sparkles size={15} /></div>
              <div className={styles.portraitStage}>
                <Image src="/portfolio/images/asrar-portrait.png" alt="Portrait of Asrar wearing a dark suit" fill priority sizes="(max-width: 760px) 80vw, 440px" className={styles.portrait} />
              </div>
              <div className={styles.photoFoot}><span>Thoughtful by design.</span><span>01 / 02</span></div>
            </div>
            <div className={styles.floatingNote}><span className={styles.noteIcon}><Sparkles size={15} /></span><span><small>MY APPROACH</small><strong>Make it feel effortless.</strong></span></div>
            <div className={styles.glassOrb} aria-hidden="true">✳</div>
          </div>
        </section>

        <div className={styles.marquee} aria-label="Design, code, and craft">
          <span>DESIGN WITH INTENTION</span><i>✳</i><span>BUILD WITH CARE</span><i>✳</i><span>MAKE IT FEEL RIGHT</span><i>✳</i><span>DESIGN WITH INTENTION</span>
        </div>

        <section className={styles.workSection} id="work" data-reveal>
          <div className={styles.sectionHeading}>
            <div><span className={styles.sectionEyebrow}>SELECTED WORK · 2026</span><h2>Good ideas,<br /><em>made real.</em></h2></div>
            <p>A selection of frontend projects and design work, from early learning experiments to interfaces built for real product workflows.</p>
          </div>
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <article key={project.number} className={`${styles.projectCard} ${project.category === "Design" ? styles.dashboardProject : styles.hotelProject}`} data-reveal>
                <div className={`${styles.projectPreview} ${styles.projectMediaFrame}`}>
                  {project.mediaType === "video" ? (
                    <video className={styles.projectMedia} controls preload="metadata" playsInline aria-label={`${project.title} project video`}>
                      <source src={project.media} type="video/mp4" />
                      Your browser does not support embedded videos.
                    </video>
                  ) : (
                    <Image src={project.media} alt={project.imageAlt ?? project.title} fill sizes="(max-width: 760px) 90vw, 540px" className={styles.projectMedia} />
                  )}
                  <span className={styles.previewIndex}>{project.number}</span>
                </div>
                <div className={styles.projectMeta}>
                  <span className={styles.projectType}>{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.tagRow}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <Link className={styles.projectDetailsLink} href={`${portfolioHome}/projects/${project.slug}`}>Explore this project <ArrowUpRight size={14} /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.workArchiveLink}><Link className={styles.ghostButton} href={`${portfolioHome}/projects`}>Browse all projects <ArrowRight size={15} /></Link></div>
        </section>

        <section className={styles.labTeaser}>
          <div className={styles.labTeaserGlow} aria-hidden="true" />
          <div className={styles.labTeaserCopy}>
            <span className={styles.sectionEyebrow}>UNDER THE HOOD · COMPONENTS LAB</span>
            <h2>Good components<br /><em>make hard things feel easy.</em></h2>
            <p>See how reusable tables, async dropdowns, and configurable filters handle real interface patterns through short walkthroughs and hands-on demos.</p>
            <Link className={styles.primaryButton} href={`${portfolioHome}/components`}>Explore the Components Lab <ArrowRight size={15} /></Link>
          </div>
          <div className={styles.labTeaserCards} aria-hidden="true">
            <div><span>01</span><b>Advanced table</b><i className={styles.teaserTable}><em /><em /><em /></i></div>
            <div><span>02</span><b>Async dropdown</b><i className={styles.teaserDropdown}><em /><em /></i></div>
            <div><span>03</span><b>Smart filters</b><i className={styles.teaserFilters}><em /><em /><em /></i></div>
          </div>
        </section>

        <section className={styles.aboutSection} id="about">
          <div className={styles.aboutPhoto} data-reveal>
            <Image src="/portfolio/images/asrar-editorial.jpg" alt="Asrar in a black suit in an evening city setting" fill sizes="(max-width: 760px) 90vw, 480px" className={styles.editorialImage} />
            <div className={styles.imageCaption}><span>ASRAR</span><span>IN GOOD COMPANY · 2026</span></div>
          </div>
          <div className={styles.aboutCopy} data-reveal>
            <span className={styles.sectionEyebrow}>A LITTLE ABOUT ME</span>
            <h2>Curious mind.<br /><em>Careful craft.</em></h2>
            <p>I am a Frontend Developer at ACIM, focused on building modern, responsive, and user-friendly web applications. I enjoy turning product ideas and designs into clear interfaces that feel polished and intuitive.</p>
            <p>I work with React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML, CSS, Figma UI/UX, Zod, shadcn/ui, and TanStack Query. My foundation in C++ and object-oriented programming has strengthened my analytical thinking and approach to problem-solving.</p>
            <p>I value teamwork, creativity, discipline, and continuous learning. My goal is to contribute to impactful projects and create digital experiences that make a real difference for the people using them.</p>
            <div className={styles.aboutValues}><span>01 <b>React · Next.js</b></span><span>02 <b>TypeScript · JavaScript</b></span><span>03 <b>Tailwind · Figma · Zod</b></span><span>04 <b>C++ · OOP</b></span></div>
            <Link className={styles.textLink} href={`${portfolioHome}/contact`}>Let’s make something meaningful <ArrowRight size={15} /></Link>
          </div>
        </section>

        <section className={styles.contactSection} id="contact" data-reveal>
          <div className={styles.contactGlow} aria-hidden="true" />
          <span className={styles.sectionEyebrow}>LET’S WORK TOGETHER</span>
          <h2>Have a good idea?<br />Let’s build it <em>well.</em></h2>
          <p>I’m open to thoughtful collaborations and interesting frontend challenges. Tell me what you’re working on.</p>
          <div className={styles.contactActions}>
            <Link className={styles.ghostButton} href={`${portfolioHome}/contact`}>Contact options <ArrowRight size={15} /></Link>
            <a className={styles.primaryButton} href={whatsappUrl} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={15} /></a>
            <a className={styles.ghostButton} href={`mailto:${contactEmail}`}>Email me <ArrowUpRight size={15} /></a>
          </div>
        </section>

        <footer className={styles.footer}>
          <Link className={styles.wordmark} href={portfolioHome}><span className={styles.wordmarkIcon}>A<span>.</span></span><span><strong>ASRAR</strong><small>PORTFOLIO · 2026</small></span></Link>
          <span>Designed with intention. Built with curiosity.</span>
          <Link href={portfolioHome}>BACK TO PORTFOLIO ↑</Link>
        </footer>
      </div>
    </main>
  )
}
