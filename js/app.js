/*
  Middventory app: renders ITEMS (js/data.js) as a pixel inventory grid.
  Each part's drawing (js/art.js) is turned into a small outlined pixel sprite at load.
*/
(function () {
  'use strict';

  const TABS = [
    { key: 'all', label: 'ALL' },
    { key: 'boards', label: 'BOARDS' },
    { key: 'parts', label: 'PARTS' },
    { key: 'tools', label: 'TOOLS' },
    { key: 'supplies', label: 'SUPPLIES' },
  ];

  const items = ITEMS.map((it, i) => ({ ...it, id: 'p' + i }));
  const ui = { tab: 'all', q: '', pin: null, keepScroll: false };
  const PX = {};

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const byId = (id) => items.find((x) => x.id === id);
  const cols = () => (innerWidth <= 480 ? 5 : innerWidth <= 700 ? 6 : 8);
  const inTab = (it) => ui.tab === 'all' || it.tab === ui.tab;

  /* ---------- search ---------- */
  const tokens = (s) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  function matches(it, q) {
    const hay = tokens([it.name, DRAWERS[it.drawer] || '', it.tags, it.drawer].join(' '));
    const want = tokens(q);
    return want.length > 0 && want.every((t) => hay.some((h) => h.startsWith(t)));
  }

  /* ---------- pixel sprites ---------- */
  function pixelate(key, res) {
    return new Promise((done) => {
      if (!ART[key]) return done('');
      const a = ART[key](), img = new Image();
      const fallback = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(a.svg);
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = c.height = res;
        const x = c.getContext('2d');
        const k = (res - 4) / Math.max(a.w, a.h), w = a.w * k, h = a.h * k;
        x.drawImage(img, (res - w) / 2, (res - h) / 2, w, h);
        try {
          const d = x.getImageData(0, 0, res, res), p = d.data;
          for (let i = 0; i < p.length; i += 4) p[i + 3] = p[i + 3] > 110 ? 255 : 0;
          const A = (X, Y) => (X < 0 || Y < 0 || X >= res || Y >= res ? 0 : p[(Y * res + X) * 4 + 3]);
          const out = new Uint8ClampedArray(p);
          for (let Y = 0; Y < res; Y++) for (let X = 0; X < res; X++) {
            const j = (Y * res + X) * 4;
            if (!p[j + 3] && (A(X + 1, Y) || A(X - 1, Y) || A(X, Y + 1) || A(X, Y - 1))) { out[j] = 31; out[j + 1] = 42; out[j + 2] = 92; out[j + 3] = 255; }
          }
          d.data.set(out);
          x.putImageData(d, 0, 0);
          done(c.toDataURL());
        } catch (e) { done(fallback); }
      };
      img.onerror = () => done(fallback);
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(a.svg.replace('<svg ', '<svg width="' + a.w + '" height="' + a.h + '" '));
    });
  }
  const sprite = (it, big) => PX[it.icon + (big ? '@' : '')] || '';
  async function loadSprites() {
    const keys = [...new Set(items.map((i) => i.icon))];
    await Promise.all(keys.flatMap((k) => [pixelate(k, 30).then((u) => (PX[k] = u)), pixelate(k, 48).then((u) => (PX[k + '@'] = u))]));
    ui.keepScroll = true;
    renderGrid();
  }

  /* ---------- grid ---------- */
  const BROKEN_X = '<span class="bad" aria-hidden="true"><svg width="60%" viewBox="0 0 10 10" shape-rendering="crispEdges"><path d="M1 1h2v1h1v1h2V2h1V1h2v2H8v1H7v2h1v1h1v2H7V8H6V7H4v1H3v1H1V7h1V6h1V4H2V3H1z" fill="#D9475A" stroke="#1F2A5C" stroke-width=".5"/></svg></span>';
  function slotHTML(it, hitSet) {
    let cls = 'slot', extra = '';
    if (it.mark === 'borrowed') cls += ' out';
    if (it.mark === 'broken') extra = BROKEN_X;
    if (it.mark === 'issue') extra = '<span class="bang">!</span>';
    if (it.mark === 'low') extra = '<span class="tag">LOW</span>';
    if (hitSet) cls += hitSet.has(it.id) ? ' hit' : ' dim';
    const count = it.count != null && it.mark !== 'borrowed' ? `<span class="q">${it.count}</span>` : '';
    const img = sprite(it) ? `<img class="px" src="${sprite(it)}" alt="">` : '';
    return `<button class="${cls}" data-act="pin" data-id="${it.id}" aria-pressed="${ui.pin === it.id}" aria-label="${esc(it.name)}, drawer ${it.drawer}" tabindex="-1">${img}${extra}${count}</button>`;
  }

  function renderGrid() {
    const q = ui.q.trim();
    const found = q ? items.filter((it) => matches(it, q)) : null;
    const hitSet = found ? new Set(found.map((i) => i.id)) : null;
    const list = items.filter(inTab), c = cols();
    const g = $('#grid');
    g.style.setProperty('--cols', c);

    // fill the visible area with empty slots so the window never changes size
    const slot = (g.clientWidth - 16 - 6 * (c - 1)) / c;
    const fitRows = Math.ceil((g.clientHeight - 16 + 6) / (slot + 6));
    const rows = Math.max(fitRows, Math.ceil(list.length / c));
    const fits = Math.ceil(list.length / c) * (slot + 6) - 6 + 16 <= g.clientHeight;
    g.classList.toggle('fits', fits);

    let html = list.map((it) => slotHTML(it, hitSet)).join('');
    for (let i = list.length; i < rows * c; i++) html += '<span class="slot empty" aria-hidden="true"></span>';
    const keep = ui.keepScroll && !fits ? g.scrollTop : 0;
    g.innerHTML = html;
    g.scrollTop = keep;
    ui.keepScroll = false;
    syncBar();

    const first = g.querySelector(`button.slot[data-id="${ui.pin}"]`) || g.querySelector('button.slot.hit') || g.querySelector('button.slot');
    if (first) first.setAttribute('tabindex', '0');

    $('#tabs').innerHTML = TABS.map((t) => {
      const n = t.key === 'all' ? items.length : items.filter((i) => i.tab === t.key).length;
      return `<button class="tab" role="tab" data-act="tab" data-v="${t.key}" aria-selected="${ui.tab === t.key}">${t.label}<small>${n}</small></button>`;
    }).join('');
    $('#partcount').textContent = `${list.length} / ${items.length}`;
    $('#clr').hidden = !q;

    const m = $('#msg');
    if (!q) m.innerHTML = 'Hover or tap a part to see where it lives.';
    else if (!found.length) m.innerHTML = `Nothing like <em>“${esc(q)}”</em> in the lab yet.`;
    else m.innerHTML = `<em>${found.length} match${found.length > 1 ? 'es' : ''}</em> · ${[...new Set(found.map((i) => 'drawer ' + i.drawer))].slice(0, 4).join(', ')}`;

    if (q && found && found.length) {
      const h = g.querySelector('button.slot.hit');
      if (h) h.scrollIntoView({ block: 'nearest' });
    }
    if (ui.pin) {
      const el = g.querySelector(`button.slot[data-id="${ui.pin}"]`);
      el ? showTip(el, true) : unpin();
    }
  }

  function syncBar() {
    const g = $('#grid'), b = $('#sbar'), t = b.firstElementChild, max = g.scrollHeight - g.clientHeight;
    const off = max <= 1 || g.classList.contains('fits');
    b.classList.toggle('off', off);
    if (off) return;
    const track = b.clientHeight - 4, h = Math.max(18, (track * g.clientHeight) / g.scrollHeight);
    t.style.height = h + 'px';
    t.style.top = 2 + ((track - h) * g.scrollTop) / max + 'px';
  }

  /* ---------- tooltip ---------- */
  function tipHTML(it, pinned) {
    return `<span class="n">${esc(it.name)}</span>${pinned ? '<button class="x" data-act="unpin" aria-label="Close">✕</button>' : ''}
      <span class="ic">${sprite(it, 1) ? `<img class="px" src="${sprite(it, 1)}" alt="">` : ''}</span>
      <div><p>Lives in <em>drawer ${esc(it.drawer)}</em>.</p><p class="s">${esc(DRAWERS[it.drawer] || '')}</p></div>`;
  }
  function showTip(el, pinned) {
    const it = byId(el.dataset.id), t = $('#tip');
    t.innerHTML = tipHTML(it, pinned);
    t.classList.toggle('pinned', !!pinned);
    t.hidden = false;
    const r = el.getBoundingClientRect(), tw = t.offsetWidth, th = t.offsetHeight, gap = 10;
    let x, y;
    if (r.right + gap + tw <= innerWidth - 8) { x = r.right + gap; y = r.top; }
    else if (r.left - gap - tw >= 8) { x = r.left - gap - tw; y = r.top; }
    else { x = r.left + r.width / 2 - tw / 2; y = r.bottom + gap; if (y + th > innerHeight - 8) y = r.top - gap - th; }
    x = Math.min(Math.max(8, x), innerWidth - tw - 8);
    y = Math.min(Math.max(8, y), innerHeight - th - 8);
    t.style.left = x + 'px';
    t.style.top = y + 'px';
  }
  const pinnedEl = () => document.querySelector(`#grid button.slot[data-id="${ui.pin}"]`);
  function hideTip() {
    if (ui.pin && pinnedEl()) return showTip(pinnedEl(), true);
    $('#tip').hidden = true;
  }
  function pin(id) {
    ui.pin = id;
    document.querySelectorAll('#grid button.slot').forEach((b) => b.setAttribute('aria-pressed', b.dataset.id === id));
    const el = pinnedEl();
    if (el) showTip(el, true);
  }
  function unpin() {
    ui.pin = null;
    document.querySelectorAll('#grid button.slot[aria-pressed="true"]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    $('#tip').hidden = true;
  }

  /* ---------- events ---------- */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el) { if (!e.target.closest('#tip')) unpin(); return; }
    switch (el.dataset.act) {
      case 'tab': ui.tab = el.dataset.v; unpin(); renderGrid(); break;
      case 'pin': ui.pin === el.dataset.id ? unpin() : pin(el.dataset.id); break;
      case 'unpin': unpin(); break;
      case 'clearq': ui.q = ''; $('#q').value = ''; renderGrid(); $('#q').focus(); break;
    }
  });

  $('#q').addEventListener('input', (e) => {
    ui.q = e.target.value;
    if (ui.q.trim()) ui.tab = 'all';
    unpin();
    renderGrid();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (ui.pin) return unpin();
      if (ui.q) { ui.q = ''; $('#q').value = ''; renderGrid(); }
      return;
    }
    if (e.key === 'Enter' && e.target.id === 'q') {
      const f = document.querySelector('#grid button.slot.hit');
      if (f) { f.focus(); pin(f.dataset.id); }
      return;
    }
    const s = e.target.closest && e.target.closest('#grid button.slot');
    if (s && ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      const all = [...document.querySelectorAll('#grid button.slot')], i = all.indexOf(s), c = cols();
      const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'ArrowDown' ? i + c : i - c;
      if (all[n]) {
        all.forEach((b) => b.setAttribute('tabindex', '-1'));
        all[n].setAttribute('tabindex', '0');
        all[n].focus();
        all[n].scrollIntoView({ block: 'nearest' });
      }
    }
    if (e.key === '/' && document.activeElement.id !== 'q') { e.preventDefault(); $('#q').focus(); }
  });

  const canHover = matchMedia('(hover: hover)').matches;
  document.addEventListener('mouseover', (e) => {
    if (!canHover) return;
    const s = e.target.closest('#grid button.slot');
    if (s) showTip(s, ui.pin === s.dataset.id);
    else if (!e.target.closest('#tip')) hideTip();
  });
  document.addEventListener('focusin', (e) => {
    const s = e.target.closest('#grid button.slot');
    if (s) showTip(s, ui.pin === s.dataset.id);
  });

  $('#grid').addEventListener('scroll', () => {
    syncBar();
    if (!ui.pin) { $('#tip').hidden = true; return; }
    const el = pinnedEl();
    if (!el) return;
    const g = $('#grid').getBoundingClientRect(), r = el.getBoundingClientRect();
    if (r.bottom < g.top + 4 || r.top > g.bottom - 4) unpin();
    else showTip(el, true);
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (ui.pin && pinnedEl()) showTip(pinnedEl(), true);
    else $('#tip').hidden = true;
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { ui.keepScroll = true; renderGrid(); }, 80);
  });

  renderGrid();
  loadSprites();
})();
