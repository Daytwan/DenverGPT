import { BrandWordmark, SiteHeader } from './components/SiteHeader.jsx'
import { examples, frictionPoints, process, services, technicalFocus } from './content.js'

function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  )
}

function FlowGraphic() {
  return (
    <figure className="flow-graphic" aria-labelledby="flow-caption">
      <div className="flow-stage">
        <div className="flow-inputs" aria-hidden="true">
          <span>Repeated steps</span>
          <span>Scattered data</span>
          <span>Disconnected tools</span>
        </div>

        <svg className="flow-lines" viewBox="0 0 720 430" aria-hidden="true">
          <path className="flow-line flow-line--quiet" d="M32 78 C210 78 180 215 350 215 S500 215 688 120" />
          <path className="flow-line flow-line--quiet" d="M32 215 H350" />
          <path className="flow-line flow-line--quiet" d="M32 352 C210 352 180 215 350 215" />
          <path className="flow-line flow-line--active" d="M32 78 C210 78 180 215 350 215 S500 215 688 120" />
          <path className="flow-line flow-line--active flow-line--delayed" d="M32 215 H350 M32 352 C210 352 180 215 350 215" />
          <circle className="flow-node-ring" cx="350" cy="215" r="42" />
          <circle className="flow-node" cx="350" cy="215" r="7" />
        </svg>

        <div className="flow-system" aria-hidden="true">
          <span>Focused system</span>
          <strong>Built around the work</strong>
        </div>
        <div className="flow-result" aria-hidden="true">
          <span>Useful output</span>
          <strong>One clear next step</strong>
        </div>
      </div>
      <figcaption id="flow-caption">
        Practical systems turn disconnected inputs into an understandable next step.
      </figcaption>
    </figure>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="top" tabIndex={-1} aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">Practical technical work · Denver, Colorado</p>
              <h1 id="hero-title">Practical automation, data systems, and custom tools for Denver teams.</h1>
              <p className="hero-summary">
                DenverGPT designs focused software for operational work: connect disconnected tools,
                organize messy data, reduce repetitive steps, and apply AI only when it earns its place.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="#contact">
                  Discuss a project <ArrowIcon />
                </a>
                <a className="text-link" href="#services">Explore services <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <FlowGraphic />
          </div>
        </section>

        <div className="capability-band" aria-label="DenverGPT capability areas">
          <div className="page-shell capability-band__inner">
            <span>Automation</span>
            <span>Data workflows</span>
            <span>Internal tools</span>
            <span>Responsible AI</span>
          </div>
        </div>

        <section className="section services" id="services" tabIndex={-1} aria-labelledby="services-title">
          <div className="page-shell">
            <div className="section-intro">
              <p className="section-index">01 / Services</p>
              <div>
                <h2 id="services-title">Build the missing connection between the work and the tools.</h2>
                <p>Start with the operational need. Choose the technology after the problem is clear.</p>
              </div>
            </div>

            <div className="service-list">
              {services.map((service) => (
                <article className="service-row" key={service.number}>
                  <span className="item-number" aria-hidden="true">{service.number}</span>
                  <div className="service-title">
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.description}</p>
                  <ul aria-label={`${service.title} deliverables`}>
                    {service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section friction" aria-labelledby="friction-title">
          <div className="page-shell friction-grid">
            <div className="friction-heading">
              <p className="section-index section-index--light">02 / When it helps</p>
              <h2 id="friction-title">Start with the operational friction.</h2>
              <p>The useful question is not “Where can we add AI?” It is “What work is getting in the way?”</p>
            </div>

            <div className="friction-list">
              {frictionPoints.map((item, index) => (
                <article key={item.problem}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <h3>{item.problem}</h3>
                  <p>{item.response}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section approach" id="approach" tabIndex={-1} aria-labelledby="approach-title">
          <div className="page-shell approach-grid">
            <div className="approach-heading">
              <p className="section-index">03 / Approach</p>
              <h2 id="approach-title">A direct path from bottleneck to working system.</h2>
              <p>Clear scope, representative tests, and documentation are part of the work—not afterthoughts.</p>
            </div>

            <ol className="process-list">
              {process.map((step) => (
                <li key={step.number}>
                  <span className="item-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section examples" id="examples" tabIndex={-1} aria-labelledby="examples-title">
          <div className="page-shell">
            <div className="section-intro section-intro--compact">
              <p className="section-index">04 / Examples</p>
              <div>
                <h2 id="examples-title">Representative workflows, not client case studies.</h2>
                <p>These examples show the shape of practical work. They do not claim completed engagements or measured results.</p>
              </div>
            </div>

            <div className="example-list">
              {examples.map((example) => (
                <article className="example-row" key={example.number}>
                  <div className="example-name">
                    <span className="item-number">{example.number}</span>
                    <h3>{example.context}</h3>
                  </div>
                  <div>
                    <span className="detail-label">Operational need</span>
                    <p>{example.input}</p>
                  </div>
                  <div>
                    <span className="detail-label">Possible system</span>
                    <p>{example.system}</p>
                  </div>
                  <div className="example-boundary">
                    <span className="detail-label">Responsible boundary</span>
                    <p>{example.boundary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="about" tabIndex={-1} aria-labelledby="about-title">
          <div className="page-shell about-grid">
            <div>
              <p className="section-index">05 / About</p>
              <h2 id="about-title">Built close to the work.</h2>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                DenverGPT is a Denver-based practice focused on practical software, automation,
                data, integrations, and responsible uses of AI.
              </p>
              <p>
                Its founder is a Computer Engineering student working across Python, machine learning,
                APIs, Linux, C, C++, and low-level systems. That systems background shapes the approach:
                understand the constraints, build maintainable software, and document what was made.
              </p>
              <ul className="technical-focus" aria-label="Technical focus areas">
                {technicalFocus.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" tabIndex={-1} aria-labelledby="contact-title">
          <div className="page-shell contact-grid">
            <div>
              <p className="section-index section-index--light">06 / Contact</p>
              <h2 id="contact-title">Start a conversation with the problem.</h2>
            </div>
            <div className="contact-copy">
              <p>Share the task, the tools involved, and what is getting in the way.</p>
              <div className="contact-status" role="note" aria-label="Contact availability">
                <span className="status-dot" aria-hidden="true" />
                <div>
                  <strong>Contact channel is being finalized.</strong>
                  <p>No form is shown until there is a verified delivery path. That means nothing you type can disappear into a non-working submission.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-grid">
          <a className="brand brand--footer" href="#top" aria-label="DenverGPT home">
            <BrandWordmark />
          </a>
          <p>Practical technical systems for Denver-area teams.</p>
          <a className="footer-top-link" href="#top">Back to top <span aria-hidden="true">↑</span></a>
          <small>Denver, Colorado · {new Date().getFullYear()}</small>
        </div>
      </footer>
    </>
  )
}

export default App
