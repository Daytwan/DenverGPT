import { useCallback, useEffect, useRef, useState } from 'react'
import { navigation } from '../content.js'

function BrandWordmark() {
  return <span className="brand-wordmark">DenverGPT</span>
}

function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef(/** @type {HTMLElement | null} */ (null))
  const menuRef = useRef(/** @type {HTMLElement | null} */ (null))
  const toggleRef = useRef(/** @type {HTMLButtonElement | null} */ (null))

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false)
    if (restoreFocus) {
      toggleRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    if (!window.matchMedia) return undefined

    const desktopNavigation = window.matchMedia('(min-width: 56.251rem)')

    /** @param {MediaQueryListEvent} event */
    function handleBreakpointChange(event) {
      if (event.matches) setIsOpen(false)
    }

    desktopNavigation.addEventListener('change', handleBreakpointChange)
    return () => desktopNavigation.removeEventListener('change', handleBreakpointChange)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen)

    if (!isOpen) {
      return () => document.body.classList.remove('menu-open')
    }

    const focusable = menuRef.current?.querySelectorAll('a[href], button:not([disabled])')
    const first = focusable?.[0]
    const last = focusable?.[focusable.length - 1]
    requestAnimationFrame(() => first instanceof HTMLElement && first.focus())

    /** @param {KeyboardEvent} event */
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu(true)
        return
      }

      if (event.key !== 'Tab' || !first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        if (last instanceof HTMLElement) last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        if (first instanceof HTMLElement) first.focus()
      }
    }

    /** @param {PointerEvent} event */
    function handlePointerDown(event) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.body.classList.remove('menu-open')
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [closeMenu, isOpen])

  /** @param {React.MouseEvent<HTMLAnchorElement>} event */
  function handleNavigation(event) {
    const href = event.currentTarget.getAttribute('href')
    closeMenu()

    if (href?.startsWith('#')) {
      requestAnimationFrame(() => {
        const target = document.querySelector(href)
        if (target instanceof HTMLElement) target.focus({ preventScroll: true })
      })
    }
  }

  function handleBackdropClick() {
    setIsOpen(false)
    requestAnimationFrame(() => toggleRef.current?.focus())
  }

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="DenverGPT home" onClick={handleNavigation}>
          <BrandWordmark />
        </a>

        <button
          className="nav-toggle"
          type="button"
          ref={toggleRef}
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        {isOpen && (
          <div
            className="nav-backdrop"
            aria-hidden="true"
            onClick={handleBackdropClick}
          />
        )}

        <nav
          id="primary-navigation"
          className={`primary-navigation${isOpen ? ' is-open' : ''}`}
          aria-label="Primary navigation"
          ref={menuRef}
        >
          <div className="nav-links">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={handleNavigation}>
                {item.label}
              </a>
            ))}
          </div>
          <a className="header-action" href="#contact" onClick={handleNavigation}>
            Discuss a project <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

export { BrandWordmark, SiteHeader }
