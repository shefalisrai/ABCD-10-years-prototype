import { FINDINGS, GROUPS } from './data/findings.js'
import { card, esc, shortAuthors } from './card.js'
import logoUrl from './assets/brain-rainbow.svg'

// The Greybrainrainbow.svg logo (580 x 591 viewBox, disc centred near 290,296)
// with the topic name set on an arc in the space above the brain.
function emblem(slug, title) {
  return `
    <svg width="270" height="275" viewBox="0 0 580 591.11" aria-label="${esc(title)}">
      <defs><path id="arc-${slug}" d="M 60 296 A 230 230 0 0 1 520 296"/></defs>
      <image href="${logoUrl}" x="0" y="0" width="580" height="591.11"/>
      <text font-family="Anca, Patrick Hand SC, cursive" font-size="68" fill="#1d1d1f" letter-spacing="0.5">
        <textPath href="#arc-${slug}" startOffset="50%" text-anchor="middle">${esc(title)}</textPath>
      </text>
    </svg>`
}

function themeRail(themes, hasConnected) {
  const bubbles = themes.map((t) => {
    const size = t.length > 11 ? 9.5 : t.length > 9 ? 10.5 : 12
    return `<button class="ring" data-theme="${esc(t)}" style="width:56px;height:56px"><span style="font-size:${size}px">${esc(t)}</span></button>`
  })
  return `
    <div class="lab">Themes</div>
    <button class="ring all on" data-theme="All" style="width:60px;height:60px"><span style="font-size:16px">All</span></button>
    ${bubbles.join('')}
    ${hasConnected ? '<div class="toggle" data-toggle>Show connected<i></i></div>' : ''}`
}

// Workgroup figures side by side at a shared height (each grows by its aspect ratio);
// clicking one opens it full size in a new tab.
function figures(list) {
  const items = list.map((f) => `
    <figure class="fig" style="--ar:${(f.width / f.height).toFixed(3)}">
      <a href="${f.src}" target="_blank" rel="noopener"><img src="${f.src}" width="${f.width}" height="${f.height}" alt="${esc(f.alt)}"></a>
      <figcaption><b>${esc(f.title)}</b> · ${f.source ? esc(shortAuthors(f.source)) : '<span class="todo">(need to put citation for images here)</span>'} <a href="${f.src}" target="_blank" rel="noopener">View full size ↗</a></figcaption>
    </figure>`)
  return `<div class="sec"><h3>The research at a glance</h3><div class="figs">${items.join('')}</div></div>`
}

// Renders one topic page. `goTo(id)` is called when a connected finding lives on another page.
export function renderPage(page, goTo) {
  const hasConnected = page.connected.length > 0
  const ids = page.findings.concat(page.connected)
  const themes = GROUPS.filter((g) => ids.some((id) => FINDINGS[id].groups.includes(g)))

  const cards = page.findings.map((id) => card(id, false)).join('') +
    (hasConnected
      ? '<div class="divider"><span class="lab" style="color:#8a3fd1">Connected from other topics</span></div>' +
        page.connected.map((id) => card(id, true)).join('')
      : '')
  const stats = `<span><b>${page.findings.length}</b> ${esc(page.title)} highlights</span>` +
    (hasConnected ? `<span><b>${page.connected.length}</b> connected from other topics</span>` : '')
  const resources = page.resources
    .map((r) => `<a class="thumb" href="${r.url}" target="_blank" rel="noopener">${esc(r.title)}<span>${esc(r.kind)}</span></a>`)
    .join('')

  const el = document.createElement('div')
  el.className = 'page'
  el.innerHTML = `
    <div class="nav"><b>ABCD Study® · 10 Years</b><span>About</span><span>Families</span><span>Scientists</span><span>News</span></div>
    <div class="head">
      ${emblem(page.slug, page.title)}
      <div class="intro">
        <a class="back" href="#" data-placeholder>← Back to the map</a>
        <h1>${esc(page.intro)}</h1>
        <div class="stats">${stats}</div>
      </div>
    </div>
    ${page.figures ? figures(page.figures) : ''}
    <div class="body">
      <div class="rail">${themeRail(themes, hasConnected)}</div>
      <div class="grid">${cards}</div>
    </div>
    <div class="sec"><h3>${esc(page.resourcesTitle)}</h3><div class="thumbs">${resources}</div></div>`

  const state = { theme: 'All', showConnected: true }
  const rings = el.querySelectorAll('.rail .ring')
  const toggle = el.querySelector('.toggle')
  const divider = el.querySelector('.divider')
  const fcards = el.querySelectorAll('.fcard')

  function apply() {
    rings.forEach((r) => r.classList.toggle('on', r.dataset.theme === state.theme))
    toggle?.classList.toggle('off', !state.showConnected)
    fcards.forEach((c) => {
      const okTheme = state.theme === 'All' || c.dataset.groups.split('|').includes(state.theme)
      const okConnected = state.showConnected || !c.classList.contains('ext')
      c.style.display = okTheme && okConnected ? '' : 'none'
    })
    if (divider) {
      const anyExt = [...el.querySelectorAll('.fcard.ext')].some((c) => c.style.display !== 'none')
      divider.style.display = anyExt ? '' : 'none'
    }
  }

  // Scrolls to a card on this page and flashes it, clearing any filter that hides it.
  function focusCard(id) {
    const target = document.getElementById(`card-${id}`)
    if (!target || !el.contains(target)) return
    if (target.style.display === 'none') {
      state.theme = 'All'
      state.showConnected = true
      apply()
    }
    target.classList.remove('flipped')
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    target.classList.add('flash')
    setTimeout(() => target.classList.remove('flash'), 1400)
  }

  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-placeholder]')) {
      e.preventDefault()
      return
    }
    const ring = e.target.closest('.ring')
    if (ring) {
      state.theme = ring.dataset.theme
      apply()
      return
    }
    if (e.target.closest('.toggle')) {
      state.showConnected = !state.showConnected
      apply()
      return
    }
    if (e.target.closest('a[href]')) return
    const link = e.target.closest('[data-go]')
    if (link) {
      const id = link.dataset.go
      if (el.querySelector(`#card-${id}`)) focusCard(id)
      else goTo(id)
      return
    }
    e.target.closest('.fcard')?.classList.toggle('flipped')
  })

  el.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('fcard')) {
      e.preventDefault()
      e.target.classList.toggle('flipped')
    }
  })

  return { el, focusCard }
}
