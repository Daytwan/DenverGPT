import { useEffect, useState } from 'react'

const services = [
  {
    number: '01',
    title: 'Lead flow',
    text: 'Capture, qualify, route, and follow up—without making your team babysit the inbox.',
    tags: ['Intake', 'CRM routing', 'Follow-up'],
  },
  {
    number: '02',
    title: 'Data & documents',
    text: 'Turn forms, PDFs, emails, and spreadsheets into clean data and ready-to-use reports.',
    tags: ['Extraction', 'Validation', 'Reporting'],
  },
  {
    number: '03',
    title: 'Operations',
    text: 'Connect the tools you already use so handoffs happen faster and fewer details fall through.',
    tags: ['Approvals', 'Support', 'Internal ops'],
  },
]

const process = [
  ['Find the drag', 'We map where repetitive work, slow handoffs, and copy-paste are costing you time.'],
  ['Design the flow', 'We choose the right AI and automation for the job—not technology for its own sake.'],
  ['Build it safely', 'We connect, test, and document the workflow around the tools your team already knows.'],
  ['Launch & tune', 'We train your team, watch the workflow perform, and improve it with real-world feedback.'],
]

const useCases = [
  {
    eyebrow: 'Professional services',
    before: 'New inquiries sit in a shared inbox until someone has time to sort them.',
    after: 'Every inquiry is summarized, qualified, routed, and ready for a personal response.',
  },
  {
    eyebrow: 'Field operations',
    before: 'Photos, notes, and forms get retyped into three different systems after every job.',
    after: 'One submission updates the record, drafts the report, and alerts the right people.',
  },
  {
    eyebrow: 'Growing teams',
    before: 'Weekly reporting means chasing updates and rebuilding the same spreadsheet.',
    after: 'The numbers are collected, checked, and turned into a decision-ready briefing.',
  },
]

function MountainMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 46 46" aria-hidden="true">
      <path d="M3 34 15.8 15l6.4 8.6L28.8 13 43 34" />
      <path d="M10 34h26M23 23.5V34" />
      <circle cx="23" cy="34" r="2.4" />
    </svg>
  )
}

function Arrow({ small = false }) {
  return (
    <svg className={small ? 'arrow arrow--small' : 'arrow'} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function WorkflowVisual() {
  return (
    <div className="workflow-visual" role="img" aria-label="Scattered manual tasks becoming one clear automated workflow">
      <div className="topography" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((line) => (
          <span key={line} style={{ '--line': line }} />
        ))}
      </div>
      <div className="elevation" aria-hidden="true">
        <strong>5280</strong>
        <span>FEET ABOVE<br />BUSINESS AS USUAL</span>
      </div>
      <div className="manual manual--one"><span />NEW LEAD</div>
      <div className="manual manual--two"><span />PDF REPORT</div>
      <div className="manual manual--three"><span />TEAM REQUEST</div>
      <svg className="workflow-map" viewBox="0 0 720 650" aria-hidden="true">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path className="route route--ghost" d="M75 145 C205 150 165 325 330 325 S485 325 585 205" />
        <path className="route route--ghost" d="M80 325 H330" />
        <path className="route route--ghost" d="M76 508 C210 505 170 325 330 325" />
        <path className="route route--live" d="M75 145 C205 150 165 325 330 325 S485 325 585 205" />
        <path className="route route--live route--delay" d="M80 325 H330 M76 508 C210 505 170 325 330 325" />
        <circle className="pulse-node" cx="330" cy="325" r="15" />
        <circle className="pulse-ring" cx="330" cy="325" r="28" />
      </svg>
      <div className="engine"><span>DENVERGPT</span><strong>AI WORKFLOW</strong></div>
      <div className="outcome"><span>READY</span><strong>WORK<br />COMPLETED</strong><Arrow small /></div>
    </div>
  )
}

function App() {
  const [formStatus, setFormStatus] = useState('')

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.16 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    setFormStatus('')
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }
    setFormStatus('Preview mode — your details stayed in this browser. Connect a form destination before launch.')
    event.currentTarget.reset()
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="DenverGPT home">
          <MountainMark />
          <span>DENVER<strong>GPT</strong></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#services">What we automate</a>
          <a href="#process">How it works</a>
        </nav>
        <a className="header-cta" href="#audit">Free workflow audit <Arrow small /></a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="kicker"><span /> AI WORKFLOW STUDIO · DENVER, COLORADO</p>
            <h1 aria-label="DenverGPT. Make busywork disappear.">
              <span className="hero-brand">DENVER<span>GPT</span></span>
              <span className="hero-promise">Make busywork<br />disappear.</span>
            </h1>
            <p className="hero-intro">Custom AI workflows that clear the repetitive work off your team’s plate—so the people you hired can do the work that matters.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#audit">Book a free workflow audit <Arrow /></a>
              <a className="text-link" href="#services">See what we automate <span>↓</span></a>
            </div>
          </div>
          <WorkflowVisual />
          <p className="hero-side-note">BUILT IN DENVER<br />FOR TEAMS GOING PLACES</p>
          <a className="scroll-cue" href="#proof" aria-label="Scroll to learn more"><span>SCROLL</span><i /></a>
        </section>

        <div className="outcome-strip" aria-label="Common workflow outcomes">
          <span>FEWER HANDOFFS</span><i />
          <span>CLEANER DATA</span><i />
          <span>FASTER RESPONSES</span><i />
          <span>MORE HUMAN WORK</span>
        </div>

        <section className="proof section-shell" id="proof">
          <div className="section-label" data-reveal>
            <span>THE REAL OPPORTUNITY</span>
            <i>01</i>
          </div>
          <div className="proof-layout">
            <h2 data-reveal>The work between<br />the work is costing you.</h2>
            <div className="proof-copy" data-reveal>
              <p>Your best people shouldn’t spend their day moving information between tabs, chasing routine updates, or rebuilding the same report.</p>
              <p>DenverGPT finds that operational drag and replaces it with a reliable system built around the way your business actually runs.</p>
            </div>
          </div>
          <div className="signal-line" aria-hidden="true" data-reveal>
            <span className="signal-dot signal-dot--one" />
            <span className="signal-dot signal-dot--two" />
            <span className="signal-dot signal-dot--three" />
            <b>MANUAL</b><b>AUTOMATED</b>
          </div>
        </section>

        <section className="services section-shell" id="services">
          <div className="section-label section-label--dark" data-reveal>
            <span>WHAT WE AUTOMATE</span>
            <i>02</i>
          </div>
          <div className="services-heading">
            <h2 data-reveal>Less busywork.<br /><em>More business.</em></h2>
            <p data-reveal>We build practical workflows across the places where work piles up.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number} data-reveal>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ul aria-label={`${service.title} capabilities`}>
                  {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <span className="service-arrow"><Arrow /></span>
              </article>
            ))}
          </div>
        </section>

        <section className="process section-shell" id="process">
          <div className="process-intro">
            <div className="section-label" data-reveal>
              <span>HOW IT WORKS</span>
              <i>03</i>
            </div>
            <h2 data-reveal>Start with the<br />bottleneck.<br /><em>End with flow.</em></h2>
            <p data-reveal>Clear scope. Useful technology. A system your team can trust.</p>
          </div>
          <ol className="process-list">
            {process.map(([title, text], index) => (
              <li key={title} data-reveal>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="use-cases section-shell">
          <div className="section-label" data-reveal>
            <span>THE SHIFT</span>
            <i>04</i>
          </div>
          <div className="use-cases-heading">
            <h2 data-reveal>Same team.<br /><em>Better altitude.</em></h2>
            <p data-reveal>Illustrative examples of where a custom workflow can change the day-to-day.</p>
          </div>
          <div className="case-list">
            {useCases.map((item, index) => (
              <article className="case-row" key={item.eyebrow} data-reveal>
                <div className="case-index">0{index + 1}</div>
                <div className="case-before"><span>{item.eyebrow} · BEFORE</span><p>{item.before}</p></div>
                <div className="case-direction"><Arrow /></div>
                <div className="case-after"><span>WITH DENVERGPT</span><p>{item.after}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="audit" id="audit">
          <div className="audit-topo" aria-hidden="true" />
          <div className="audit-copy" data-reveal>
            <p className="kicker kicker--dark"><span /> YOUR FIRST STEP</p>
            <h2>What should<br />your team never<br />do <em>again?</em></h2>
            <p>Tell us where work gets repetitive. We’ll show you what’s worth automating—and what isn’t.</p>
          </div>
          <form className="audit-form" onSubmit={handleSubmit} data-reveal noValidate>
            <div className="form-row">
              <label htmlFor="name">YOUR NAME</label>
              <input id="name" name="name" type="text" autoComplete="name" placeholder="Name" required />
            </div>
            <div className="form-row">
              <label htmlFor="email">WORK EMAIL</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            </div>
            <div className="form-row form-row--full">
              <label htmlFor="drag">WHAT’S THE REPETITIVE WORK?</label>
              <textarea id="drag" name="drag" rows="3" placeholder="Every Monday, someone on our team has to…" required />
            </div>
            <button className="button button--dark" type="submit">Book my free workflow audit <Arrow /></button>
            <p className="form-note">No pitch deck. No AI theater. Just a useful conversation.</p>
            <p className="form-status" role="status" aria-live="polite">{formStatus}</p>
          </form>
        </section>
      </main>

      <footer>
        <a className="brand brand--footer" href="#top"><MountainMark /><span>DENVER<strong>GPT</strong></span></a>
        <p>Custom AI workflows for Colorado businesses.</p>
        <a href="#top">BACK TO TOP ↑</a>
        <span>DENVER, CO · {new Date().getFullYear()}</span>
      </footer>
    </>
  )
}

export default App
