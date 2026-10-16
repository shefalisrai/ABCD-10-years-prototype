import { TOPICS } from './data/topics.js'
import { SOURCES } from './data/sources.js'
import { FINDINGS } from './data/findings.js'

export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Topic name underlined in its front-page node color.
export function topicLabel(key) {
  const topic = TOPICS[key]
  return `<span class="tp" style="--c:${topic.color}">${esc(topic.name)}</span>`
}

// Authors shorten to "First et al." plus the year when the citation has one.
function sourceItem(key) {
  const s = SOURCES[key]
  const year = s.authors.match(/\(\d{4}\)/)?.[0]
  const authors = s.authors.split(',')[0] + ' et al.' + (year ? ' ' + year : '')
  return `<li>${esc(authors)} <span class="ttl">${esc(s.title)}</span> ${esc(s.journal)} <a href="#" data-placeholder>Read →</a></li>`
}

// A flip card: the front has the bold statement and the ABCD highlight; the back holds
// the combined detail, every source it draws on, and links to its connected findings.
export function card(id, fromOtherTopic) {
  const f = FINDINGS[id]
  const tags = f.themes.map((t) => `<span class="tag">${esc(t)}</span>`).join('')
  const sources = f.sources.map(sourceItem).join('')
  const original = f.originalStudies
    ? `<li>Original studies: ${esc(f.originalStudies)}</li>`
    : '<li><span class="todo">TBD study links</span></li>'
  const connected = f.connected
    .map((cid) => `<li data-go="${cid}"><span class="ct">${esc(FINDINGS[cid].statement)}</span> · ${topicLabel(FINDINGS[cid].topic)}</li>`)
    .join('')

  return `
    <div class="fcard${fromOtherTopic ? ' ext' : ''}" id="card-${id}" data-groups="${esc(f.groups.join('|'))}" tabindex="0">
      <div class="inner">
        <div class="face front">
          <div class="tags">${tags}</div>
          <div class="statement">${esc(f.statement)}</div>
          <div class="hl-lab">ABCD highlights</div>
          <div class="hl">${esc(f.highlight)}</div>
          <div class="spacer"></div>
          <div class="fliphint">Flip to see the research behind this ↻</div>
          <div class="foot"><span>${topicLabel(f.topic)}</span><b>${f.connected.length} connected →</b></div>
        </div>
        <div class="face back">
          <div class="back-top"><span class="hand">The research behind this</span><span class="x">↺ flip back</span></div>
          <p class="exp">${esc(f.detail)}</p>
          <div class="lab">ABCD sources</div>
          <ul class="srcs">${sources}${original}</ul>
          <div class="lab">Connected findings</div>
          <ul class="cons">${connected}</ul>
        </div>
      </div>
    </div>`
}
