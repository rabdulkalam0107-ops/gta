// Main interactions: navigation, search, hamburger, loading, particles
const initializeMain = () => {
  const loading = document.getElementById('loading');
  if (loading) setTimeout(()=>{loading.style.display='none'},700);

  // Smooth scroll for nav links
  document.querySelectorAll('.main-nav a, .logo, .hero-cta .btn').forEach(el=>{
    el.addEventListener('click', (e)=>{
      const target = el.getAttribute('data-target') || el.getAttribute('href') || '';
      if(target && target.startsWith('#')){
        e.preventDefault();
        document.querySelector(target).scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  })

  // Hero CTA anchors
  document.getElementById('explore-games')?.addEventListener('click',()=>document.getElementById('games').scrollIntoView({behavior:'smooth'}));
  document.getElementById('watch-videos')?.addEventListener('click',()=>document.getElementById('videos').scrollIntoView({behavior:'smooth'}));

  // Hamburger
  const hamb = document.getElementById('hamburger');
  hamb?.addEventListener('click',()=>{
    const nav = document.getElementById('main-nav');
    nav.style.display = nav.style.display === 'block' ? '' : 'block';
  })

  // Search
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  searchBtn?.addEventListener('click',()=>{window.dispatchEvent(new CustomEvent('site-search',{detail:searchInput?.value || ''}))} );

  // Scroll reveal simple
  const reveal = ()=>{
    document.querySelectorAll('.section').forEach(s=>{
      const rect = s.getBoundingClientRect();
      if(rect.top < window.innerHeight - 80) s.style.opacity = 1;
    })
  }
  window.addEventListener('scroll',reveal); reveal();

  // Particles background (simple)
  const canvas = document.getElementById('particle-canvas');
  if(canvas){
    canvas.width = window.innerWidth; canvas.height = 600;
    const ctx = canvas.getContext('2d');
    const particles = [];
    for(let i=0;i<80;i++) particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.5+0.3,vx:(Math.random()-0.5)*0.2,vy:(Math.random()-0.2)*0.4,c:`rgba(255,${~~(150+Math.random()*100)},${~~(150+Math.random()*100)},${0.06+Math.random()*0.12})`});
    function tick(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy; if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0; if(p.y>canvas.height)p.y=0; ctx.beginPath();ctx.fillStyle=p.c;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(tick)}
    tick();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMain, {once:true});
} else {
  initializeMain();
}
