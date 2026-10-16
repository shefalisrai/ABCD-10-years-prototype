import './style.css'
import { PAGES } from './data/pages.js'
import { renderPage } from './page.js'

const app = document.querySelector('#app')
const pages = Object.values(PAGES)
let current = null

// Mockup-only page switcher. On the live site, the front-page network map links to each page.
function mockBar(active) {
  const bar = document.createElement('div')
  bar.className = 'mockbar'
  bar.innerHTML = '<span class="lab">Mockup pages</span>' +
    pages.map((p) => `<a href="#${p.slug}"${p === active ? ' class="on"' : ''}>${p.title}</a>`).join('')
  return bar
}

// A finding's home page, or else a page that shows it as a connected finding.
function pageWith(id) {
  return pages.find((p) => p.findings.includes(id)) || pages.find((p) => p.connected.includes(id))
}

function goTo(id) {
  const page = pageWith(id)
  if (page) location.hash = `${page.slug}/${id}`
}

// Routes: #mental-health, #substance-use, and #<slug>/<finding id> to jump to a card.
function route() {
  const [slug, focusId] = location.hash.slice(1).split('/')
  const page = pages.find((p) => p.slug === slug) || pages[0]
  if (current?.page !== page) {
    const view = renderPage(page, goTo)
    app.replaceChildren(mockBar(page), view.el)
    document.title = `${page.title} · ABCD Study 10 Years`
    window.scrollTo(0, 0)
    current = { page, view }
  }
  if (focusId) current.view.focusCard(focusId)
}

window.addEventListener('hashchange', route)
route()
