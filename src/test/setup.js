import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => cleanup())

class IntersectionObserverMock {
  /** @param {IntersectionObserverCallback} _callback @param {IntersectionObserverInit} [_options] */
  constructor(_callback, _options) {
    /** @type {Element | Document | null} */
    this.root = null
    this.rootMargin = '0px'
    this.scrollMargin = '0px'
    /** @type {number[]} */
    this.thresholds = []
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}

globalThis.IntersectionObserver = IntersectionObserverMock
