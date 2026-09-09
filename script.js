const menu=document.querySelector('.menu');
const nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
  menu.textContent=open?'✕':'☰';
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
  if(menu) menu.textContent='☰';
}));
const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();
const reelTrack=document.querySelector('.reel-track');
document.querySelector('.reel-arrow.prev')?.addEventListener('click',()=>reelTrack?.scrollBy({left:-320,behavior:'smooth'}));
document.querySelector('.reel-arrow.next')?.addEventListener('click',()=>reelTrack?.scrollBy({left:320,behavior:'smooth'}));