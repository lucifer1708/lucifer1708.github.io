(() => {
  'use strict';

  const C = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const rand = (a, b) => a + Math.random() * (b - a);
  const T0 = Date.now();
  const USER = C.handle, HOST = C.hostname;
  const KERNEL = '6.9.420-portfolio';
  const THEMES = ['matrix', 'amber', 'vampire', 'arctic', 'retro', 'cyberpunk'];
  const WS = [
    { n: 1, name: 'term', title: `${USER}@${HOST}: ~` },
    { n: 2, name: 'projects', title: 'ranger ~/projects' },
    { n: 3, name: 'about', title: 'nvim ~/about.md' },
    { n: 4, name: 'contact', title: '~/contact.sh' },
  ];

  const hash7 = (str) => {
    let h = 2166136261;
    for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
  };
  const uptime = () => {
    const s = Math.floor((Date.now() - T0) / 1000), m = Math.floor(s / 60);
    return m ? `${m} min${m > 1 ? 's' : ''}, ${s % 60} secs` : `${s} secs`;
  };

  /* ═════════════ theme / crt ═════════════ */
  const setTheme = (t) => {
    if (!THEMES.includes(t)) return false;
    document.documentElement.dataset.theme = t;
    localStorage.setItem('theme', t);
    $$('.theme-name').forEach((e) => (e.textContent = t));
    return true;
  };
  setTheme(localStorage.getItem('theme') || 'matrix');
  if (localStorage.getItem('crt') === 'off') document.documentElement.classList.add('no-crt');

  /* ═════════════ big ascii font ═════════════ */
  const FONT = {
    A: '0111010001111111000110001', B: '1111010001111101000111110', C: '0111110000100001000001111',
    D: '1111010001100011000111110', E: '1111110000111101000011111', F: '1111110000111101000010000',
    G: '0111110000100111000101111', H: '1000110001111111000110001', I: '1111100100001000010011111',
    J: '0011100010000101001001100', K: '1001010100110001010010010', L: '1000010000100001000011111',
    M: '1000111011101011000110001', N: '1000111001101011001110001', O: '0111010001100011000101110',
    P: '1111010001111101000010000', Q: '0111010001101011001001101', R: '1111010001111101001010001',
    S: '0111110000011100000111110', T: '1111100100001000010000100', U: '1000110001100011000101110',
    V: '1000110001100010101000100', W: '1000110001101011101110001', X: '1000101010001000101010001',
    Y: '1000101010001000010000100', Z: '1111100010001000100011111', '!': '0010000100001000000000100',
    ' ': '0000000000000000000000000',
  };
  const termCols = () => {
    const o = $('#term-out');
    if (!o) return 80;
    const fs = parseFloat(getComputedStyle(o).fontSize) || 13;
    return Math.floor(o.clientWidth / (fs * 0.6)) - 1;
  };
  const bigText = (str) => {
    const words = str.toUpperCase().split(/\s+/).filter(Boolean);
    const render = (ws) => {
      const rows = ['', '', '', '', ''];
      ws.forEach((w, wi) => {
        for (const ch of w) {
          const g = FONT[ch] || FONT[' '];
          for (let r = 0; r < 5; r++) rows[r] += g.slice(r * 5, r * 5 + 5).replace(/1/g, '█').replace(/0/g, ' ') + ' ';
        }
        if (wi < ws.length - 1) for (let r = 0; r < 5; r++) rows[r] += '  ';
      });
      return rows.map((r) => r.trimEnd()).join('\n');
    };
    const full = render(words);
    if (full.split('\n')[0].length <= termCols()) return full;
    return words.map((w) => render([w])).join('\n\n');
  };

  /* ═════════════ boot ═════════════ */
  function bootLines() {
    const k = [
      `Linux version ${KERNEL} (root@${HOST}) (gcc 14.2.0, GNU ld 2.43) #1 SMP PREEMPT_DYNAMIC`,
      `Command line: BOOT_IMAGE=/vmlinuz-portfolio root=/dev/brain ro quiet splash caffeine=max`,
      `BIOS-e820: [mem 0x0000000000000000-0x00000000c0ffee00] usable`,
      `DMI: Handcrafted/Portfolio, BIOS 1.0 ${new Date().toISOString().slice(0, 10)}`,
      `smpboot: CPU0: Neural Engine (family: 0x6, model: 0x2a, stepping: 0x7) — coffee-cooled`,
      `Memory: 16384K/16777216K available (ideas: unlimited, focus: limited)`,
      `ACPI: Core revision 20261124`,
      `pci 0000:00:1f.0: [8086:c0ff] type 00 class 0x060100 (caffeine controller)`,
      `usb 1-1: new high-speed USB device: Mechanical Keyboard (very clicky)`,
      `EXT4-fs (brain): mounted filesystem with ordered data mode. Quota mode: none.`,
      `random: crng init done (entropy sourced from shower thoughts)`,
    ];
    const svc = ['Journal Service', 'Load Kernel Modules', 'Network Manager', 'Coffee Brewing Daemon',
      'Side Project Scheduler', 'Imposter Syndrome Suppressor', 'Docker Application Container Engine',
      'Bug Detection Service (best effort)', 'Pipewire Audio Server', 'Wayland Compositor (tiling, animated, blurred)', 'waybar, mako, rofi'];
    let t = 0;
    const out = k.map((l) => { t += rand(0.01, 0.35); return `<span class="dim">[${t.toFixed(6).padStart(12)}]</span> ${esc(l)}`; });
    svc.forEach((s, i) => {
      out.push(`<span class="dim">[</span><span class="ok">  OK  </span><span class="dim">]</span> Started <b>${esc(s)}</b>.`);
      if (i === 3) out.push(`<span class="dim">[</span><span class="warn"> WARN </span><span class="dim">]</span> sleep.target not found, continuing anyway.`);
    });
    out.push(`<span class="dim">[</span><span class="ok">  OK  </span><span class="dim">]</span> Reached target <b>Graphical Interface</b>.`);
    return out;
  }

  async function boot() {
    const box = $('#boot'), log = $('#boot-log');
    let skip = sessionStorage.getItem('booted') === '1';
    const onSkip = () => (skip = true);
    ['keydown', 'pointerdown'].forEach((e) => addEventListener(e, onSkip));
    if (!skip) {
      log.innerHTML = `<span class="accent">PortfolioOS</span> loader v1.0 · <span class="dim">press any key to skip</span>\n\n`;
      await sleep(350);
      for (const l of bootLines()) {
        if (skip) break;
        log.innerHTML += l + '\n';
        box.scrollTop = box.scrollHeight;
        await sleep(rand(20, 95));
      }
      if (!skip) {
        log.innerHTML += `\nPortfolioOS 1.0 LTS ${HOST} tty1\n\n${HOST} login: `;
        await sleep(450);
        for (const ch of 'guest') { if (skip) break; log.innerHTML += ch; await sleep(rand(70, 150)); }
        log.innerHTML += `\nPassword: \n<span class="dim">Last login: ${new Date(Date.now() - 2.6e8).toString().slice(0, 24)} on tty1</span>\n`;
        box.scrollTop = box.scrollHeight;
        if (!skip) await sleep(700);
      }
    }
    ['keydown', 'pointerdown'].forEach((e) => removeEventListener(e, onSkip));
    sessionStorage.setItem('booted', '1');
    box.classList.add('out');
    await sleep(skip ? 120 : 400);
    box.remove();
    startDesktop();
  }

  /* ═════════════ desktop building ═════════════ */
  const win = (title, body, cls = '') =>
    `<div class="win ${cls}"><div class="win-bar" title="drag to move · double-click to fullscreen / re-tile"><span class="dots"><i></i><i></i><i></i></span><span class="win-name">${esc(title)}</span><span class="fs-hint">drag · dbl-click ⛶</span></div><div class="win-body">${body}</div><span class="rz" title="drag to resize"></span></div>`;

  const TUX = [
    '        .--.',
    '       |o_o |',
    '       |:_/ |',
    '      //   \\ \\',
    '     (|     | )',
    "    /'\\_   _/`\\",
    '    \\___)=(___/',
  ];
  const kv = (k, v, raw = false) => `<b class="accent">${k}</b>: ${raw ? v : esc(v)}`;
  function neofetchHTML() {
    const info = [
      `<b class="accent">${esc(USER)}</b>@<b class="accent">${esc(HOST)}</b>`,
      '-'.repeat(USER.length + HOST.length + 1),
      kv('OS', 'PortfolioOS 1.0 LTS x86_64'),
      kv('Host', C.name),
      kv('Kernel', KERNEL),
      kv('Uptime', '<span class="uptime"></span>', true),
      kv('Shell', 'zsh 5.9'),
      kv('Role', C.role),
      kv('Location', C.location),
      kv('Editor', C.editor || 'nvim'),
      kv('Stack', C.stack.slice(0, 4).join(', ')),
      kv('Theme', `<span class="theme-name">${esc(document.documentElement.dataset.theme)}</span>`, true),
      '',
      `<span class="blocks">${['--bg', '--err', '--accent', '--warn', '--accent2', '--dim', '--border', '--fg'].map((v, i) => `<i style="background:var(${v});--n:${i}"></i>`).join('')}</span>`,
    ];
    return `<div class="fetch"><pre class="tux">${esc(TUX.join('\n'))}</pre><pre class="info">${info.join('\n')}</pre></div>`;
  }

  function buildDesktop() {
    $('#workspaces').innerHTML = WS.map((w) => `<button data-ws="${w.n}" title="${w.name} (Alt+${w.n})">${w.n}<em>${w.name}</em></button>`).join('');
    $('#wall .wm-name').textContent = C.handle;
    $('#launch-btn').onclick = openLauncher;
    $('#power').onclick = () => runInTerm('reboot');
    $('#workspaces').onclick = (e) => { const b = e.target.closest('button'); if (b) gotoWs(+b.dataset.ws); };
    $('#screens').innerHTML = `
      <section class="screen" data-ws="1">
        <div class="tile t-term">${win(`${USER}@${HOST}: ~ — zsh`, `<div id="term"><div id="term-out"></div><div id="term-line"><span id="prompt"></span><input id="term-in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="terminal input"></div></div>`, 'win-term')}</div>
        <div class="tile t-fetch">${win('neofetch', neofetchHTML())}</div>
        <div class="tile t-top">${win('htop — skills', '<div id="htop"></div>')}</div>
        <div class="tile t-cava">${win('cava ♪ lofi beats to code to', '<div id="cava"></div>')}</div>
      </section>
      <section class="screen" data-ws="2">
        <div class="tile">${win('ranger ~/projects', '<div id="ranger"><ul id="r-list"></ul><div id="r-prev"></div></div>')}</div>
      </section>
      <section class="screen" data-ws="3">
        <div class="tile">${win('nvim ~/about.md', '<div id="vim"></div>')}</div>
        <div class="tile">${win('git log --graph --oneline career', '<div id="gitlog"></div>')}</div>
      </section>
      <section class="screen" data-ws="4">
        <div class="tile">${win('~/contact.sh', '<div id="contact"></div>')}</div>
        <div class="tile">${win('fortune | cowsay', '<pre id="cow" title="click for another fortune"></pre>')}</div>
      </section>`;
    buildHtop(); buildRanger(); buildVim(); buildGit(); buildContact(); newFortune();
    $('#cava').innerHTML = '<i></i>'.repeat(36);
    $('#cow').onclick = newFortune;
    $$('.screen').forEach((s) => $$('.tile', s).forEach((t, i) => {
      t.style.setProperty('--i', i);
      t.addEventListener('pointerenter', () => focusWin(t));   // focus follows mouse
      t.addEventListener('pointerdown', () => focusWin(t));
      $('.win-bar', t).addEventListener('dblclick', () => (t.classList.contains('floating') ? layoutTransition(s, () => unfloat(t)) : toggleFs(t)));
      bindDrag(t);
    }));
  }

  /* ═════════════ wm: focus, fullscreen, scramble ═════════════ */
  function focusWin(tile) {
    if (!tile) return;
    const w = $('.win', tile);
    if (w.classList.contains('focus')) return;
    $$('.win.focus').forEach((x) => x.classList.remove('focus'));
    w.classList.add('focus');
    scramble($('#bar-title'), $('.win-name', tile).textContent);
  }
  const focusedTile = () => $('.win.focus')?.closest('.tile');
  function toggleFs(tile) {
    if (!tile) return;
    const scr = tile.closest('.screen');
    layoutTransition(scr, () => {
      const on = !tile.classList.contains('fs');
      $$('.tile.fs', scr).forEach((t) => t.classList.remove('fs'));
      tile.classList.toggle('fs', on);
      scr.classList.toggle('has-fs', on);
    });
  }
  function layoutTransition(scr, fn) {
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return fn();
    const tiles = $$('.tile', scr);
    tiles.forEach((t, i) => (t.style.viewTransitionName = 'tile' + i));
    const vt = document.startViewTransition(fn);
    vt.ready.catch(() => {});
    vt.finished.catch(() => {}).finally(() => tiles.forEach((t) => (t.style.viewTransitionName = '')));
  }

  /* drag to float · corner to resize · dbl-click / Alt+T to snap back into the tiling */
  let zTop = 10;
  const canFloat = () => !matchMedia('(max-width: 900px)').matches;
  const raise = (tile) => { if (tile.classList.contains('floating')) tile.style.zIndex = ++zTop; };
  function floatTile(tile) {
    if (tile.classList.contains('floating')) return;
    const sr = tile.closest('.screen').getBoundingClientRect(), r = tile.getBoundingClientRect();
    Object.assign(tile.style, { left: r.left - sr.left + 'px', top: r.top - sr.top + 'px', width: r.width + 'px', height: r.height + 'px' });
    tile.classList.add('floating');
  }
  function unfloat(tile) {
    tile.classList.remove('floating');
    ['left', 'top', 'width', 'height', 'zIndex'].forEach((p) => (tile.style[p] = ''));
  }
  function retile(scr = $('.screen.active')) {
    const fl = $$('.tile.floating', scr);
    if (!fl.length) return false;
    layoutTransition(scr, () => fl.forEach(unfloat));
    return true;
  }
  function bindDrag(tile) {
    const start = (e, mode) => {
      if (e.button !== 0 || !canFloat() || tile.classList.contains('fs')) return;
      e.preventDefault();
      focusWin(tile); raise(tile);
      const scr = tile.closest('.screen'), sx = e.clientX, sy = e.clientY;
      let began = false, ox, oy, ow, oh, lastX = sx, vx = 0;
      const wobble = () => {   // velocity-based tilt that settles when the cursor stops
        if (!began || !tile.classList.contains('dragging')) return;
        vx *= 0.85;
        tile.style.setProperty('--tilt', Math.max(-7, Math.min(7, vx)).toFixed(2) + 'deg');
        requestAnimationFrame(wobble);
      };
      const move = (ev) => {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!began) {
          if (Math.hypot(dx, dy) < 4) return;
          began = true; floatTile(tile); raise(tile);
          ox = parseFloat(tile.style.left); oy = parseFloat(tile.style.top); ow = tile.offsetWidth; oh = tile.offsetHeight;
          tile.classList.add(mode === 'move' ? 'dragging' : 'resizing');
          document.body.classList.add('wm-' + mode);
          if (mode === 'move') requestAnimationFrame(wobble);
        }
        const sw = scr.clientWidth, sh = scr.clientHeight;
        if (mode === 'move') {
          tile.style.left = Math.min(Math.max(ox + dx, 80 - ow), sw - 80) + 'px';
          tile.style.top = Math.min(Math.max(oy + dy, 0), sh - 30) + 'px';
          vx += (ev.clientX - lastX) * 0.25; lastX = ev.clientX;
        } else {
          tile.style.width = Math.max(240, Math.min(ow + dx, sw - ox)) + 'px';
          tile.style.height = Math.max(120, Math.min(oh + dy, sh - oy)) + 'px';
        }
      };
      const up = () => {
        removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
        tile.classList.remove('dragging', 'resizing');
        tile.style.setProperty('--tilt', '0deg');
        document.body.classList.remove('wm-move', 'wm-resize');
      };
      addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
    };
    $('.win-bar', tile).addEventListener('pointerdown', (e) => start(e, 'move'));
    $('.rz', tile).addEventListener('pointerdown', (e) => start(e, 'resize'));
    tile.addEventListener('pointerdown', () => raise(tile));
  }
  const GLYPHS = '!<>-_/[]{}=+*^?#░▒▓01';
  function scramble(el, text, frames = 16) {
    if (!el) return;
    const sid = (el._sid = (el._sid || 0) + 1);
    let f = 0;
    const step = () => {
      if (sid !== el._sid) return;
      const p = f / frames;
      el.textContent = [...text].map((c, i) => (c === ' ' || i < p * text.length ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('');
      if (f++ < frames) requestAnimationFrame(step); else el.textContent = text;
    };
    step();
  }

  /* cava */
  let cavaT = 0;
  function tickCava() {
    if (curWs !== 1 || document.hidden) return;
    cavaT += 0.2;
    $$('#cava i').forEach((b, i) => {
      const v = Math.abs(Math.sin(cavaT + i * 0.42) * Math.cos(cavaT * 0.37 + i * 0.13)) * 0.6 + Math.random() * 0.4;
      b.style.transform = `scaleY(${(0.06 + v * 0.94).toFixed(3)})`;
    });
  }

  /* theme with circular reveal from the cursor */
  let ptr = { x: innerWidth / 2, y: innerHeight / 2 };
  function applyTheme(t) {
    if (!THEMES.includes(t)) return false;
    if (t === document.documentElement.dataset.theme) return true;
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return setTheme(t);
    const { x, y } = ptr;
    const vt = document.startViewTransition(() => setTheme(t));
    vt.ready.catch(() => {});
    vt.ready.then(() => {
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 800, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' });
    }, () => {});
    notify(`Theme → ${t}`, 'colours reloaded <span class="dim">(hyprctl reload)</span>', 2200);
    return true;
  }

  /* mako-style notifications */
  function notify(title, body = '', ms = 4000) {
    const box = $('#notify'); if (!box) return;
    const n = document.createElement('div');
    n.className = 'toast';
    n.innerHTML = `<div class="t-head"><span class="t-dot"></span><b>${esc(title)}</b><span class="dim t-time">now</span></div>${body ? `<div class="t-body">${body}</div>` : ''}<div class="t-bar" style="animation-duration:${ms}ms"></div>`;
    box.prepend(n);
    const close = () => { if (n.classList.contains('out')) return; n.classList.add('out'); setTimeout(() => n.remove(), 400); };
    n.onclick = close;
    setTimeout(close, ms);
    while (box.children.length > 4) box.lastChild.remove();
  }

  /* rofi-style launcher */
  let lSel = 0, lItems = [];
  const runInTerm = (cmd) => { gotoWs(1); setTimeout(() => { if (!busy) run(cmd); }, curWs === 1 ? 50 : 450); };
  const launcherItems = () => [
    ...WS.map((w) => ({ icon: w.n, label: `Workspace ${w.n} — ${w.name}`, hint: `Alt+${w.n}`, run: () => gotoWs(w.n) })),
    ...C.projects.map((p) => ({ icon: '◆', label: `Open ${p.name}`, hint: 'project', run: () => { openProject(p); notify(`Launching ${p.name}`, esc(p.url || p.repo || 'no public link')); } })),
    ...THEMES.map((t) => ({ icon: '◐', label: `Theme: ${t}`, hint: 'theme', run: () => applyTheme(t) })),
    { icon: '⛶', label: 'Toggle fullscreen (focused window)', hint: 'Alt+F', run: () => toggleFs(focusedTile()) },
    { icon: '▤', label: 'Re-tile floating windows', hint: 'Alt+T', run: () => retile() || notify('Nothing to re-tile', 'drag a window by its title bar to float it.', 2500) },
    { icon: '▦', label: 'Toggle CRT scanlines', hint: 'crt', run: () => runInTerm('crt') },
    { icon: '⌁', label: 'Matrix rain', hint: 'matrix', run: () => runInTerm('matrix') },
    { icon: '⚡', label: 'Hack the mainframe', hint: 'hack', run: () => runInTerm('hack') },
    { icon: '🚂', label: 'Choo choo', hint: 'sl', run: () => runInTerm('sl') },
    { icon: '☺', label: 'Party mode', hint: 'konami', run: () => toggleParty() },
    { icon: '⏻', label: 'Reboot', hint: 'reboot', run: () => runInTerm('reboot') },
  ];
  const fuzzy = (q, s) => { q = q.toLowerCase(); s = s.toLowerCase(); let i = 0; for (const c of s) if (c === q[i]) i++; return i === q.length; };
  function renderLauncher() {
    const q = $('#l-q').value.trim();
    lItems = launcherItems().filter((it) => !q || fuzzy(q, it.label));
    lSel = Math.max(0, Math.min(lSel, lItems.length - 1));
    $('#l-list').innerHTML = lItems.map((it, i) =>
      `<li class="${i === lSel ? 'sel' : ''}" data-i="${i}" style="--i:${i}"><span class="l-ic">${esc(it.icon)}</span>${esc(it.label)}<span class="l-hint dim">${esc(it.hint || '')}</span></li>`
    ).join('') || '<li class="dim">no matches</li>';
    $('#l-list li.sel')?.scrollIntoView({ block: 'nearest' });
  }
  function openLauncher() {
    const L = $('#launcher');
    L.hidden = false; lSel = 0; $('#l-q').value = ''; renderLauncher();
    requestAnimationFrame(() => L.classList.add('open'));
    $('#l-q').focus();
  }
  function closeLauncher() {
    const L = $('#launcher');
    L.classList.remove('open');
    setTimeout(() => { if (!L.classList.contains('open')) L.hidden = true; }, 300);
  }
  const launcherOpen = () => !$('#launcher').hidden && $('#launcher').classList.contains('open');
  function runItem(it) { if (!it) return; closeLauncher(); setTimeout(it.run, 150); }
  function bindLauncher() {
    const q = $('#l-q');
    q.addEventListener('input', () => { lSel = 0; renderLauncher(); });
    q.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) { e.preventDefault(); lSel = (lSel + 1) % Math.max(1, lItems.length); renderLauncher(); }
      else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) { e.preventDefault(); lSel = (lSel - 1 + lItems.length) % Math.max(1, lItems.length); renderLauncher(); }
      else if (e.key === 'Enter') { e.preventDefault(); runItem(lItems[lSel]); }
      else if (e.key === 'Escape') { e.preventDefault(); closeLauncher(); focusTerm(); }
    });
    $('#l-list').addEventListener('click', (e) => { const li = e.target.closest('li[data-i]'); if (li) runItem(lItems[+li.dataset.i]); });
    $('#launcher').addEventListener('pointerdown', (e) => { if (e.target.id === 'launcher') closeLauncher(); });
  }
  function toggleParty() {
    const on = document.documentElement.classList.toggle('party');
    notify(on ? '🎉 PARTY MODE' : 'Party over', on ? 'konami code accepted. hue-rotate engaged.' : 'back to work.', 2500);
    return on;
  }

  /* htop */
  const PIPES = '|'.repeat(300);
  function buildHtop() {
    $('#htop').innerHTML = C.skills.map((s, i) =>
      `<div class="hbar"><span class="hn">${String(i).padStart(2)}</span><span class="hl">${esc(s.name)}</span><span class="htrack" data-p="  0%"><span class="hf-wrap"><span class="hf">${PIPES}</span></span></span></div>`
    ).join('') + `<div class="hstat">Tasks: <b>${C.projects.length * 7 + 13}</b>, <b>1</b> running · Load avg: <b class="load">0.42</b><br>Uptime: <b class="uptime"></b></div>`;
  }
  function tickHtop() {
    $$('#htop .hbar').forEach((row, i) => {
      const base = C.skills[i].level;
      const v = Math.max(1, Math.min(100, Math.round(base + rand(-4, 4))));
      const f = $('.hf', row);
      f.style.width = v + '%';
      f.className = 'hf' + (v > 88 ? ' hot' : v > 70 ? ' mid' : '');
      $('.htrack', row).dataset.p = String(v).padStart(4) + '%';
    });
    const l = $('#htop .load'); if (l) l.textContent = [rand(0.2, 2), rand(0.2, 2), rand(0.2, 2)].map((x) => x.toFixed(2)).join(' ');
  }

  /* ranger */
  let rSel = 0;
  function buildRanger() {
    $('#r-list').innerHTML = C.projects.map((p, i) => `<li data-i="${i}">▸ ${esc(p.slug)}/</li>`).join('');
    $('#r-list').onclick = (e) => {
      const li = e.target.closest('li'); if (!li) return;
      +li.dataset.i === rSel ? openProject(C.projects[rSel]) : selectProject(+li.dataset.i);
    };
    selectProject(0);
  }
  function selectProject(i) {
    const n = C.projects.length; if (!n) return;
    rSel = (i + n) % n;
    $$('#r-list li').forEach((li, j) => li.classList.toggle('sel', j === rSel));
    const p = C.projects[rSel], prev = $('#r-prev');
    prev.innerHTML = `
      <div class="pv-title">${esc(p.name)}</div>
      <div class="dim">${esc(p.year ?? '')} · ★ ${esc(p.stars ?? 0)} · ~/projects/${esc(p.slug)}</div>
      <p>${esc(p.desc)}</p>
      <div class="tags">${(p.tech || []).map((t, i) => `<span style="--n:${i}">${esc(t)}</span>`).join('')}</div>
      <div class="pv-links">
        ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">[ live ↗ ]</a>` : ''}
        ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">[ source ↗ ]</a>` : ''}
      </div>
      <div class="dim hint">j/k or ↑/↓ move · enter open · ${rSel + 1}/${n}</div>`;
    prev.style.animation = 'none'; void prev.offsetWidth; prev.style.animation = '';
    scramble($('.pv-title', prev), p.name, 20);
  }
  function openProject(p) {
    const u = p.url || p.repo;
    if (u) window.open(u, '_blank', 'noopener');
    return u;
  }

  /* vim */
  function buildVim() {
    const lines = C.about;
    const rows = lines.map((l, i) => {
      const cls = l.startsWith('#') ? 'vh' : l.startsWith('-') ? 'vli' : '';
      return `<div class="vl" style="--d:${i * 35}ms"><span class="ln">${i + 1}</span><span class="${cls}">${esc(l) || ' '}</span></div>`;
    });
    for (let i = 0; i < 5; i++) rows.push(`<div class="vl" style="--d:${(lines.length + i) * 35}ms"><span class="ln tilde">~</span></div>`);
    $('#vim').innerHTML = `<div class="vbody">${rows.join('')}</div>
      <div class="vstatus"><span class="vmode">NORMAL</span><span> main</span><span>about.md</span><span class="vr">${lines.length}L · utf-8 · markdown</span></div>
      <div class="vcmd">"about.md" ${lines.length}L written — type :q to … just kidding, you can't.</div>`;
  }

  /* git log */
  function buildGit() {
    $('#gitlog').innerHTML = C.experience.map((e, i) => `
      <div class="commit" style="--n:${i}"><span class="graph">*</span> <span class="sha">${hash7(e.role + e.org)}</span> ${i === 0 ? '<span class="ref">(<span class="head">HEAD -&gt; main</span>)</span> ' : ''}<b>${esc(e.role)}</b> <span class="dim">@</span> <span class="accent2">${esc(e.org)}</span>
        <div class="cmeta"><span class="graph">|</span> Date: ${esc(e.date)}</div>
        <div class="cmsg"><span class="graph">|</span>     ${esc(e.note)}</div></div>`).join('') +
      `<div class="commit" style="--n:${C.experience.length}"><span class="graph">*</span> <span class="sha">0000000</span> <b>Initial commit</b> <span class="dim">— printf("hello, world\\n");</span></div>`;
  }

  /* contact */
  function buildContact() {
    $('#contact').innerHTML =
      `<div class="dim">#!/usr/bin/env bash</div><div class="dim"># pick a channel. avg response time: faster than CI.</div><br>` +
      C.contact.map((c, i) => `<div class="cline" style="--n:${i}"><span class="accent">$</span> open <span class="cl-label">--${esc(c.label)}</span> <a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.text)}</a></div>`).join('') +
      (C.resume ? `<div class="cline"><span class="accent">$</span> wget <a href="${esc(C.resume)}" target="_blank" rel="noopener">resume.pdf</a></div>` : '') +
      `<br><div class="dim">exit 0</div>`;
  }

  /* cowsay */
  const FORTUNES = [
    "There's no place like 127.0.0.1",
    'It works on my machine. Ship the machine.',
    'Weeks of coding can save you hours of planning.',
    'sudo make me a sandwich',
    'Real programmers count from 0.',
    'Have you tried turning it off and on again?',
    'I use Arch btw.',
    '99 little bugs in the code. Patch one, compile it again: 127 little bugs in the code.',
    'There are 10 kinds of people: those who understand binary and those who do not.',
    'git commit -m "fixed it for real this time"',
    'A user interface is like a joke. If you have to explain it, it is not that good.',
    'Hire me and your on-call pager gets quieter. Probably.',
  ];
  function cowsay(text, width = 34) {
    const lines = []; let cur = '';
    for (const w of text.split(/\s+/)) {
      if (cur && (cur + ' ' + w).length > width) { lines.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w;
    }
    if (cur) lines.push(cur);
    const m = Math.max(...lines.map((l) => l.length));
    const body = lines.length === 1 ? [`< ${lines[0]} >`] : lines.map((l, i) => {
      const [a, b] = i === 0 ? ['/', '\\'] : i === lines.length - 1 ? ['\\', '/'] : ['|', '|'];
      return `${a} ${l.padEnd(m)} ${b}`;
    });
    return [' ' + '_'.repeat(m + 2), ...body, ' ' + '-'.repeat(m + 2),
      '        \\   ^__^', '         \\  (oo)\\_______', '            (__)\\       )\\/\\', '                ||----w |', '                ||     ||'].join('\n');
  }
  const fortune = () => FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  function newFortune() { $('#cow').textContent = cowsay(fortune()); }

  /* ═════════════ workspaces ═════════════ */
  let curWs = 1;
  function gotoWs(n, first = false) {
    n = +n;
    const w = WS.find((x) => x.n === n);
    if (!w) return false;
    const next = $(`.screen[data-ws="${n}"]`), old = $(`.screen[data-ws="${curWs}"]`);
    if (first) next.classList.add('active', 'pop');
    else if (n !== curWs) {
      const dir = n > curWs ? 1 : -1;
      $$('.screen').forEach((s) => { s.classList.remove('pop'); s.style.setProperty('--dir', dir); });
      old.classList.remove('active'); old.classList.add('leaving');
      clearTimeout(old._lt); old._lt = setTimeout(() => old.classList.remove('leaving'), 650);
      next.classList.remove('leaving'); next.classList.add('active');
    }
    curWs = n;
    $$('#workspaces button').forEach((b) => b.classList.toggle('active', +b.dataset.ws === n));
    $$('.win.focus').forEach((x) => x.classList.remove('focus'));
    focusWin($('.tile', next));
    history.replaceState(null, '', '#' + w.name);
    if (n === 1) focusTerm();
    if (n === 3) buildVim();
    return true;
  }

  /* ═════════════ terminal ═════════════ */
  let cwd = '~', busy = false;
  const hist = []; let hi = 0;
  const inp = () => $('#term-in');
  const promptHTML = () => `<span class="p-user">${esc(USER)}@${esc(HOST)}</span><span class="dim">:</span><span class="p-path">${esc(cwd)}</span><span class="dim">$</span>`;
  const setPrompt = () => ($('#prompt').innerHTML = promptHTML());
  const scrollTerm = () => { const b = $('#term').closest('.win-body'); b.scrollTop = b.scrollHeight; };
  function print(html = '', cls = '') {
    const d = document.createElement('div');
    d.className = 'line ' + cls;
    d.innerHTML = html;
    $('#term-out').appendChild(d);
    scrollTerm();
    return d;
  }
  const focusTerm = () => { if (matchMedia('(pointer: fine)').matches) inp()?.focus({ preventScroll: true }); };
  const clear = () => ($('#term-out').innerHTML = '');
  const cmdLink = (c, label = c) => `<a class="cmd" data-cmd="${esc(c)}">${esc(label)}</a>`;

  /* virtual fs */
  const projText = (p) => [`# ${p.name}`, '', p.desc, '', `tech:   ${(p.tech || []).join(', ')}`, p.url ? `live:   ${p.url}` : '', p.repo ? `source: ${p.repo}` : ''].filter((x, i) => x || i < 4).join('\n');
  const skillsText = () => C.skills.map((s) => `${s.name.padEnd(13)} ${'█'.repeat(Math.round(s.level / 5)).padEnd(20, '░')} ${s.level}%`).join('\n') + `\n\nstack: ${C.stack.join(' · ')}`;
  const gitText = () => C.experience.map((e) => `* ${hash7(e.role + e.org)} ${e.role} @ ${e.org}\n|   Date: ${e.date}\n|   ${e.note}`).join('\n') + '\n* 0000000 Initial commit';
  const contactText = () => C.contact.map((c) => `${c.label.padEnd(10)} ${c.text}`).join('\n');
  const SECRET = "🔑 you found the secret file.\n\n  → try: hack, matrix, sl, cowsay, sudo rm -rf /\n  → or the Konami code: ↑ ↑ ↓ ↓ ← → ← → b a";
  const HOME = {
    'about.md': () => C.about.join('\n'),
    'skills.txt': skillsText,
    'experience.log': gitText,
    'contact.txt': contactText,
    '.secret': () => SECRET,
    ...(C.resume ? { 'resume.pdf': () => '%PDF-1.7 ... binary garbage. try: resume' } : {}),
  };
  const PROJ = () => Object.fromEntries(C.projects.map((p) => [p.slug + '.md', () => projText(p)]));
  function resolve(p = '') {
    const base = p.startsWith('~') ? p.slice(1) : (cwd === '~' ? '' : cwd.slice(2)) + '/' + p;
    const st = [];
    for (const x of base.split('/').filter(Boolean)) { if (x === '.') continue; if (x === '..') st.pop(); else st.push(x); }
    if (st.length === 0) return { dir: '~', files: HOME, sub: { projects: 1 } };
    if (st.length === 1 && st[0] === 'projects') return { dir: '~/projects', files: PROJ(), sub: {} };
    if (st.length === 1 && HOME[st[0]]) return { file: HOME[st[0]] };
    if (st.length === 2 && st[0] === 'projects' && PROJ()[st[1]]) return { file: PROJ()[st[1]] };
    return null;
  }

  const CMDS = {
    help: { d: 'list available commands', f() {
      const rows = Object.entries(CMDS).filter(([, c]) => c.d).map(([k, c]) => `  ${cmdLink(k)}${' '.repeat(Math.max(1, 12 - k.length))}<span class="dim">${esc(c.d)}</span>`);
      print(`<b>Available commands</b> <span class="dim">(click or type)</span>\n${rows.join('\n')}\n\n<span class="dim">Tab autocompletes · ↑/↓ history · Ctrl+L clear · Alt+1..4 / Alt+←→ workspaces · Alt+Space launcher · Alt+F fullscreen · drag title bars to float, Alt+T re-tile · there are hidden commands 👀</span>`);
    } },
    about: { d: 'who is this person', f() { CMDS.cat.f(['~/about.md']); } },
    whoami: { d: 'print effective user', f() { print(`${esc(USER)}  <span class="dim"># ${esc(C.name)} — ${esc(C.role)}, ${esc(C.location)}</span>`); } },
    projects: { d: 'things I built', f() {
      print(C.projects.map((p, i) => `  <span class="dim">[${i + 1}]</span> ${cmdLink('open ' + p.slug, p.name)}  <span class="dim">${esc(p.year ?? '')}</span>\n      ${esc(p.desc)}\n      <span class="accent2">${esc((p.tech || []).join(' · '))}</span>`).join('\n\n') +
        `\n\n<span class="dim">open &lt;n|name&gt; to launch · ${cmdLink('ws 2', 'ws 2')} for the file-manager view</span>`);
    } },
    open: { d: 'open a project: open <n|name>', f(a) {
      const q = (a[0] || '').replace(/\.md$/, '').replace(/^projects\//, '');
      const p = C.projects[+q - 1] || C.projects.find((x) => x.slug === q || x.name.toLowerCase() === q.toLowerCase());
      if (!p) return print(`open: '${esc(q || '')}': no such project. try ${cmdLink('projects')}`, 'err');
      const u = openProject(p);
      print(u ? `xdg-open: launching <a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a>` : `${esc(p.name)}: no public link (yet) 🔒`);
    } },
    skills: { d: 'tech I know', f() {
      print(C.skills.map((s) => {
        const n = Math.round(s.level / 5);
        return `  <span class="accent2">${esc(s.name.padEnd(13))}</span><span class="accent">${'█'.repeat(n)}</span><span class="dim">${'░'.repeat(20 - n)}</span> ${s.level}%`;
      }).join('\n') + `\n\n  <span class="dim">stack:</span> ${esc(C.stack.join(' · '))}`);
    } },
    experience: { d: 'career, as a git log', f() {
      print(C.experience.map((e, i) => `<span class="warn">* ${hash7(e.role + e.org)}</span> ${i === 0 ? '<span class="accent2">(HEAD -&gt; main)</span> ' : ''}<b>${esc(e.role)}</b> @ <span class="accent2">${esc(e.org)}</span>\n<span class="warn">|</span>   <span class="dim">Date: ${esc(e.date)}</span>\n<span class="warn">|</span>   ${esc(e.note)}`).join('\n') + `\n<span class="warn">* 0000000</span> Initial commit`);
    } },
    contact: { d: 'ways to reach me', f() {
      print(C.contact.map((c) => `  <span class="warn">${esc(c.label.padEnd(10))}</span><a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.text)}</a>`).join('\n'));
    } },
    resume: { d: 'download my resume', f() {
      if (!C.resume) return print('resume: not uploaded yet — ask me directly via ' + cmdLink('contact'), 'warn');
      window.open(C.resume, '_blank', 'noopener'); print(`wget: saving '<a href="${esc(C.resume)}" target="_blank">resume.pdf</a>' … done.`);
    } },
    neofetch: { d: 'system info', f() { print(neofetchHTML()); tickBar(); } },
    ls: { d: 'list directory', f(a) {
      const flags = a.filter((x) => x.startsWith('-')).join(''), path = a.find((x) => !x.startsWith('-')) || '';
      const r = resolve(path);
      if (!r) return print(`ls: cannot access '${esc(path)}': No such file or directory`, 'err');
      if (r.file) return print(esc(path));
      const all = flags.includes('a'), long = flags.includes('l');
      const entries = [...Object.keys(r.sub).map((d) => [d, true]), ...Object.keys(r.files).map((f) => [f, false])].filter(([n]) => all || !n.startsWith('.'));
      if (all) entries.unshift(['.', true], ['..', true]);
      const date = new Date().toLocaleString('en-US', { month: 'short', day: '2-digit' }) + ' 13:37';
      const name = ([n, d]) => d ? `<span class="dir">${esc(n)}/</span>` : esc(n);
      if (long) {
        print(`total ${entries.length * 4}\n` + entries.map(([n, d]) => {
          const size = d ? '4.0K' : ((r.files[n]?.().length || 0) / 1024).toFixed(1) + 'K';
          return `<span class="dim">${d ? 'drwxr-xr-x' : '-rw-r--r--'} 1 ${esc(USER)} ${esc(USER)}</span> ${size.padStart(5)} <span class="dim">${date}</span> ${name([n, d])}`;
        }).join('\n'));
      } else print(`<div class="lscols">${entries.map((e) => `<span>${name(e)}</span>`).join('')}</div>`);
    } },
    cd: { d: 'change directory', f(a) {
      const r = resolve(a[0] || '~');
      if (!r) return print(`cd: no such file or directory: ${esc(a[0])}`, 'err');
      if (r.file) return print(`cd: not a directory: ${esc(a[0])}`, 'err');
      cwd = r.dir; setPrompt();
    } },
    pwd: { d: '', f() { print(`/home/${esc(USER)}${esc(cwd.slice(1))}`); } },
    cat: { d: 'print a file', f(a) {
      if (!a.length) return print('cat: missing operand. try: ' + cmdLink('cat about.md'), 'err');
      for (const p of a) {
        const r = resolve(p);
        if (!r) print(`cat: ${esc(p)}: No such file or directory`, 'err');
        else if (!r.file) print(`cat: ${esc(p)}: Is a directory`, 'err');
        else print(esc(r.file()));
      }
    } },
    theme: { d: 'theme [name] — recolor everything', f(a) {
      if (a[0] && applyTheme(a[0])) return print(`theme → <span class="accent">${esc(a[0])}</span>`);
      if (a[0]) print(`theme: unknown theme '${esc(a[0])}'`, 'err');
      const cur = document.documentElement.dataset.theme;
      print('themes: ' + THEMES.map((t) => t === cur ? `<b class="accent">[${t}]</b>` : cmdLink('theme ' + t, t)).join('  '));
    } },
    crt: { d: 'toggle CRT scanlines', f() {
      const off = document.documentElement.classList.toggle('no-crt');
      localStorage.setItem('crt', off ? 'off' : 'on');
      print(`crt: ${off ? 'off — welcome to the future' : 'on — welcome back to 1985'}`);
    } },
    matrix: { d: 'follow the white rabbit', f() { matrix(); } },
    hack: { d: 'hack the mainframe', async f() { await hack(); } },
    cowsay: { d: 'cowsay [text]', f(a) { print(esc(cowsay(a.join(' ') || fortune()))); } },
    fortune: { d: 'random wisdom', f() { print(esc(fortune())); } },
    banner: { d: 'banner <text>', f(a) { print(`<span class="big">${esc(bigText(a.join(' ') || C.name))}</span>`); } },
    ws: { d: 'switch workspace: ws <1-4>', f(a) { if (!gotoWs(a[0])) print('usage: ws <1-4>  (' + WS.map((w) => `${w.n}:${w.name}`).join(' ') + ')', 'err'); } },
    history: { d: '', f() { print(hist.map((h, i) => `${String(i + 1).padStart(4)}  ${esc(h)}`).join('\n')); } },
    echo: { d: '', f(a) { print(esc(a.join(' ').replace(/\$USER/g, USER).replace(/\$HOME/g, '/home/' + USER))); } },
    date: { d: '', f() { print(esc(new Date().toString())); } },
    uname: { d: '', f(a) { print(a.includes('-a') ? `Linux ${esc(HOST)} ${KERNEL} #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux` : 'Linux'); } },
    uptime: { d: '', f() { print(` ${new Date().toTimeString().slice(0, 8)} up ${uptime()},  1 user,  load average: 0.42, 0.13, 0.37`); } },
    clear: { d: 'clear the screen', f: clear },
    tile: { d: 'snap floating windows back', f() { print(retile() ? 'hyprctl dispatch retile → ok' : 'no floating windows. drag a title bar to float one.'); } },
    sudo: { d: '', async f(a, line) {
      print(`[sudo] password for ${esc(USER)}: `);
      await sleep(700);
      if (/rm\s+-(rf|fr)\s+\/(\s|$|\*)/.test(line)) return meltdown();
      print(`<span class="err">${esc(USER)} is not in the sudoers file. This incident will be reported. 🚨</span>`);
    } },
    rm: { d: '', f(a, line) { /-(rf|fr)\s+\//.test(line) ? print('rm: it is dangerous to operate recursively on \'/\'. (nice try — use sudo 😈)', 'warn') : print('rm: permission denied. this portfolio is read-only.', 'err'); } },
    vim: { d: '', f() { print('entering vim… you may never leave. opening about.md'); setTimeout(() => gotoWs(3), 500); } },
    emacs: { d: '', f() { print('emacs: command not found. this is a vim household.', 'warn'); } },
    nano: { d: '', f() { print('nano? respectable choice. still opening vim though.'); setTimeout(() => gotoWs(3), 600); } },
    sl: { d: '', async f() { await train(); } },
    exit: { d: '', f() { print('logout\n<span class="dim">…there is no escape. you live here now. 🐧</span>'); shake(500); } },
    reboot: { d: 'reboot the system', async f() {
      print('<span class="warn">Broadcast message from root@' + esc(HOST) + ': The system is going down for reboot NOW!</span>');
      sessionStorage.removeItem('booted'); await sleep(1200); location.reload();
    } },
    ping: { d: '', async f(a) {
      const h = a[0] || 'google.com';
      print(`PING ${esc(h)} (127.0.0.1): 56 data bytes`);
      for (let i = 0; i < 4; i++) { await sleep(450); print(`64 bytes from ${esc(h)}: icmp_seq=${i} ttl=64 time=${rand(4, 30).toFixed(3)} ms`); }
      print(`--- ${esc(h)} ping statistics ---\n4 packets transmitted, 4 received, 0.0% packet loss`);
    } },
    pacman: { d: '', f() { print('error: you cannot perform this operation unless you are root.\n<span class="dim">(but yes, I use Arch btw)</span>'); } },
    man: { d: '', f(a) { print(a[0] ? `No manual entry for ${esc(a[0])}. Try ${cmdLink('help')}.` : 'What manual page do you want? Try ' + cmdLink('help')); } },
    hello: { d: '', f() { print(`hey there 👋 — I'm ${esc(C.name.split(' ')[0])}. type ${cmdLink('about')} or ${cmdLink('projects')}.`); } },
    coffee: { d: '', f() { print(esc('      ( (\n       ) )\n    ........\n    |      |]\n    \\      /\n     `----\'\n\nbrewing… ☕ productivity +40%')); } },
  };
  const ALIASES = { ll: 'ls -la', la: 'ls -a', vi: 'vim', nvim: 'vim', hi: 'hello', apt: 'pacman', 'apt-get': 'pacman', yay: 'pacman', cls: 'clear', '?': 'help', git: 'experience', top: 'skills', htop: 'skills', email: 'contact', goto: 'ws', screenfetch: 'neofetch', fastfetch: 'neofetch' };

  async function run(raw, echo = true) {
    if (echo) print(`${promptHTML()} ${esc(raw)}`);
    let line = raw.trim();
    if (!line) return;
    hist.push(line); hi = hist.length;
    let [cmd, ...args] = line.split(/\s+/);
    cmd = cmd.toLowerCase();
    if (ALIASES[cmd]) { const [c2, ...a2] = ALIASES[cmd].split(' '); cmd = c2; args = [...a2, ...args]; line = [c2, ...a2, ...line.split(/\s+/).slice(1)].join(' '); }
    const c = CMDS[cmd];
    if (!c) {
      const close = Object.keys(CMDS).find((k) => k.startsWith(cmd.slice(0, 2)) && CMDS[k].d);
      return print(`zsh: command not found: ${esc(cmd)}${close ? `  <span class="dim">— did you mean</span> ${cmdLink(close)}<span class="dim">?</span>` : `  <span class="dim">— try</span> ${cmdLink('help')}`}`, 'err');
    }
    busy = true; $('#term-line').classList.add('busy');
    try { await c.f(args, line); } finally {
      busy = false; $('#term-line').classList.remove('busy'); scrollTerm(); if (curWs === 1) focusTerm();
    }
  }

  function complete() {
    const el = inp(), v = el.value, parts = v.split(/\s+/);
    let pool, last = parts[parts.length - 1];
    if (parts.length === 1) pool = Object.keys(CMDS).concat(Object.keys(ALIASES));
    else {
      const c = parts[0];
      if (c === 'theme') pool = THEMES;
      else if (c === 'open') pool = C.projects.map((p) => p.slug);
      else if (c === 'ws') pool = WS.map((w) => String(w.n));
      else {
        const slash = last.lastIndexOf('/'), dirPart = slash >= 0 ? last.slice(0, slash + 1) : '';
        const r = resolve(dirPart || '.');
        pool = r && !r.file ? [...Object.keys(r.sub).map((d) => dirPart + d + '/'), ...Object.keys(r.files).map((f) => dirPart + f)] : [];
      }
    }
    const m = pool.filter((x) => x.startsWith(last));
    if (m.length === 1) { parts[parts.length - 1] = m[0]; el.value = parts.join(' ') + (m[0].endsWith('/') ? '' : ' '); }
    else if (m.length > 1) {
      let pre = m[0]; for (const x of m) while (!x.startsWith(pre)) pre = pre.slice(0, -1);
      if (pre.length > last.length) { parts[parts.length - 1] = pre; el.value = parts.join(' '); }
      else print(`${promptHTML()} ${esc(v)}\n<div class="lscols">${m.map((x) => `<span>${esc(x)}</span>`).join('')}</div>`);
    }
  }

  function bindTerm() {
    const el = inp();
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); if (busy) return; const v = el.value; el.value = ''; run(v); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (hi > 0) el.value = hist[--hi]; }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (hi < hist.length - 1) el.value = hist[++hi]; else { hi = hist.length; el.value = ''; } }
      else if (e.key === 'Tab') { e.preventDefault(); complete(); }
      else if (e.ctrlKey && e.key === 'l') { e.preventDefault(); clear(); }
      else if (e.ctrlKey && e.key === 'c') { e.preventDefault(); print(`${promptHTML()} ${esc(el.value)}^C`); el.value = ''; }
    });
    $('.win-term').addEventListener('click', () => { if (!getSelection().toString()) el.focus({ preventScroll: true }); });
    $('#screens').addEventListener('click', (e) => {
      const a = e.target.closest('a.cmd'); if (!a || busy) return;
      e.preventDefault(); if (curWs !== 1) gotoWs(1); run(a.dataset.cmd);
    });
  }

  async function typeCmd(s) {
    const el = inp();
    for (const ch of s) { el.value += ch; await sleep(rand(55, 120)); }
    await sleep(250); el.value = '';
    await run(s);
  }

  /* ═════════════ effects ═════════════ */
  const shake = (ms) => { document.body.classList.add('shake'); setTimeout(() => document.body.classList.remove('shake'), ms); };

  let stopMatrix = null, mxStart = 0;
  function matrix(ms = 9000) {
    if (stopMatrix) stopMatrix();
    const cv = $('#matrix'), ctx = cv.getContext('2d');
    cv.width = innerWidth; cv.height = innerHeight;
    const fs = 16, cols = Math.ceil(cv.width / fs);
    const drops = Array.from({ length: cols }, () => rand(-60, 0));
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF<>/{}$#*+=';
    const color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    ctx.fillStyle = '#000'; ctx.globalAlpha = 1; ctx.fillRect(0, 0, cv.width, cv.height);
    cv.classList.add('on'); mxStart = Date.now();
    const id = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.09)'; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = `${fs}px "JetBrains Mono", monospace`;
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * fs;
        ctx.fillStyle = Math.random() > 0.96 ? '#fff' : color;
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fs, y);
        if (y > cv.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 40);
    const stop = () => { clearInterval(id); cv.classList.remove('on'); stopMatrix = null; setTimeout(() => ctx.clearRect(0, 0, cv.width, cv.height), 500); };
    stopMatrix = stop;
    setTimeout(() => stopMatrix === stop && stop(), ms);
    print('<span class="dim">wake up, neo… (press any key to exit)</span>');
  }

  async function hack() {
    for (const s of ['Initializing exploit framework', 'Bypassing firewall', 'Brute-forcing mainframe', 'Injecting payload', 'Covering tracks']) {
      const l = print();
      for (let i = 0; i <= 20; i++) {
        l.innerHTML = `<span class="accent">[*]</span> ${s.padEnd(32)}[<span class="accent">${'#'.repeat(i)}</span>${'.'.repeat(20 - i)}] ${String(i * 5).padStart(3)}%`;
        scrollTerm(); await sleep(rand(12, 45));
      }
    }
    for (let i = 0; i < 10; i++) { print(`<span class="dim">${Array.from({ length: 6 }, () => Math.random().toString(16).slice(2, 10)).join(' ')}</span>`); await sleep(35); }
    shake(400);
    print(`<span class="big">${esc(bigText('ACCESS GRANTED'))}</span>`);
    print('<span class="dim">(relax, nothing was hacked. but you\'re clearly hireable.)</span>');
    notify('⚠ Intrusion detected', 'just kidding. root access granted to <b>guest</b>.', 3500);
  }

  async function train() {
    const art = [
      '      ooOOOO',
      '     oo        _____',
      '    _I__n_n__||_|| ________   ________',
      '  >(_________|_7_| |  [] []| |  [] []|',
      '   /o ()() ()() o  |_______|-|_______|',
      '                    O    O    O    O',
    ].join('\n');
    const l = print(`<span class="train">${esc(art)}</span>`, 'trainwrap');
    await sleep(4500);
    l.remove();
    print('<span class="dim">choo choo 🚂 (you meant</span> ' + cmdLink('ls') + '<span class="dim">)</span>');
  }

  async function meltdown() {
    const dirs = ['/bin', '/boot', '/dev', '/etc', `/home/${USER}/projects`, '/lib', '/opt', '/usr/bin', '/usr/lib', '/var/log', `/home/${USER}/.ssh`, `/home/${USER}`];
    for (let i = 0; i < 45; i++) { print(`<span class="err">removed '${dirs[i % dirs.length]}/${Math.random().toString(36).slice(2, 9)}'</span>`); await sleep(28); }
    document.body.classList.add('shake', 'glitch');
    await sleep(1000);
    const p = document.createElement('div');
    p.id = 'panic';
    p.innerHTML = `<pre><span class="err">Kernel panic - not syncing: Attempted to kill init! exitcode=0x0000000b</span>

CPU: 0 PID: 1 Comm: portfolio Not tainted ${KERNEL} #1
Hardware name: Handcrafted/Portfolio, BIOS 1.0
Call Trace:
 &lt;TASK&gt;
 dump_stack_lvl+0x48/0x70
 panic+0x1337/0xdead
 do_exit+0xbeef/0xcafe
 rm_rf_root+0x42/0x42 [sudo]
 guest_curiosity+0xff/0xff
 &lt;/TASK&gt;
---[ end Kernel panic - not syncing: Attempted to kill init! ]---

<span class="dim">rebooting from backup in 3…</span></pre>`;
    document.body.appendChild(p);
    await sleep(3200);
    p.remove();
    document.body.classList.remove('shake', 'glitch');
    clear();
    print('<span class="ok">✔ system restored from backup.</span> <span class="dim">nothing was actually deleted. please never run that on a real machine.</span>');
  }

  /* konami */
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let kIdx = 0;

  /* global keys */
  function bindGlobal() {
    addEventListener('keydown', (e) => {
      if (stopMatrix && Date.now() - mxStart > 400) { stopMatrix(); return; }
      if ((e.altKey && e.code === 'Space') || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault(); launcherOpen() ? closeLauncher() : openLauncher(); return;
      }
      if (launcherOpen()) return;
      kIdx = e.key === KONAMI[kIdx] ? kIdx + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (kIdx === KONAMI.length) { kIdx = 0; toggleParty(); }
      if (e.altKey && /^Digit[1-4]$/.test(e.code)) { e.preventDefault(); gotoWs(+e.code.slice(5)); return; }
      if (e.altKey && e.code === 'KeyF') { e.preventDefault(); toggleFs(focusedTile()); return; }
      if (e.altKey && e.code === 'KeyT') { e.preventDefault(); retile(); return; }
      if (e.altKey && (e.code === 'ArrowRight' || e.code === 'ArrowLeft')) { e.preventDefault(); gotoWs(((curWs - 1 + (e.code === 'ArrowRight' ? 1 : -1) + WS.length) % WS.length) + 1); return; }
      if (e.key === 'Escape' && $('.screen.active .tile.fs')) { toggleFs($('.screen.active .tile.fs')); return; }
      const typing = document.activeElement === inp();
      if (typing) return;
      if (e.key === '/') { e.preventDefault(); openLauncher(); return; }
      if (/^[1-4]$/.test(e.key)) { gotoWs(+e.key); return; }
      if (curWs === 2) {
        if (e.key === 'j' || e.key === 'ArrowDown') { e.preventDefault(); selectProject(rSel + 1); }
        else if (e.key === 'k' || e.key === 'ArrowUp') { e.preventDefault(); selectProject(rSel - 1); }
        else if (e.key === 'Enter' || e.key === 'l') openProject(C.projects[rSel]);
      } else if (curWs === 1 && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !busy) {
        e.preventDefault(); inp().value += e.key; inp().focus({ preventScroll: true });
      }
    });
    addEventListener('pointerdown', (e) => { ptr = { x: e.clientX, y: e.clientY }; if (stopMatrix && Date.now() - mxStart > 400) stopMatrix(); });
    const wall = $('#wall');
    addEventListener('pointermove', (e) => {
      ptr = { x: e.clientX, y: e.clientY };
      wall.style.setProperty('--mx', e.clientX + 'px'); wall.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });
  }

  /* status bar */
  function tickBar() {
    const now = new Date();
    $('#clock').innerHTML = `<b>${now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} ${now.toTimeString().slice(0, 8)}</b>`;
    $('#cpu').innerHTML = `CPU <b>${String(Math.round(rand(3, 38))).padStart(2)}%</b>`;
    $('#mem').innerHTML = `MEM <b>${rand(3.8, 4.6).toFixed(1)}G</b>/16G`;
    $$('.uptime').forEach((e) => (e.textContent = uptime()));
  }

  /* ═════════════ start ═════════════ */
  async function startDesktop() {
    buildDesktop();
    $('#desktop').hidden = false;
    setPrompt(); bindTerm(); bindGlobal(); bindLauncher();
    const fromHash = WS.find((w) => '#' + w.name === location.hash);
    gotoWs(fromHash ? fromHash.n : 1, true);
    tickBar(); setInterval(tickBar, 1000);
    setTimeout(tickHtop, 900); setInterval(tickHtop, 1800);
    setInterval(tickCava, 95);
    setTimeout(() => notify(`Welcome, guest 👋`, `<b>Alt+Space</b> / <b>Ctrl+K</b> launcher · <b>Alt+1..4</b> workspaces · <b>drag</b> title bars to move windows · <b>dbl-click</b> fullscreen · <b>Alt+T</b> re-tile`, 7000), 1400);

    print(`<span class="big">${esc(bigText(C.name))}</span>`);
    print(`Welcome to <b class="accent">PortfolioOS 1.0 LTS</b> (GNU/Linux ${KERNEL} x86_64)

 <span class="accent">*</span> ${esc(C.role)} · ${esc(C.location)}
 <span class="accent">*</span> ${esc(C.tagline)}
 <span class="accent">*</span> Quick start: ${cmdLink('about')} ${cmdLink('projects')} ${cmdLink('skills')} ${cmdLink('experience')} ${cmdLink('contact')} ${cmdLink('theme')}
`);
    await sleep(700);
    if (curWs === 1 && !busy) await typeCmd('help');
  }

  boot();
})();
