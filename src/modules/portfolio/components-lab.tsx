"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Filter, Layers3, ListFilter, Pause, Play, RotateCcw, Search, Sparkles, Table2 } from "lucide-react"
import styles from "./portfolio.module.css"
import { PortfolioFrame } from "./pages"
import { portfolioHome } from "./config"

type LabSlug = "advanced-table" | "async-dropdown" | "filters"
type LabItem = {
  slug: LabSlug
  number: string
  title: string
  short: string
  description: string
  source: string
  icon: typeof Table2
  steps: string[]
  features: string[]
  note: string
}

const labItems: LabItem[] = [
  {
    slug: "advanced-table",
    number: "01",
    title: "Advanced data table",
    short: "Search, sort, select, and paginate records with a configurable table.",
    description: "The shared AdvancedTable uses TanStack Table to handle debounced search, sorting, column visibility, row selection, loading states, and client- or server-side pagination.",
    source: "src/components/custom/hr-advanced-table.tsx",
    icon: Table2,
    steps: ["Browse membership records", "Search by name or plan", "Sort and select rows", "Move between pages"],
    features: ["Debounced search", "Sortable columns", "Show or hide columns", "Row selection", "Server-side pagination", "Loading and empty states"],
    note: "This walkthrough uses fictional sample membership records. It demonstrates the reusable table controls; it does not connect to live membership data.",
  },
  {
    slug: "async-dropdown",
    number: "02",
    title: "Async dropdown",
    short: "Search large option lists with cached results and scroll-to-load pagination.",
    description: "AsyncDropdown searches as you type, waits briefly before requesting results, caches queries with React Query, and loads another page as you scroll.",
    source: "src/components/custom/async-dropdown.tsx",
    icon: ChevronDown,
    steps: ["Open the selector", "Type a search", "Load matching options", "Choose a result"],
    features: ["Debounced remote search", "Infinite pagination", "React Query caching", "Selected-label lookup", "Disabled options", "Custom empty states"],
    note: "The live demo uses a local list and a short loading delay to show the interaction without calling an API.",
  },
  {
    slug: "filters",
    number: "03",
    title: "Configurable filters",
    short: "Compose filter panels from field definitions and keep related values in sync.",
    description: "AdvanceFilter builds its controls from field definitions. It supports search, select, multi-select, async select, date and date-range, month, number, and switch fields.",
    source: "src/components/filters/advance-filter.tsx · use-filters.ts",
    icon: ListFilter,
    steps: ["Choose a membership status", "Combine a plan filter", "See matching records", "Clear the filters"],
    features: ["Field-configured controls", "Search and selects", "Async and multi-select", "Date and date ranges", "Dependent filter clearing", "One-step reset"],
    note: "This demo shows local status and plan filters. The shared component also supports date and async filter fields.",
  },
]

type Member = { id: number; name: string; email: string; plan: string; status: "Active" | "Pending" | "Expired"; renewal: string }

const sampleMembers: Member[] = [
  { id: 1, name: "Amina Rahimi", email: "amina@example.test", plan: "Gold", status: "Active", renewal: "Nov 28, 2026" },
  { id: 2, name: "Farid Noori", email: "farid@example.test", plan: "Silver", status: "Pending", renewal: "Dec 04, 2026" },
  { id: 3, name: "Laila Ahmad", email: "laila@example.test", plan: "Platinum", status: "Active", renewal: "Dec 12, 2026" },
  { id: 4, name: "Omar Safi", email: "omar@example.test", plan: "Gold", status: "Expired", renewal: "Oct 30, 2026" },
  { id: 5, name: "Mina Wali", email: "mina@example.test", plan: "Silver", status: "Active", renewal: "Dec 18, 2026" },
  { id: 6, name: "Samir Azizi", email: "samir@example.test", plan: "Platinum", status: "Pending", renewal: "Dec 22, 2026" },
  { id: 7, name: "Nadia Karim", email: "nadia@example.test", plan: "Gold", status: "Active", renewal: "Jan 05, 2027" },
]

function WalkthroughPlayer({ item }: { item: LabItem }) {
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(false)
  const lastFrame = item.steps.length - 1

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      if (frame >= lastFrame) setPlaying(false)
      else setFrame(frame + 1)
    }, 1450)
    return () => window.clearTimeout(timer)
  }, [frame, lastFrame, playing])

  function play() {
    if (frame === lastFrame) setFrame(0)
    setPlaying(true)
  }

  const Icon = item.icon

  return (
    <div className={styles.walkthroughPlayer}>
      <div className={styles.walkthroughTopline}><span><i /> INTERACTIVE WALKTHROUGH</span><span>0{frame + 1} / 0{item.steps.length}</span></div>
      <div className={`${styles.walkthroughStage} ${styles[`walkthrough_${item.slug}`]}`} data-frame={frame}>
        <div className={styles.walkthroughChrome}><span /><span /><span /><b>{item.title}</b><i>PREVIEW</i></div>
        <div className={styles.walkthroughScene}>
          <div className={styles.walkthroughSceneIcon}><Icon size={20} /></div>
          <span className={styles.walkthroughStepLabel}>STEP 0{frame + 1}</span>
          <strong>{item.steps[frame]}</strong>
          {item.slug === "advanced-table" && <MiniTableScene frame={frame} />}
          {item.slug === "async-dropdown" && <MiniDropdownScene frame={frame} />}
          {item.slug === "filters" && <MiniFilterScene frame={frame} />}
        </div>
      </div>
      <div className={styles.walkthroughControls}>
        <button className={styles.walkthroughPlay} type="button" onClick={playing ? () => setPlaying(false) : play} aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}>
          {playing ? <Pause size={15} /> : <Play size={15} />}{playing ? "Pause" : frame === lastFrame ? "Replay" : "Play walkthrough"}
        </button>
        <div className={styles.walkthroughTrack} aria-label={`Walkthrough step ${frame + 1} of ${item.steps.length}`}><span style={{ width: `${((frame + 1) / item.steps.length) * 100}%` }} /></div>
        <button className={styles.walkthroughReplay} type="button" onClick={() => { setPlaying(false); setFrame(0) }} aria-label="Restart walkthrough"><RotateCcw size={15} /></button>
      </div>
    </div>
  )
}

function MiniTableScene({ frame }: { frame: number }) {
  const rows = frame === 1 ? [sampleMembers[0], sampleMembers[2]] : sampleMembers.slice(0, 3)
  return <div className={styles.miniTableScene}>
    <div className={styles.miniTableToolbar}><span>Members</span><span className={frame === 1 ? styles.miniActiveSearch : ""}><Search size={9} />{frame === 1 ? "Amina" : "Search members"}</span></div>
    <div className={styles.miniTableHead}><span>NAME {frame === 2 ? "↑" : ""}</span><span>PLAN</span><span>STATUS</span></div>
    {rows.map((member, index) => <div key={member.id} className={`${styles.miniTableRow} ${frame === 2 && index === 0 ? styles.miniRowHighlight : ""}`}><span>{member.name}</span><span>{member.plan}</span><i data-status={member.status}>{member.status}</i></div>)}
    <div className={styles.miniTableFoot}><span>{frame === 3 ? "Page 2 of 2" : `${rows.length} shown`}</span><span>‹ &nbsp; {frame === 3 ? "2" : "1"} &nbsp; ›</span></div>
  </div>
}

function MiniDropdownScene({ frame }: { frame: number }) {
  return <div className={styles.miniDropdownScene}>
    <div className={styles.miniDropdownInput}><Search size={10} /><span>{frame > 0 ? "Amina" : "Search a member..."}</span><ChevronDown size={12} /></div>
    {frame >= 2 && <div className={styles.miniDropdownResults}><span className={frame === 3 ? styles.miniChosenOption : ""}>Amina Rahimi <i>Gold member</i>{frame === 3 && <Check size={11} />}</span><span>Amina Wali <i>Active member</i></span></div>}
    {frame === 1 && <div className={styles.miniLoading}><i /><i /><i /></div>}
  </div>
}

function MiniFilterScene({ frame }: { frame: number }) {
  return <div className={styles.miniFilterScene}>
    <div><span className={frame > 0 ? styles.miniFilterOn : ""}><Filter size={10} /> Status <ChevronDown size={9} /></span><span className={frame > 1 ? styles.miniFilterOn : ""}>Plan <ChevronDown size={9} /></span></div>
    {frame > 0 && <div className={styles.miniFilterChip}>Status: Active <b>×</b></div>}
    {frame > 1 && <div className={styles.miniFilterChip}>Plan: Gold <b>×</b></div>}
    <p>{frame > 1 ? "2 matching members" : "7 members"}{frame === 3 && " · filters cleared"}</p>
  </div>
}

export function ComponentsLabPage() {
  return (
    <PortfolioFrame active="Lab">
      <section className={styles.subpage}>
        <div className={styles.labHero}>
          <span className={styles.sectionEyebrow}>REUSABLE COMPONENTS · INTERACTIVE DEMOS</span>
          <h1>Small components.<br /><em>Better workflows.</em></h1>
          <p>Explore the shared table, async dropdown, and filter controls I use for data-heavy screens. Try each demo, then open its walkthrough to see how it works.</p>
          <div className={styles.labHeroMeta}><span><i /> 3 REUSABLE COMPONENTS</span><span>Based on code in this repository</span></div>
        </div>
        <div className={styles.labGrid}>
          {labItems.map((item) => {
            const Icon = item.icon
            return <article className={styles.labCard} key={item.slug}>
              <WalkthroughPlayer item={item} />
              <div className={styles.labCardBody}>
                <div className={styles.labCardHeading}><span className={styles.labCardIcon}><Icon size={18} /></span><span className={styles.labCardNumber}>{item.number} / COMPONENT</span></div>
                <h2>{item.title}</h2>
                <p>{item.short}</p>
                <Link className={styles.projectDetailsLink} href={`${portfolioHome}/components/${item.slug}`}>Explore component <ArrowUpRight size={14} /></Link>
              </div>
            </article>
          })}
        </div>
        <div className={styles.labFooterNote}><Sparkles size={16} /><p>Every demo uses fictional sample data. The walkthroughs explain the reusable patterns without connecting to private or live records.</p></div>
      </section>
    </PortfolioFrame>
  )
}

function AdvancedTableDemo() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All")
  const [showPlan, setShowPlan] = useState(true)
  const [sortAscending, setSortAscending] = useState(true)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const filtered = useMemo(() => sampleMembers
    .filter((member) => status === "All" || member.status === status)
    .filter((member) => `${member.name} ${member.email} ${member.plan}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)), [query, sortAscending, status])
  const pageSize = 4
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageRows = filtered.slice(page * pageSize, (page + 1) * pageSize)

  function setDemoStatus(next: string) { setStatus(next); setPage(0) }
  function toggleSelected(id: number) { setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]) }

  return <div className={styles.liveTableDemo}>
    <div className={styles.demoCaption}><span><i /> SAMPLE DATA · NOT LIVE</span><span>{selected.length} selected</span></div>
    <div className={styles.tableDemoToolbar}>
      <label className={styles.demoSearch}><Search size={15} /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(0) }} placeholder="Search members or plans" aria-label="Search sample members" /></label>
      <button type="button" className={styles.demoToggle} aria-pressed={!showPlan} onClick={() => setShowPlan((value) => !value)}>{showPlan ? "Hide plan" : "Show plan"}</button>
    </div>
    <div className={styles.tableDemoFilters} role="group" aria-label="Membership status filter">
      {["All", "Active", "Pending", "Expired"].map((option) => <button key={option} type="button" className={status === option ? styles.demoFilterActive : styles.demoFilter} aria-pressed={status === option} onClick={() => setDemoStatus(option)}>{option}</button>)}
      <span>{filtered.length} records</span>
    </div>
    <div className={styles.demoTableWrap}>
      <table className={styles.demoTable}>
        <thead><tr><th aria-label="Select rows" /><th><button type="button" onClick={() => setSortAscending((value) => !value)}>Member <span>{sortAscending ? "↕" : "↓"}</span></button></th>{showPlan && <th>Plan</th>}<th>Status</th><th>Renewal</th></tr></thead>
        <tbody>{pageRows.length ? pageRows.map((member) => <tr key={member.id} data-selected={selected.includes(member.id)}><td><input aria-label={`Select ${member.name}`} type="checkbox" checked={selected.includes(member.id)} onChange={() => toggleSelected(member.id)} /></td><td><strong>{member.name}</strong><small>{member.email}</small></td>{showPlan && <td>{member.plan}</td>}<td><i className={styles.statusBadge} data-status={member.status}>{member.status}</i></td><td>{member.renewal}</td></tr>) : <tr><td className={styles.emptyTable} colSpan={showPlan ? 5 : 4}>No members match these filters.</td></tr>}</tbody>
      </table>
    </div>
    <div className={styles.tableDemoPagination}><span>Page {page + 1} of {pageCount}</span><div><button type="button" aria-label="Previous page" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))}><ChevronLeft size={15} /></button><button type="button" aria-label="Next page" disabled={page >= pageCount - 1} onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}><ChevronRight size={15} /></button></div></div>
  </div>
}

const asyncOptions = ["Amina Rahimi", "Amina Wali", "Farid Noori", "Laila Ahmad", "Mina Wali", "Nadia Karim", "Omar Safi", "Samir Azizi"]

function AsyncDropdownDemo() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState("")
  const [visibleCount, setVisibleCount] = useState(4)
  const [loading, setLoading] = useState(false)
  const matching = useMemo(() => asyncOptions.filter((name) => name.toLowerCase().includes(query.toLowerCase())), [query])

  useEffect(() => {
    if (!open) return
    setLoading(true)
    const timer = window.setTimeout(() => setLoading(false), 380)
    return () => window.clearTimeout(timer)
  }, [open, query])

  return <div className={styles.asyncDemoShell}>
    <div className={styles.demoCaption}><span><i /> LOCAL ASYNC SIMULATION</span><span>Search · wait · select</span></div>
    <div className={styles.asyncDemoControl}>
      <button type="button" className={styles.asyncDemoTrigger} aria-expanded={open} onClick={() => setOpen((value) => !value)}><span>{selected || "Choose a member"}</span><ChevronDown size={17} /></button>
      {selected && <button type="button" className={styles.asyncClearButton} onClick={() => { setSelected(""); setQuery("") }}>Clear selection</button>}
      {open && <div className={styles.asyncDemoMenu}>
        <label className={styles.demoSearch}><Search size={14} /><input autoFocus value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(4) }} placeholder="Search members..." aria-label="Search async demo options" /></label>
        {loading ? <div className={styles.asyncLoading}><i /><i /><i /></div> : <div className={styles.asyncOptionList}>
          {matching.slice(0, visibleCount).map((name, index) => <button type="button" key={name} className={styles.asyncOption} onClick={() => { setSelected(name); setOpen(false) }}><span className={styles.asyncAvatar}>{name.split(" ").map((part) => part[0]).join("")}</span><span>{name}<small>{index % 2 ? "Silver plan · Active" : "Gold plan · Active"}</small></span>{selected === name && <Check size={15} />}</button>)}
          {!matching.length && <p className={styles.asyncEmpty}>No matching members. Try another search.</p>}
        </div>}
        {!loading && matching.length > visibleCount && <button type="button" className={styles.asyncLoadMore} onClick={() => { setLoading(true); window.setTimeout(() => { setVisibleCount((count) => count + 3); setLoading(false) }, 320) }}>Load more options <ArrowDownIcon /></button>}
      </div>}
    </div>
    <p className={styles.demoHelper}>The demo waits briefly to make the asynchronous search state visible.</p>
  </div>
}

function ArrowDownIcon() { return <ChevronDown size={14} /> }

function FiltersDemo() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All")
  const [plan, setPlan] = useState("All plans")
  const filtered = sampleMembers.filter((member) => (status === "All" || member.status === status) && (plan === "All plans" || member.plan === plan) && `${member.name} ${member.email}`.toLowerCase().includes(query.toLowerCase()))
  const activeCount = Number(status !== "All") + Number(plan !== "All plans") + Number(Boolean(query))
  const reset = () => { setQuery(""); setStatus("All"); setPlan("All plans") }

  return <div className={styles.filtersDemo}>
    <div className={styles.demoCaption}><span><i /> FILTER CONFIGURATION</span><span>{activeCount} active</span></div>
    <div className={styles.filtersDemoControls}>
      <label className={styles.demoSearch}><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search members" aria-label="Filter members by text" /></label>
      <label className={styles.demoSelectLabel}>Status<select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>Active</option><option>Pending</option><option>Expired</option></select></label>
      <label className={styles.demoSelectLabel}>Plan<select value={plan} onChange={(event) => setPlan(event.target.value)}><option>All plans</option><option>Gold</option><option>Silver</option><option>Platinum</option></select></label>
      <button type="button" className={styles.demoToggle} onClick={reset}>Clear filters</button>
    </div>
    <div className={styles.filterResultsHeader}><span>Matching members</span><strong>{filtered.length}</strong></div>
    <div className={styles.filterResultList}>{filtered.slice(0, 5).map((member) => <div key={member.id}><span>{member.name}<small>{member.plan} plan</small></span><i className={styles.statusBadge} data-status={member.status}>{member.status}</i></div>)}{!filtered.length && <p>No members match the current filters.</p>}</div>
    <p className={styles.demoHelper}>Combine fields, then clear them together with one action.</p>
  </div>
}

function LiveComponentDemo({ slug }: { slug: LabSlug }) {
  if (slug === "advanced-table") return <AdvancedTableDemo />
  if (slug === "async-dropdown") return <AsyncDropdownDemo />
  return <FiltersDemo />
}

export function ComponentDetailPage({ slug }: { slug: string }) {
  const item = labItems.find((entry) => entry.slug === slug)
  if (!item) return null
  const Icon = item.icon

  return <PortfolioFrame active="Lab">
    <article className={styles.subpage}>
      <div className={styles.componentDetailHero}>
        <Link className={styles.ghostButton} href={`${portfolioHome}/components`}><ArrowLeft size={15} /> All components</Link>
        <div className={styles.componentDetailIcon}><Icon size={22} /></div>
        <span className={styles.sectionEyebrow}>COMPONENT {item.number} · REUSABLE UI</span>
        <h1>{item.title}</h1>
        <p>{item.short}</p>
      </div>
      <div className={styles.componentDetailPlayer}><WalkthroughPlayer item={item} /></div>
      <div className={styles.componentDetailGrid}>
        <section className={styles.componentExplanation}>
          <span className={styles.sectionEyebrow}>HOW IT WORKS</span>
          <h2>One component.<br /><em>Many useful states.</em></h2>
          <p>{item.description}</p>
          <div className={styles.componentFeatureList}>{item.features.map((feature, index) => <div key={feature}><span>0{index + 1}</span><strong>{feature}</strong><Check size={15} /></div>)}</div>
          <div className={styles.componentSource}><Layers3 size={15} /><span>IMPLEMENTATION IN THIS REPO<code>{item.source}</code></span></div>
        </section>
        <section className={styles.liveDemoPanel}>
          <div className={styles.liveDemoHeading}><span><i /> TRY IT YOURSELF</span><span>SAMPLE DATA</span></div>
          <LiveComponentDemo slug={item.slug} />
        </section>
      </div>
      <aside className={styles.componentNote}><Sparkles size={16} /><p>{item.note}</p></aside>
      <div className={styles.componentNavActions}>
        <Link className={styles.ghostButton} href={`${portfolioHome}/components`}><ArrowLeft size={15} /> Component library</Link>
        <Link className={styles.primaryButton} href={`${portfolioHome}/contact`}>Let’s build something <ArrowRight size={15} /></Link>
      </div>
    </article>
  </PortfolioFrame>
}

