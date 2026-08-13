export const navigation = [
  { href: '#services', label: 'Services' },
  { href: '#approach', label: 'Approach' },
  { href: '#examples', label: 'Examples' },
  { href: '#about', label: 'About' },
]

export const services = [
  {
    number: '01',
    title: 'Automation',
    description:
      'Connect intake, approvals, notifications, and recurring tasks so information moves without another round of copying and pasting.',
    deliverables: ['Workflow mapping', 'API connections', 'Python automation'],
  },
  {
    number: '02',
    title: 'Data',
    description:
      'Collect, clean, and organize operational data into dependable reports, dashboards, and decision-ready views.',
    deliverables: ['Data cleanup', 'Reporting pipelines', 'Focused dashboards'],
  },
  {
    number: '03',
    title: 'Custom internal tools',
    description:
      'Build lightweight software for the specific work that spreadsheets and off-the-shelf products do not handle well.',
    deliverables: ['Python software', 'Internal web tools', 'Technical prototypes'],
  },
]

export const frictionPoints = [
  {
    problem: 'Repetitive handoffs',
    response: 'A focused workflow can move routine information to the right place while keeping judgment with people.',
  },
  {
    problem: 'Scattered or inconsistent data',
    response: 'A documented data process can validate, normalize, and prepare information for reporting or analysis.',
  },
  {
    problem: 'Tools that do not communicate',
    response: 'A small integration can bridge existing systems when the available APIs and access make it practical.',
  },
  {
    problem: 'A gap generic software cannot fill',
    response: 'A purpose-built internal tool can support the exact task without introducing enterprise-scale complexity.',
  },
]

export const process = [
  {
    number: '01',
    title: 'Understand the operation',
    description: 'Document the current steps, constraints, inputs, and decision the system needs to support.',
  },
  {
    number: '02',
    title: 'Define the useful system',
    description: 'Choose the smallest responsible solution—including when conventional software is better than AI.',
  },
  {
    number: '03',
    title: 'Build and validate',
    description: 'Implement the workflow or tool, then test it against representative inputs and failure cases.',
  },
  {
    number: '04',
    title: 'Hand off clearly',
    description: 'Document what was built, how it operates, and what the team needs to maintain it responsibly.',
  },
]

export const examples = [
  {
    number: '01',
    context: 'Intake triage',
    input: 'Requests arrive in different formats and require manual sorting.',
    system: 'Extract the useful fields, flag missing information, and prepare a routed summary.',
    boundary: 'A person remains responsible for the final response and any consequential decision.',
  },
  {
    number: '02',
    context: 'Data preparation',
    input: 'Spreadsheets, PDFs, and API exports use inconsistent structures.',
    system: 'Validate and normalize the inputs into a documented, report-ready dataset.',
    boundary: 'Exceptions stay visible instead of being silently guessed or discarded.',
  },
  {
    number: '03',
    context: 'Internal utility',
    input: 'A repeated multi-step task is too specific for a generic product.',
    system: 'Create a focused Python or web tool around the operator’s actual sequence.',
    boundary: 'The tool stays narrow, understandable, and maintainable by design.',
  },
]

export const technicalFocus = [
  'Python',
  'APIs',
  'Automation',
  'Data systems',
  'Responsible AI',
  'Linux',
  'C & C++',
]
