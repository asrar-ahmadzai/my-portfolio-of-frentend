import type { CSSProperties } from "react"
import styles from "./portfolio.module.css"

export function PortfolioAtmosphere() {
  return (
    <>
      <video className={styles.videoBackdrop} autoPlay muted loop playsInline preload="metadata" poster="/portfolio/images/asrar-editorial.jpg" aria-hidden="true" tabIndex={-1}>
        <source src="/portfolio/background/live-wallpaper.mp4" type="video/mp4" />
      </video>
      <div className={styles.videoTint} aria-hidden="true" />
      <div className={styles.ambient} aria-hidden="true"><i /><i /><i /></div>
      <div className={styles.fallingAtmosphere} aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <i
            key={index}
            style={{
              left: `${(index * 37 + 8) % 98}%`,
              animationDuration: `${12 + (index % 8) * 1.5}s`,
              animationDelay: `${-((index * 7) % 20)}s`,
              "--drift": `${index % 2 ? 24 : -24}px`,
            } as CSSProperties}
          />
        ))}
      </div>
    </>
  )
}
