/* ====== MENÙ: modifica solo qui per ogni cliente ====== */
const MENU = {
  classiche: [
    {n:"Marinara", d:"Pomodoro San Marzano DOP, aglio, origano, basilico", p:"6,00"},
    {n:"Margherita", d:"Pomodoro, fiordilatte di Agerola, basilico, EVO", p:"7,50", b:"Top"},
    {n:"Napoli", d:"Pomodoro, acciughe di Cetara, capperi, origano", p:"9,00"},
    {n:"Diavola", d:"Pomodoro, fiordilatte, salame piccante", p:"9,50"},
    {n:"Capricciosa", d:"Pomodoro, mozzarella, prosciutto, funghi, carciofi, olive", p:"11,00"}
  ],
  speciali: [
    {n:"Bufalina DOP", d:"Pomodoro giallo, bufala campana DOP, basilico", p:"12,00", b:"Chef"},
    {n:"Nduja & Stracciatella", d:"Nduja di Spilinga, stracciatella pugliese, miele", p:"13,00"},
    {n:"Tartufo & Porcini", d:"Crema di tartufo, porcini, fiordilatte, scaglie", p:"14,50"},
    {n:"Vegana Orto", d:"Pomodoro, verdure grigliate, pesto di basilico", p:"11,00", b:"Vegan"}
  ],
  bianche: [
    {n:"Quattro Formaggi", d:"Fiordilatte, gorgonzola, provola, parmigiano", p:"11,00"},
    {n:"Mortazza", d:"Fiordilatte, mortadella IGP, stracciatella, pistacchio", p:"13,50", b:"Top"},
    {n:"Patate e Salsiccia", d:"Fiordilatte, patate, salsiccia di maiale, rosmarino", p:"11,50"}
  ],
  bevande: [
    {n:"Acqua naturale/frizzante 0,75l", d:"", p:"2,50"},
    {n:"Birra artigianale 0,33l", d:"Bionda o ambrata del birrificio locale", p:"5,00"},
    {n:"Coca-Cola / Fanta 0,33l", d:"", p:"3,00"},
    {n:"Vino della casa 0,5l", d:"Rosso o bianco campano", p:"8,00"}
  ]
};

const grid = document.getElementById('menuGrid');
function render(cat){
  grid.innerHTML = MENU[cat].map((i,idx)=>`
    <article class="item" style="animation-delay:${idx*45}ms">
      <div class="item__body">
        <h3>${i.n}${i.b?`<span class="badge">${i.b}</span>`:''}</h3>
        ${i.d?`<p>${i.d}</p>`:''}
      </div>
      <div class="item__price">€ ${i.p}</div>
    </article>`).join('');
}
render('classiche');

document.getElementById('tabs').addEventListener('click', e=>{
  const t = e.target.closest('.tab'); if(!t) return;
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('is-active'));
  t.classList.add('is-active');
  render(t.dataset.cat);
});

/* ====== Navbar scroll ====== */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

/* ====== Menù mobile ====== */
const burger = document.getElementById('burger'), links = document.getElementById('menu');
burger.addEventListener('click', ()=> links.classList.toggle('open'));
links.addEventListener('click', e=>{ if(e.target.tagName==='A') links.classList.remove('open'); });

/* ====== Reveal on scroll ====== */
const io = new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ====== Form prenotazione ====== */
const form = document.getElementById('bookingForm'), msg = document.getElementById('formMsg');
form.addEventListener('submit', e=>{
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach(f=>{
    const bad = !f.value.trim();
    f.classList.toggle('invalid', bad);
    if(bad) ok = false;
  });
  if(!ok){ msg.style.color='#c1272d'; msg.textContent='Compila i campi obbligatori.'; return; }

  // DEMO: sostituire con invio reale (Formspree / EmailJS / backend PHP)
  const d = Object.fromEntries(new FormData(form));
  const testo = `Prenotazione%20Pizzeria%0ANome:%20${encodeURIComponent(d.nome)}%0ATel:%20${encodeURIComponent(d.tel)}%0AData:%20${d.data}%20${d.ora}%0APersone:%20${d.persone}`;
  msg.style.color='#1a7f4b';
  msg.innerHTML = `Richiesta pronta! <a href="https://wa.me/390811234567?text=${testo}" target="_blank" style="color:#c1272d;text-decoration:underline">Invia su WhatsApp →</a>`;
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();