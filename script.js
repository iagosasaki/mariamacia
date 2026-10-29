/* =========================================================
   Cooperativa Maria Macia — comportamento
   Vanilla JS, sem dependências.
   ========================================================= */
(() => {
  'use strict';

  /* ---------- dados ---------- */
  const STEPS = [
    { n: '01', t: 'Pasto', d: 'Novilhos precoces criados nos campos do Paraná, com dieta balanceada no verão e no inverno.', img: 'IMG — Timeline: pasto com gado ao entardecer — 600×400 (3:2)' },
    { n: '02', t: 'Manejo técnico', d: 'O departamento técnico e veterinário acompanha cada propriedade durante toda a produção. Sem adição de hormônios.', img: 'IMG — Timeline: veterinário da cooperativa no manejo do rebanho — 600×400 (3:2)' },
    { n: '03', t: 'Abate só de cooperados', d: 'Só entram animais de cooperados, criados sob o mesmo padrão rigoroso de qualidade.', stamp: true },
    { n: '04', t: 'Lacre de rastreabilidade', d: 'Lotes aprovados recebem lacres e carimbos próprios: origem, raça, idade, alimentação e manejo sanitário.', img: 'IMG — Timeline: lacre e carimbo Maria Macia na peça — 600×400 (3:2)' },
    { n: '05', t: 'Caminhão refrigerado', d: 'Frota própria de caminhões refrigerados garante a temperatura ideal até o cliente.', img: 'IMG — Timeline: caminhão refrigerado da frota própria — 600×400 (3:2)' },
    { n: '06', t: 'Boutique', d: 'Cortes tipo exportação, embalados a vácuo, esperando por você na vitrine.', img: 'IMG — Timeline: fachada da Boutique Maria Macia — 600×400 (3:2)' },
    { n: '07', t: 'Sua mesa', d: 'A qualidade da carne Maria Macia vem do campo para a sua mesa.', img: 'IMG — Timeline: prato servido, picanha fatiada — 600×400 (3:2)' }
  ];
  const ROAD = ['PASTO', 'MANEJO', 'ABATE', 'LACRE', 'FROTA', 'BOUTIQUE', 'MESA'];
  const PONTOS = ['Mal passado', 'Ao ponto para mal', 'Ao ponto', 'Ao ponto para bem', 'Bem passado'];
  const CUTS = [
    { id: 'picanha', name: 'Picanha', region: 'TRASEIRO', d: 'A rainha do churrasco. A capa de gordura derrete na brasa e sela o sabor.', ponto: 1, prep: ['Grelha', 'Espeto'] },
    { id: 'alcatra', name: 'Alcatra', region: 'TRASEIRO', d: 'Macia e versátil, de sabor intenso e pouca gordura.', ponto: 2, prep: ['Grelha', 'Forno'] },
    { id: 'file', name: 'Filé Mignon', region: 'LOMBO', d: 'O corte mais macio do boi, de textura amanteigada.', ponto: 1, prep: ['Grelha', 'Forno'] },
    { id: 'ancho', name: 'Ancho', region: 'DIANTEIRO', d: 'Miolo do contrafilé dianteiro, com marmoreio generoso.', ponto: 1, prep: ['Grelha'] },
    { id: 'chorizo', name: 'Chorizo', region: 'LOMBO', d: 'Contrafilé alto e suculento, com borda de gordura.', ponto: 1, prep: ['Grelha', 'Espeto'] },
    { id: 'fraldinha', name: 'Fraldinha', region: 'BARRIGA', d: 'Fibras longas e muita suculência. Corte contra a fibra.', ponto: 2, prep: ['Grelha', 'Espeto'] },
    { id: 'costela', name: 'Costela', region: 'COSTADO', d: 'Fogo baixo, paciência e uma carne que desmancha.', ponto: 4, prep: ['Fogo de chão', 'Forno'] },
    { id: 'maminha', name: 'Maminha', region: 'TRASEIRO', d: 'A ponta da alcatra: macia, saborosa e fácil de acertar.', ponto: 2, prep: ['Espeto', 'Forno'] },
    { id: 'acem', name: 'Acém', region: 'DIANTEIRO', d: 'Corte do dianteiro, saboroso e com gordura entremeada. Vai bem em fatias finas na grelha ou na panela.', ponto: 3, prep: ['Grelha', 'Panela'] },
    { id: 'paleta', name: 'Paleta', region: 'DIANTEIRO', d: 'Do dianteiro, firme e suculenta. Fica perfeita assada lentamente ou desfiada.', ponto: 3, prep: ['Forno', 'Panela'] },
    { id: 'coxao', name: 'Coxão Mole', region: 'TRASEIRO', d: 'Macio e magro, ótimo para bifes, rosbife e churrasco em cubos.', ponto: 2, prep: ['Grelha', 'Forno'] }
  ];
  // posição de cada corte dentro do corpo do boi (grade 10×5) — apenas desktop
  const BOI_POS = {
    acem: ['1/3', '1/4'], paleta: ['1/3', '4/6'], ancho: ['3/5', '1/3'], costela: ['3/5', '3/6'],
    chorizo: ['5/7', '1/3'], file: ['5/7', '3/4'], fraldinha: ['5/7', '4/6'], picanha: ['7/11', '1/2'],
    alcatra: ['7/9', '2/4'], maminha: ['7/9', '4/6'], coxao: ['9/11', '2/6']
  };
  const FICHA = [
    { k: 'ORIGEM', v: 'Propriedade cooperada · Campo Mourão – PR' },
    { k: 'RAÇA', v: 'Cruzamento industrial (ex.: Angus × Nelore)' },
    { k: 'IDADE', v: 'Novilho precoce' },
    { k: 'ALIMENTAÇÃO', v: 'Pasto + dieta balanceada no verão e no inverno' },
    { k: 'MANEJO SANITÁRIO', v: 'Acompanhamento veterinário · sem adição de hormônios' }
  ];
  const DIFS = [
    { n: '01', t: 'Sem adição de hormônios', d: 'Novilhos precoces criados com dieta balanceada o ano todo.' },
    { n: '02', t: 'Acompanhamento veterinário', d: 'Departamento técnico presente em todas as etapas da produção.' },
    { n: '03', t: 'Embalagem a vácuo', d: 'Frescor, maturação e higiene preservados até o preparo.' },
    { n: '04', t: 'Tipo exportação', d: 'Padrão rigoroso de seleção e acabamento em cada corte.' },
    { n: '05', t: 'Frota refrigerada', d: 'Caminhões próprios mantêm a temperatura ideal até você.' }
  ];
  const YEARS = [
    { y: '2005', t: 'A ideia nasce da falta de carne de alta qualidade na região.' },
    { y: '2006', t: 'A marca Maria Macia chega ao público.' },
    { y: '2007/08', t: 'A parceria de quatro pecuaristas se torna cooperativa.' },
    { y: '2021', t: 'Julho: abre a Boutique Campo Mourão, anexa à sede.' },
    { y: '2022', t: 'Dezembro: abre a Boutique Maringá.' },
    { y: '2024', t: 'Chegada a Guarapuava. [CONFIRMAR]' },
    { y: '2026', t: 'Mais de 20 anos garantindo carne de qualidade do campo à mesa.' }
  ];
  const COUNTERS = [
    { to: 250, l: 'Cooperados', note: 'Pecuaristas do PR [CONFIRMAR]' },
    { to: 150, l: 'Pontos de venda', note: 'Paraná e São Paulo [CONFIRMAR]' },
    { to: 20, l: 'Anos de história', note: 'Marca lançada em 2006', plus: false },
    { to: 90, l: 'Cidades atendidas', note: '[CONFIRMAR número]' }
  ];
  // Horários editáveis das boutiques
  const HORARIO_CM = '[CONFIRMAR] Seg. a sáb. — editar horário';
  const HORARIO_MGA = '[CONFIRMAR] Seg. a sáb. — editar horário';
  const BOUTIQUES = [
    { name: 'Campo Mourão', since: 'DESDE JUL. 2021', img: 'IMG — Fachada Boutique Campo Mourão — 800×520 (20:13)', addr: 'Rua Maria Olímpia Jardim, 776 – Jardim Isabel, Campo Mourão – PR · anexa à sede', hours: HORARIO_CM, maps: 'https://www.google.com/maps/search/?api=1&query=Rua+Maria+Olimpia+Jardim+776+Campo+Mourao+PR', ig: 'https://instagram.com/boutiquemariamaciacampomourao' },
    { name: 'Maringá', since: 'DESDE DEZ. 2022', img: 'IMG — Fachada Boutique Maringá — 800×520 (20:13)', addr: 'Av. Dr. Gastão Vidigal, 3304 – Maringá – PR', hours: HORARIO_MGA, maps: 'https://www.google.com/maps/search/?api=1&query=Av+Dr+Gastao+Vidigal+3304+Maringa+PR', ig: 'https://instagram.com/boutiquemariamaciamga' }
  ];
  const STORES = [
    { id: 'cm', city: 'Campo Mourão', uf: 'PR', type: 'Boutique + sede da cooperativa', lat: -24.05, lon: -52.38, b: true },
    { id: 'mga', city: 'Maringá', uf: 'PR', type: 'Boutique Maria Macia', lat: -23.42, lon: -51.94, b: true },
    { id: 'gua', city: 'Guarapuava', uf: 'PR', type: 'Filial [CONFIRMAR]', lat: -25.39, lon: -51.46, b: true },
    { id: 'cas', city: 'Cascavel', uf: 'PR', type: '', lat: -24.96, lon: -53.46 },
    { id: 'tol', city: 'Toledo', uf: 'PR', type: '', lat: -24.72, lon: -53.74 },
    { id: 'umu', city: 'Umuarama', uf: 'PR', type: '', lat: -23.77, lon: -53.32 },
    { id: 'cia', city: 'Cianorte', uf: 'PR', type: '', lat: -23.66, lon: -52.61 },
    { id: 'goi', city: 'Goioerê', uf: 'PR', type: '', lat: -24.18, lon: -53.03 },
    { id: 'pvi', city: 'Paranavaí', uf: 'PR', type: '', lat: -23.07, lon: -52.46 },
    { id: 'apu', city: 'Apucarana', uf: 'PR', type: '', lat: -23.55, lon: -51.46 },
    { id: 'lon', city: 'Londrina', uf: 'PR', type: '', lat: -23.31, lon: -51.16 },
    { id: 'pg', city: 'Ponta Grossa', uf: 'PR', type: '', lat: -25.09, lon: -50.16 },
    { id: 'cwb', city: 'Curitiba', uf: 'PR', type: '', lat: -25.43, lon: -49.27 },
    { id: 'pp', city: 'Presidente Prudente', uf: 'SP', type: '', lat: -22.12, lon: -51.39 },
    { id: 'ass', city: 'Assis', uf: 'SP', type: '', lat: -22.66, lon: -50.41 },
    { id: 'bau', city: 'Bauru', uf: 'SP', type: '', lat: -22.31, lon: -49.06 },
    { id: 'cps', city: 'Campinas', uf: 'SP', type: '', lat: -22.90, lon: -47.06 },
    { id: 'sp', city: 'São Paulo', uf: 'SP', type: '', lat: -23.55, lon: -46.63 }
  ];
  const TESTIMONIALS = [
    { q: 'A picanha chega sempre com a mesma maciez. Virou a carne oficial dos domingos aqui em casa.', n: 'Cliente da Boutique', c: 'Campo Mourão – PR' },
    { q: 'Saber de onde vem o animal, a raça e o manejo faz diferença na hora de servir no restaurante.', n: 'Parceiro · restaurante', c: 'Maringá – PR' },
    { q: 'Atendimento de quem entende de churrasco. Pedimos pelo WhatsApp e retiramos na loja, sem fila.', n: 'Cliente', c: 'Maringá – PR' }
  ];
  const POSTS = ['picanha fatiada na tábua', 'vitrine da boutique', 'churrasco em família', 'cooperado no pasto', 'corte a vácuo com lacre', 'ancho na grelha']
    .map((s, i) => `IMG — Post Instagram 0${i + 1}: ${s} — 1080×1080 (1:1)`);

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const mqDesktop = window.matchMedia('(min-width:961px)');
  const mqHover = window.matchMedia('(hover:hover)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = () => mqDesktop.matches;

  /* ---------- header / menu ---------- */
  const hdr = $('#hdr');
  const burger = $('#burger');
  const menu = $('#menu');

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }
  burger.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });
  mqDesktop.addEventListener('change', e => { if (e.matches) setMenu(false); });

  /* ---------- título com efeito "brasa" ---------- */
  (function burnTitle() {
    const el = $('#heroTitle');
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', words.join(' '));
    el.textContent = '';
    let i = 0;
    words.forEach((w, wi) => {
      const ws = document.createElement('span');
      ws.setAttribute('aria-hidden', 'true');
      ws.style.cssText = 'display:inline-block;white-space:nowrap';
      [...w].forEach(ch => {
        const s = document.createElement('span');
        s.textContent = ch;
        s.style.display = 'inline-block';
        if (!reduced) s.style.animation = `burn 1.1s ${(0.35 + i * 0.045).toFixed(3)}s both`;
        i++;
        ws.appendChild(s);
      });
      el.appendChild(ws);
      if (wi < words.length - 1) { el.appendChild(document.createTextNode(' ')); i++; }
    });
  })();

  /* ---------- brasas no hero ---------- */
  function startEmbers() {
    const c = $('#heroCanvas');
    const ctx = c.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => { c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr; };
    resize();
    window.addEventListener('resize', resize);
    const spawn = (p, init) => {
      p.x = Math.random() * c.width;
      p.y = init ? Math.random() * c.height : c.height + 10 * dpr;
      p.r = (Math.random() * 1.6 + .5) * dpr;
      p.vy = (Math.random() * 1 + .35) * dpr;
      p.vx = (Math.random() - .5) * .3 * dpr;
      p.life = 0;
      p.max = Math.random() * 420 + 260;
      p.ph = Math.random() * 6.28;
      return p;
    };
    const P = [];
    const count = isDesktop() ? 140 : 40;
    for (let i = 0; i < count; i++) P.push(spawn({}, true));
    const tick = () => {
      requestAnimationFrame(tick);
      if (window.scrollY > c.offsetHeight) return;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of P) {
        p.life++; p.ph += .03;
        p.x += p.vx + Math.sin(p.ph) * .4 * dpr;
        p.y -= p.vy;
        const t = p.life / p.max;
        if (t >= 1 || p.y < -10) spawn(p, false);
        const a = Math.max(0, 1 - t) * (.55 + .45 * Math.sin(p.ph * 3));
        const R = p.r * 4;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R);
        g.addColorStop(0, `rgba(255,220,160,${a})`);
        g.addColorStop(.3, `rgba(242,183,5,${a * .75})`);
        g.addColorStop(1, 'rgba(122,30,30,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, 6.283); ctx.fill();
      }
    };
    tick();
  }

  /* ---------- cursor de brasa (desktop com mouse) ---------- */
  function startCursor() {
    const c = document.createElement('canvas');
    c.setAttribute('aria-hidden', 'true');
    c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999';
    document.body.appendChild(c);
    document.body.classList.add('mm-cursor');
    const ctx = c.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; };
    resize();
    window.addEventListener('resize', resize);
    let mx = -100, my = -100;
    const sparks = [];
    window.addEventListener('mousemove', e => {
      const d = Math.hypot(e.clientX - mx, e.clientY - my);
      mx = e.clientX; my = e.clientY;
      const n = Math.min(5, d / 5 | 0);
      for (let i = 0; i < n; i++) sparks.push({ x: mx, y: my, vx: (Math.random() - .5) * 1.8, vy: -Math.random() * 1.8 - .3, l: 1, r: Math.random() * 1.5 + .6 });
    });
    const tick = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy; s.vy += .03; s.l -= .028;
        if (s.l <= 0) { sparks.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(255,${(170 + s.l * 70) | 0},40,${s.l})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * s.l + .3, 0, 6.283); ctx.fill();
      }
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, 16);
      g.addColorStop(0, 'rgba(255,240,200,1)');
      g.addColorStop(.25, 'rgba(255,210,70,.95)');
      g.addColorStop(1, 'rgba(242,183,5,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(mx, my, 16, 0, 6.283); ctx.fill();
      requestAnimationFrame(tick);
    };
    tick();
  }

  /* ---------- parallax do hero (desktop) ---------- */
  (function heroParallax() {
    const hero = $('#topo'), img = $('#heroImg'), smoke = $('#heroSmoke');
    hero.addEventListener('mousemove', e => {
      if (reduced || !isDesktop()) return;
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - .5;
      const dy = (e.clientY - r.top) / r.height - .5;
      img.style.transform = `translate(${dx * -36}px,${dy * -26}px) rotate(${dx * -2}deg)`;
      smoke.style.transform = `translate(${dx * 30}px,${dy * 20}px)`;
    });
  })();

  /* ---------- Do campo à mesa ---------- */
  const tlTrack = $('#tlTrack');
  tlTrack.innerHTML = STEPS.map(s => `
    <article class="step">
      <div class="step-title"><span class="n">${s.n}</span><h3>${s.t}</h3></div>
      ${s.stamp
        ? `<div class="step-media step-stamp"><div class="stamp-ring"><span>ABATE</span><span>SÓ DE<br>COOPERADOS</span><span>MARIA MACIA</span></div></div>`
        : `<div class="step-media ph">${s.img}</div>`}
      <p>${s.d}</p>
    </article>`).join('');
  const stepEls = $$('.step', tlTrack);

  const roadNodes = $('#roadNodes');
  roadNodes.innerHTML = ROAD.map((l, i) => `<div class="road-node" style="left:${i / 6 * 100}%"><i></i><span>${l}</span></div>`).join('');
  const roadEls = $$('.road-node', roadNodes);

  function setStep(step, roadActiveUpTo) {
    stepEls.forEach((el, i) => el.classList.toggle('is-on', i <= step + 1));
    roadEls.forEach((el, i) => el.classList.toggle('on', i <= roadActiveUpTo));
  }

  /* ---------- Duas Marias: anos ---------- */
  $('#yearsLine').innerHTML = YEARS.map((y, i) => {
    const t = y.t.replace('[CONFIRMAR]', '<code>[CONFIRMAR]</code>');
    return `<li class="${i > 2 ? 'recent' : ''}"><b>${y.y}</b><span>${t}</span></li>`;
  }).join('');

  const wheelNodes = $('#wheelNodes');
  let yIdx = 0, yUser = false;
  wheelNodes.innerHTML = YEARS.map((y, i) => {
    const a = (-90 + i * 360 / YEARS.length) * Math.PI / 180;
    return `<button type="button" class="wheel-node" data-i="${i}" style="left:${50 + 42 * Math.cos(a)}%;top:${50 + 42 * Math.sin(a)}%;font-size:${y.y.length > 4 ? 14 : 17}px" aria-label="${y.y}">${y.y}</button>`;
  }).join('');
  const wheelBtns = $$('.wheel-node', wheelNodes);
  function renderWheel() {
    wheelBtns.forEach((b, i) => {
      const on = i === yIdx, past = i < yIdx;
      b.style.transform = `translate(-50%,-50%) scale(${on ? 1.12 : 1})`;
      b.style.background = on ? '#7A1E1E' : past ? '#F3EBDD' : '#FFFDF8';
      b.style.color = on ? '#F3EBDD' : '#7A1E1E';
      b.style.borderColor = on || past ? '#7A1E1E' : 'rgba(122,30,30,.35)';
      b.style.boxShadow = on ? '0 0 0 5px rgba(242,183,5,.35), 0 8px 18px rgba(122,30,30,.3)' : 'none';
    });
    $('#wheelArc').setAttribute('stroke-dasharray', `${yIdx / YEARS.length * 100} 100`);
    $('#wheelStep').textContent = `${pad(yIdx + 1)} / ${pad(YEARS.length)}`;
    $('#wheelYear').textContent = YEARS[yIdx].y;
    $('#wheelText').textContent = YEARS[yIdx].t;
  }
  wheelNodes.addEventListener('click', e => {
    const b = e.target.closest('.wheel-node');
    if (!b) return;
    yUser = true; yIdx = +b.dataset.i; renderWheel();
  });
  renderWheel();
  setInterval(() => {
    if (yUser || reduced || isDesktop()) return;
    yIdx = (yIdx + 1) % YEARS.length; renderWheel();
  }, 3800);

  /* ---------- Qualidade ---------- */
  $('#fichaRows').innerHTML = FICHA.map((f, i) =>
    `<div class="ficha-row" style="transition-delay:var(--fd,0s)" data-i="${i}"><span>${f.k}</span><span>${f.v}</span></div>`).join('');
  $$('.ficha-row').forEach((el, i) => el.style.setProperty('--fd', `${i * .12}s`));
  $('#difs').innerHTML = DIFS.map(d =>
    `<div class="dif"><span class="n">${d.n}</span><div><h3>${d.t}</h3><p>${d.d}</p></div></div>`).join('');

  const quali = $('#qualidade');
  const lacre = $('#lacre');
  const scanHint = $('#scanHint');
  const hoverDevice = () => mqHover.matches && isDesktop();
  function setScan(on) {
    quali.classList.toggle('is-scan', on);
    if (hoverDevice()) scanHint.textContent = on ? 'ESCANEANDO LOTE…' : 'PASSE O MOUSE PARA ESCANEAR O LACRE';
    else scanHint.textContent = on ? 'LOTE ESCANEADO · TOQUE PARA REPETIR' : 'TOQUE PARA ESCANEAR O LACRE';
    $('#fichaNote').textContent = hoverDevice()
      ? 'Dados ilustrativos de um lote — passe o mouse no lacre para escanear.'
      : 'Dados ilustrativos · toque no lacre para escanear de novo.';
  }
  setScan(false);
  lacre.addEventListener('mouseenter', () => { if (hoverDevice()) setScan(true); });
  lacre.addEventListener('mouseleave', () => { if (hoverDevice()) setScan(false); });
  lacre.addEventListener('click', () => {
    if (hoverDevice()) return;
    setScan(false);
    setTimeout(() => setScan(true), 250);
  });

  /* ---------- Cortes ---------- */
  const cutById = Object.fromEntries(CUTS.map((c, i) => [c.id, { ...c, i }]));
  const cutsGrid = $('#cutsGrid');
  cutsGrid.innerHTML = CUTS.map((c, i) => {
    const pos = (c.ponto + .5) / 5 * 100;
    return `
    <article class="cut" data-id="${c.id}" style="--cover:${100 - pos}%;--mark:${pos}%">
      <div class="cut-img">
        <div class="ph">IMG — Corte: ${c.name.toLowerCase()} — 600×600 (1:1)</div>
        <div class="cut-ov"></div><div class="cut-shine"></div>
        <span class="cut-idx">${pad(i + 1)}</span>
        <div class="cut-pop">
          <div class="pop-row"><span>PONTO IDEAL</span><b>${PONTOS[c.ponto]}</b></div>
          <div class="cut-bar"><div class="cover"></div><span class="mark"></span></div>
          <div class="pop-scale"><span>Mal passado</span><span>Bem passado</span></div>
          <div class="chips">${c.prep.map(p => `<span>${p}</span>`).join('')}</div>
        </div>
      </div>
      <div class="cut-info"><h3>${c.name}</h3><p>${c.d}</p></div>
    </article>`;
  }).join('');

  cutsGrid.addEventListener('click', e => {
    const card = e.target.closest('.cut');
    if (card) card.classList.toggle('open');
  });
  $$('.cut', cutsGrid).forEach(card => {
    card.addEventListener('mouseenter', () => { if (mqHover.matches && isDesktop()) card.classList.add('open'); });
    card.addEventListener('mouseleave', () => { if (mqHover.matches && isDesktop()) card.classList.remove('open'); });
  });

  // seletor do boi (mapa no desktop, lista no mobile)
  $('#boiBody').innerHTML = Object.entries(BOI_POS).map(([id, [col, row]]) =>
    `<button type="button" class="boi-cut" data-id="${id}" style="grid-column:${col};grid-row:${row}">${cutById[id].name}</button>`).join('');
  $('#boiList').innerHTML = CUTS.map(c =>
    `<button type="button" class="boi-btn" data-id="${c.id}"><span>${c.name}</span><small>${c.region}</small></button>`).join('');

  let boiSel = 'picanha';
  function selectCut(id) {
    boiSel = id;
    const c = cutById[id];
    $$('.boi-cut, .boi-btn').forEach(b => b.classList.toggle('on', b.dataset.id === id));
    $$('.cut', cutsGrid).forEach(el => el.classList.toggle('sel', el.dataset.id === id));
    $('#cutPanel').innerHTML = `
      <div class="ph cut-photo">IMG — Corte: ${c.name.toLowerCase()} — 800×600 (4:3)</div>
      <span class="lbl">${c.region} · CORTE ${pad(c.i + 1)}</span>
      <h4>${c.name}</h4>
      <p>${c.d}</p>
      <dl>
        <div><dt>Ponto ideal: </dt><dd>${PONTOS[c.ponto]}</dd></div>
        <div><dt>Preparo: </dt><dd>${c.prep.join(' · ')}</dd></div>
      </dl>
      <a class="btn btn-amber" href="https://wa.me/554430171211" target="_blank" rel="noopener">Encomendar pelo WhatsApp</a>`;
  }
  $('.boi').addEventListener('click', e => {
    const b = e.target.closest('[data-id]');
    if (b && (b.classList.contains('boi-cut') || b.classList.contains('boi-btn'))) selectCut(b.dataset.id);
  });
  selectCut(boiSel);

  /* ---------- Contadores ---------- */
  const countersGrid = $('#countersGrid');
  countersGrid.innerHTML = COUNTERS.map(k =>
    `<div class="counter"><strong data-to="${k.to}" data-plus="${k.plus === false ? 0 : 1}">0${k.plus === false ? '' : '+'}</strong><span>${k.l}</span><small>${k.note}</small></div>`).join('');
  function runCounters() {
    const els = $$('strong', countersGrid);
    const fmt = (el, v) => { el.textContent = v + (el.dataset.plus === '1' ? '+' : ''); };
    if (reduced) return els.forEach(el => fmt(el, +el.dataset.to));
    const t0 = performance.now();
    const f = now => {
      const k = clamp((now - t0) / 2200, 0, 1);
      const e = 1 - Math.pow(1 - k, 3);
      els.forEach(el => fmt(el, Math.round(+el.dataset.to * e)));
      if (k < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }

  /* ---------- Boutiques ---------- */
  $('#boutCards').innerHTML = BOUTIQUES.map(b => `
    <article class="b-card">
      <div class="ph">${b.img}</div>
      <div class="b-body">
        <div class="b-top"><h3>${b.name}</h3><span>${b.since}</span></div>
        <dl class="b-info">
          <div><dt>ENDEREÇO</dt><dd>${b.addr}</dd></div>
          <div><dt>HORÁRIO</dt><dd>${b.hours}</dd></div>
          <div class="svc"><dt>SERVIÇOS</dt><dd>Delivery · Reservas · Retirada na loja</dd></div>
        </dl>
        <div class="b-actions">
          <a class="b-maps" href="${b.maps}" target="_blank" rel="noopener">Como chegar</a>
          <a class="b-wa" href="https://wa.me/554430171211" target="_blank" rel="noopener">WhatsApp</a>
          <a class="b-ig" href="${b.ig}" target="_blank" rel="noopener">Instagram</a>
        </div>
      </div>
    </article>`).join('');
  /* ---------- Onde encontrar ---------- */
  const proj = st => ({ x: `${(st.lon + 55) / 9.5 * 100}%`, y: `${(-21.5 - st.lat) / 5 * 100}%` });
  let q = '', uf = 'Todos', selStore = 'cm';
  const match = st => (uf === 'Todos' || st.uf === uf) && norm(st.city).includes(norm(q));

  $('#mapDots').innerHTML = STORES.map((st, i) => {
    const p = proj(st);
    return `<button type="button" class="dot" data-id="${st.id}" title="${st.city}" aria-label="${st.city} – ${st.uf}" style="left:${p.x};top:${p.y};--d:${(i % 6) * .35}s"><i></i></button>`;
  }).join('');
  const dotEls = $$('.dot');
  $('#ufFilter').innerHTML = ['Todos', 'PR', 'SP'].map(u => `<button type="button" class="uf-btn" data-uf="${u}">${u}</button>`).join('');

  function renderStores() {
    const list = STORES.filter(match);
    dotEls.forEach((el, i) => {
      const st = STORES[i];
      const sel = st.id === selStore;
      el.classList.toggle('dim', !match(st));
      el.classList.toggle('big', !!st.b || sel);
      el.style.setProperty('--c', sel ? '#F3EBDD' : st.b ? '#F2B705' : '#C9A45C');
    });
    $$('.uf-btn').forEach(b => b.classList.toggle('on', b.dataset.uf === uf));
    const s = STORES.find(x => x.id === selStore) || STORES[0];
    const p = proj(s);
    const lbl = $('#mapLabel');
    lbl.style.left = p.x; lbl.style.top = p.y;
    lbl.textContent = `${s.city} – ${s.uf}`;
    $('#storeList').innerHTML = list.length
      ? list.map(st => `<button type="button" class="store ${st.id === selStore ? 'on' : ''}" data-id="${st.id}" style="--c:${st.b ? '#F2B705' : '#C9A45C'}"><span><strong>${st.city} – ${st.uf}</strong>${st.type ? `<small>${st.type}</small>` : ''}</span><i></i></button>`).join('')
      : '<p class="empty">Nenhuma cidade encontrada. Fale com a gente pelo WhatsApp.</p>';
  }
  $('#storeQ').addEventListener('input', e => { q = e.target.value; renderStores(); });
  $('#ufFilter').addEventListener('click', e => {
    const b = e.target.closest('.uf-btn'); if (!b) return;
    uf = b.dataset.uf; renderStores();
  });
  const pickStore = e => {
    const b = e.target.closest('[data-id]'); if (!b) return;
    selStore = b.dataset.id; renderStores();
  };
  $('#mapDots').addEventListener('click', pickStore);
  $('#storeList').addEventListener('click', pickStore);
  renderStores();

  /* ---------- Cooperado / Ponto de venda ---------- */
  const coop = $('#cooperado');
  function setTab(tab) {
    coop.dataset.tab = tab;
    $('#tabCoop').setAttribute('aria-selected', String(tab === 'coop'));
    $('#tabParc').setAttribute('aria-selected', String(tab === 'parc'));
  }
  $('#tabCoop').addEventListener('click', () => setTab('coop'));
  $('#tabParc').addEventListener('click', () => setTab('parc'));
  $$('form[data-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault(); // demonstração: nada é enviado
      form.hidden = true;
      form.nextElementSibling.hidden = false;
    });
  });

  /* ---------- Depoimentos + Instagram ---------- */
  const N = TESTIMONIALS.length;
  let tIdx = 0, tTimer;
  $('#tTrack').innerHTML = TESTIMONIALS.map(t => `
    <figure class="slide">
      <blockquote>“${t.q}”</blockquote>
      <figcaption><span class="ph avatar">96×96<br>(1:1)</span><span><strong>${t.n}</strong><small>${t.c}</small></span></figcaption>
    </figure>`).join('');
  $('#tDots').innerHTML = TESTIMONIALS.map((_, i) => `<button type="button" aria-label="Depoimento ${i + 1}" data-i="${i}"><i></i></button>`).join('');
  function renderT() {
    $('#tTrack').style.transform = `translateX(-${tIdx * 100}%)`;
    $$('#tDots button').forEach((b, i) => b.classList.toggle('on', i === tIdx));
  }
  const goT = i => { tIdx = (i + N) % N; renderT(); startT(); };
  function startT() { clearInterval(tTimer); tTimer = setInterval(() => { tIdx = (tIdx + 1) % N; renderT(); }, 6500); }
  $('#tPrev').addEventListener('click', () => goT(tIdx - 1));
  $('#tNext').addEventListener('click', () => goT(tIdx + 1));
  $('#tDots').addEventListener('click', e => { const b = e.target.closest('button'); if (b) goT(+b.dataset.i); });
  let tx0 = 0;
  $('#tClip').addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; }, { passive: true });
  $('#tClip').addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx0;
    if (Math.abs(dx) > 40) goT(tIdx + (dx < 0 ? 1 : -1));
  });
  renderT(); startT();

  $('#feedGrid').innerHTML = POSTS.map(p =>
    `<a class="ph" href="https://instagram.com/coopmariamacia" target="_blank" rel="noopener">${p}</a>`).join('');

  /* ---------- scroll: header, timeline, marias ---------- */
  const campo = $('#campo');
  const tlView = $('#tlView');
  const vFill = $('#vFill'), vTruck = $('#vTruck');
  const truck = $('#truck'), roadFill = $('#roadFill');
  const mWrap = $('#mWrap'), mL = $('#mL'), mR = $('#mR'), mName = $('#mName');
  let lastStep = -99;

  function handleScroll() {
    const vh = window.innerHeight;
    hdr.classList.toggle('is-scrolled', window.scrollY > 40);

    // timeline
    const r = campo.getBoundingClientRect();
    if (isDesktop()) {
      const p = clamp(-r.top / (r.height - vh), 0, 1);
      const max = Math.max(0, tlTrack.scrollWidth - tlView.clientWidth);
      tlTrack.style.transform = `translate3d(${-p * max}px,0,0)`;
      truck.style.left = (p * 100) + '%';
      roadFill.style.width = (p * 100) + '%';
      const st = Math.min(6, Math.round(p * 6));
      if (st !== lastStep) { lastStep = st; setStep(st, st); }
    } else {
      tlTrack.style.transform = '';
      const p = clamp((vh * .6 - r.top - 120) / (r.height - 200), 0, 1);
      vFill.style.height = (p * 100) + '%';
      vTruck.style.top = (p * 100) + '%';
      const st = Math.min(6, Math.floor(p * 7.4));
      if (st !== lastStep) { lastStep = st; setStep(st, st); }
    }

    // duas Marias
    const m = mWrap.getBoundingClientRect();
    const d = isDesktop();
    const q = clamp((vh - m.top) / (vh * (d ? .95 : .8)), 0, 1);
    const off = (1 - q) * (d ? 200 : 60);
    mL.style.transform = `translateX(${-off}px) rotate(${-(1 - q) * 5}deg)`;
    mR.style.transform = `translateX(${off}px) rotate(${(1 - q) * 5}deg)`;
    const nq = Math.max(0, (q - (d ? .72 : .75)) / (d ? .28 : .25));
    mName.style.opacity = nq;
    mName.style.transform = `translate(-50%,-50%) scale(${.85 + nq * .15})`;
  }
  let raf = 0;
  const onScroll = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; handleScroll(); }); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { lastStep = -99; onScroll(); });
  mqDesktop.addEventListener('change', () => { lastStep = -99; setScan(quali.classList.contains('is-scan')); onScroll(); });
  handleScroll();

  /* ---------- observadores de entrada ---------- */
  const counters = $('#counters');
  let counted = false;
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    if (e.target === lacre && !lacre.classList.contains('is-stamped')) {
      lacre.classList.add('is-stamped');
      if (!hoverDevice()) setTimeout(() => setScan(true), 900);
    }
    if (e.target === counters && !counted) { counted = true; runCounters(); }
    if (e.target === cutsGrid) cutsGrid.classList.add('seen');
  }), { threshold: .3 });
  [lacre, counters, cutsGrid].forEach(el => io.observe(el));

  /* ---------- efeitos opcionais ---------- */
  if (!reduced) startEmbers();
  if (!reduced && window.matchMedia('(pointer:fine)').matches && isDesktop()) startCursor();
})();
