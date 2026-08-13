import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App.jsx'

describe('DenverGPT homepage', () => {
  test('explains the practical offer and exposes one primary action', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /practical automation, data systems, and custom tools/i,
    )

    const primaryActions = screen.getAllByRole('link', { name: /discuss a project/i })
    expect(primaryActions.length).toBeGreaterThan(0)
    expect(primaryActions[0]).toHaveAttribute('href', '#contact')
  })

  test('uses factual service and example language', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /automation & integrations/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /data & reporting/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /custom internal tools/i })).toBeVisible()
    expect(screen.getByText(/representative workflows, not client case studies/i)).toBeVisible()
  })

  test('does not render a form without a verified delivery destination', () => {
    render(<App />)

    const contact = screen.getByRole('region', { name: /start a conversation/i })
    expect(within(contact).queryByRole('form')).not.toBeInTheDocument()
    expect(within(contact).getByText(/contact channel is being finalized/i)).toBeVisible()
  })

  test('opens and closes the mobile menu accessibly', () => {
    render(<App />)

    const toggle = screen.getByRole('button', { name: /open navigation/i })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(document.body).toHaveClass('menu-open')

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(document.body).not.toHaveClass('menu-open')
    expect(toggle).toHaveFocus()
  })

  test('all in-page navigation targets exist', () => {
    const { container } = render(<App />)
    const targets = [...container.querySelectorAll('a[href^="#"]')]
      .map((link) => link.getAttribute('href'))
      .filter((href) => href && href.length > 1)

    for (const href of targets) {
      if (href) expect(container.querySelector(href)).toBeInTheDocument()
    }
  })
})
