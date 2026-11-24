"use client"

import { useEffect, useState, type ReactNode } from "react"
import styles from "./portfolio.module.css"

export function PortfolioExperience({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const closeDelay = reducedMotion ? 100 : 2050
    const finishDelay = reducedMotion ? 100 : 480
    const closeTimeout = window.setTimeout(() => setLeaving(true), closeDelay)
    const finishTimeout = window.setTimeout(() => setLoading(false), closeDelay + finishDelay)
    return () => {
      window.clearTimeout(closeTimeout)
      window.clearTimeout(finishTimeout)
    }
  }, [])

  return (
    <>
      {loading && (
        <div className={styles.loadingScreen} data-leaving={leaving} role="status" aria-live="polite">
          <div className={styles.loadingGlass}>
            <div className={styles.loadingVideoFrame}>
              <video autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
                <source src="/portfolio/background/opening-loader.mp4" type="video/mp4" />
              </video>
            </div>
            <h1 className={styles.loadingName}>ASRAR <span>KAMAL</span></h1>
            <p className={styles.loadingRole}>FRONTEND DEVELOPER <i>/</i> ACIM</p>
            <div className={styles.loadingTrack}><span /></div>
            <small className={styles.loadingCaption}>A portfolio made with curiosity</small>
          </div>
        </div>
      )}
      {children}
    </>
  )
}
