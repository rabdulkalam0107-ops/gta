// Sample data and rendering for games
const GAMES = [
  {id:'gta3',title:'Grand Theft Auto III',year:2001,platform:'PlayStation/PC',rating:'9.0',price:4.99,thumb:'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60',desc:'A landmark 3D open-world crime game set in Liberty City.'},
  {id:'vc',title:'Grand Theft Auto: Vice City',year:2002,platform:'PlayStation/PC',rating:'9.2',price:5.99,thumb:'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?auto=format&fit=crop&w=800&q=60',desc:'Neon-drenched Miami-inspired action with an 80s soundtrack.'},
  {id:'sa',title:'Grand Theft Auto: San Andreas',year:2004,platform:'PlayStation/PC/Xbox',rating:'9.5',price:6.99,thumb:'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=60',desc:'A sprawling state to explore with RPG elements and deep story.'},
  {id:'gta4',title:'Grand Theft Auto IV',year:2008,platform:'PlayStation/Xbox/PC',rating:'9.1',price:7.99,thumb:'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=800&q=60',desc:'A gritty and realistic take on Liberty City with strong narrative.'},
  {id:'gta5',title:'Grand Theft Auto V',year:2013,platform:'PC/PlayStation/Xbox',rating:'9.8',price:19.99,thumb:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60',desc:'A cinematic epic with three protagonists and massive online support.'},
  {id:'gtao',title:'GTA Online',year:2013,platform:'PC/PlayStation/Xbox',rating:'9.0',price:0.00,thumb:'https://images.unsplash.com/photo-1520975919414-0a3f9a6c5f3f?auto=format&fit=crop&w=800&q=60',desc:'Massive online world with heists, races, and persistent progression.'},
  {id:'lcs',title:'Grand Theft Auto: Liberty City Stories',year:2005,platform:'PlayStation/PSP',rating:'8.5',price:3.99,thumb:'https://images.unsplash.com/photo-1526318472351-c75fcf070ee3?auto=format&fit=crop&w=800&q=60',desc:'A portable story exploring the history of Liberty City.'},
  {id:'vcs',title:'Grand Theft Auto: Vice City Stories',year:2006,platform:'PlayStation/PSP',rating:'8.4',price:3.99,thumb:'https://images.unsplash.com/photo-1470115636492-6d2b56f91402?auto=format&fit=crop&w=800&q=60',desc:'A gritty prequel to Vice City with new mechanics.'}
];

function renderGames(filter='all',searchText=''){
  const grid = document.getElementById('games-grid');
  if(!grid) return;
  grid.innerHTML='';
  const list = GAMES.filter(g=>{
    const okPlatform = filter==='all' || g.platform.toLowerCase().includes(filter.toLowerCase());
    const okSearch = !searchText || (g.title.toLowerCase().includes(searchText.toLowerCase())||g.desc.toLowerCase().includes(searchText.toLowerCase()));
    return okPlatform && okSearch;
  });
  list.forEach(g=>{
    const el = document.createElement('div'); el.className='games-card';
    el.innerHTML = `<img src="${g.thumb}" alt="${g.title}"><div class="info"><div class="title">${g.title}</div><div class="games-meta"><span class="small-badge">${g.year}</span><span class="small-badge">${g.platform}</span><span class="small-badge">⭐ ${g.rating}</span></div><p>${g.desc}</p><div class="card-actions"><button class="btn btn-primary view-detail" data-id="${g.id}">View Details</button><button class="btn add-cart" data-id="${g.id}">Add to Cart</button></div></div>`;
    grid.appendChild(el);
  })
  // bind actions
  document.querySelectorAll('.view-detail').forEach(b=>b.addEventListener('click',e=>openGameModal(b.dataset.id)));
  document.querySelectorAll('.add-cart').forEach(b=>b.addEventListener('click',e=>{const id=b.dataset.id;addToCartById(id)}));
}

function openGameModal(id){
  const game = GAMES.find(g=>g.id===id); if(!game) return;
  const body = document.getElementById('game-modal-body');
  body.innerHTML = `<div style="display:flex;gap:18px;flex-wrap:wrap"><img style="width:260px;border-radius:10px;object-fit:cover" src="${game.thumb}"><div style="flex:1"><h2>${game.title} <small style='opacity:.6'>${game.year}</small></h2><p>${game.desc}</p><p><strong>Platforms:</strong> ${game.platform}</p><p><strong>Rating:</strong> ${game.rating}</p><p><strong>Price:</strong> $${game.price.toFixed(2)}</p><div style="margin-top:12px"><button class='btn btn-primary add-cart' data-id='${game.id}'>Add to Cart</button><button class='btn' id='open-trailer' style='margin-left:10px'>Watch Trailer</button></div></div></div>`;
  document.getElementById('game-modal').classList.add('show');
  document.getElementById('game-modal-close').onclick = ()=>document.getElementById('game-modal').classList.remove('show');
  document.getElementById('open-trailer').onclick = ()=>openVideoModal({url:'https://www.youtube.com/embed/4-4i0diWxHk'});
  document.querySelectorAll('.add-cart').forEach(b=>b.addEventListener('click',e=>{addToCartById(b.dataset.id);document.getElementById('game-modal').classList.remove('show')}));
}

// Hook search event
window.addEventListener('site-search',(e)=>{renderGames('all',e.detail)});
document.getElementById('platform-filter')?.addEventListener('change',(e)=>renderGames(e.target.value));

renderGames();
