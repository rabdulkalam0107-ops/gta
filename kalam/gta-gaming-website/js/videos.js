const VIDEOS = [
  {id:'v1',title:'GTA V - Epic Heist Montage',cat:'GTA V Gameplay',duration:'6:34',thumb:'https://img.youtube.com/vi/3kG6w8vWmOE/maxresdefault.jpg',url:'https://www.youtube.com/embed/3kG6w8vWmOE'},
  {id:'v2',title:'GTA Online - Stunt Compilation',cat:'GTA Online',duration:'4:12',thumb:'https://img.youtube.com/vi/1Vq3I3Z3lQw/maxresdefault.jpg',url:'https://www.youtube.com/embed/1Vq3I3Z3lQw'},
  {id:'v3',title:'San Andreas - Retro Walkthrough',cat:'San Andreas',duration:'7:22',thumb:'https://img.youtube.com/vi/2Z4m4lnjxkY/maxresdefault.jpg',url:'https://www.youtube.com/embed/2Z4m4lnjxkY'}
];

function renderVideos(filter='all'){
  const grid = document.getElementById('videos-grid');
  if(!grid) return; grid.innerHTML='';
  const list = VIDEOS.filter(v=>filter==='all' || v.cat===filter);
  list.forEach(v=>{
    const el = document.createElement('div'); el.className='video-card';
    el.innerHTML = `<img src="${v.thumb}" alt="${v.title}"><div class="video-content"><h4>${v.title}</h4><div class='games-meta'><span>${v.cat}</span><span>${v.duration}</span></div><div style='margin-top:8px'><button class='btn play-video' data-url='${v.url}'>Play</button></div></div>`;
    grid.appendChild(el);
  })
  document.querySelectorAll('.play-video').forEach(b=>b.addEventListener('click',e=>openVideoModal({url:b.dataset.url})) )
}

function openVideoModal(video){
  // YouTube blocks iframe playback from file:// pages with Error 153.
  if (window.location.protocol === 'file:') {
    window.open(video.url.replace('/embed/', '/watch?v='), '_blank', 'noopener');
    return;
  }
  const body = document.getElementById('video-modal-body');
  const separator = video.url.includes('?') ? '&' : '?';
  body.innerHTML = `<iframe width="100%" height="450" src="${video.url}${separator}rel=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  document.getElementById('video-modal').classList.add('show');
  document.getElementById('video-modal-close').onclick = ()=>{document.getElementById('video-modal').classList.remove('show'); body.innerHTML='';}
}

document.getElementById('video-filter')?.addEventListener('change',(e)=>renderVideos(e.target.value));
renderVideos();
