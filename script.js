'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('navigation');
function closeMenu(){ nav?.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const cards=[...document.querySelectorAll('.design-card')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;let count=0;
 cards.forEach(card=>{card.hidden=filter!=='all'&&!card.dataset.category.split(' ').includes(filter);if(!card.hidden)count++;});
 document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
 document.getElementById('result-count').textContent=`${count} ${count===1?'design':'designs'}`;
}));
const dataElement=document.getElementById('design-data');
if(dataElement){
 const designs=JSON.parse(dataElement.textContent);
 const dialog=document.getElementById('design-dialog');
 const image=document.getElementById('detail-image');
 const video=document.getElementById('detail-video');
 const watch=document.getElementById('dialog-watch');
 const error=document.getElementById('video-error');
 let selected=null;let trigger=null;
 function playReel(){
  if(!selected?.video)return;
  image.hidden=true;video.hidden=false;watch.hidden=true;error.hidden=true;
  const src=`assets/reels/${selected.video}.mp4`;
  video.src=src;video.poster=`assets/designs/${selected.image}.webp`;
  document.getElementById('video-download').href=src;
  video.play().catch(()=>{/* Native controls remain available if autoplay is blocked. */});
 }
 function openDesign(id,reel=false,source=null){
  selected=designs.find(d=>d.id===id);if(!selected)return;
  trigger=source;video.pause();video.removeAttribute('src');video.load();video.hidden=true;error.hidden=true;
  image.hidden=false;image.src=`assets/designs/${selected.image}.webp`;image.alt=`${selected.name} — ${selected.kind}`;
  document.getElementById('dialog-title').textContent=selected.name;
  document.getElementById('dialog-kind').textContent=`${selected.kind} · ${selected.id}`;
  document.getElementById('dialog-description').textContent=selected.desc;
  document.getElementById('dialog-note').textContent=selected.note;
  document.getElementById('dialog-enquire').href=selected.enquiry;
  watch.hidden=!selected.video;
  if(!dialog.open)dialog.showModal();
  document.body.classList.add('modal-open');
  if(reel)playReel();
 }
 document.querySelectorAll('[data-design]').forEach(b=>b.addEventListener('click',()=>openDesign(b.dataset.design,false,b)));
 document.querySelectorAll('[data-reel]').forEach(b=>b.addEventListener('click',()=>openDesign(b.dataset.reel,true,b)));
 watch.addEventListener('click',playReel);
 video.addEventListener('error',()=>{if(video.getAttribute('src'))error.hidden=false;});
 document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{video.pause();video.removeAttribute('src');video.load();document.body.classList.remove('modal-open');trigger?.focus();});
 function followDesignLink(){const id=location.hash.slice(1);if(designs.some(d=>d.id===id))openDesign(id);}
 window.addEventListener('hashchange',followDesignLink);followDesignLink();
}
