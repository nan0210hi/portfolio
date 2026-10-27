import { projects } from './projects.js';
const arrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
// Inline SVG keeps decorative symbols consistent across devices.
const flower = `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" aria-hidden="true">${Array.from({length:8},(_,i)=>`<path d="M50 38V8" transform="rotate(${i*45} 50 50)"/>`).join('')}</svg>`;
document.querySelectorAll('.idea-star,.contact-sun').forEach(el=>el.innerHTML=flower);
const art = {
 browser: '<div class="mock-browser"><div class="browser-bar"><i></i><i></i><i></i></div><div class="browser-body"><span class="mock-label">A SMALL IDEA, BROUGHT TO LIFE.</span><div class="mock-line"></div><div class="mock-line short"></div><div class="mock-boxes"><i></i><i></i><i></i></div></div></div>',
 shapes: '<div class="shape-stack"><span class="shape-circle"></span><span class="shape-square"></span><span class="shape-arch"></span></div>',
 play: '<div class="play-window"><span class="play-label">IDEAS IN MOTION</span><div class="play-circle"><svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7z"/></svg></div><div class="play-line"></div></div>',
 idea: `<div class="idea-art">${flower}<span>what if?</span></div>`,
};
for (const project of projects) {
 const article=document.createElement('article'); article.className='project';
 const button=document.createElement('button'); button.className='project-button'; button.setAttribute('aria-label',`View ${project.title} details`);
 const visual=document.createElement('div'); visual.className=`project-art art-${project.visual}`; visual.setAttribute('aria-hidden','true'); visual.innerHTML=art[project.visual]+`<span class="art-corner">${arrow}</span>`;
 const info=document.createElement('div'); info.className='project-info';
 const meta=document.createElement('div'); meta.className='project-meta';
 const type=document.createElement('span');type.textContent=project.type;
 const status=document.createElement('span');status.textContent=project.status;
 meta.append(type,status);
 const title=document.createElement('h3');title.textContent=project.title;
 const subtitle=document.createElement('p');subtitle.textContent=project.subtitle;
 info.append(meta,title,subtitle);button.append(visual,info);article.append(button);
 button.addEventListener('click',()=>openProject(project));
 document.querySelector(`#${project.category}-projects`).append(article);
}
const dialog=document.querySelector('#project-dialog');
function safeUrl(value){try {const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:null;}catch{return null;}}
function openProject(project){
 document.querySelector('#dialog-category').textContent=project.type;
 document.querySelector('#dialog-title').textContent=project.title;
 document.querySelector('#dialog-description').textContent=project.subtitle;
 document.querySelector('#dialog-overview').textContent=project.overview;
 document.querySelector('#dialog-learning').textContent=project.learning;
 document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(tag=>{const el=document.createElement('span');el.textContent=tag;return el;}));
 const media=document.querySelector('#video-area');media.replaceChildren();
 if(project.video){
  const video=document.createElement('video');video.controls=true;video.preload='metadata';video.playsInline=true;
  const external=safeUrl(project.video);
  video.src=external || new URL(`${import.meta.env.BASE_URL}${project.video.replace(/^\/+/, '')}`,location.origin).href;
  video.setAttribute('aria-label',`${project.title} demo video`);media.append(video);
  const fallback=document.createElement('p');fallback.className='video-fallback';fallback.textContent='If the video doesn’t load, check the video path or format.';
  video.addEventListener('error',()=>media.append(fallback),{once:true});
 }else{
  const placeholder=document.createElement('div');placeholder.className='video-placeholder';
  const label=document.createElement('h3');label.textContent='Project demo';
  const text=document.createElement('p');text.textContent='A video walkthrough will live here when this project is ready to share.';
  placeholder.append(label,text);media.append(placeholder);
 }
 const links=document.querySelector('#project-links');links.replaceChildren();
 for(const [field,label] of [['repo','View source code'],['live','Visit project']]){const url=safeUrl(project[field]);if(url){const a=document.createElement('a');a.href=url;a.textContent=label+' ↗';a.target='_blank';a.rel='noopener noreferrer';links.append(a);}}
 dialog.showModal();
}
function closeDialog(){dialog.querySelector('video')?.pause();dialog.close();}
document.querySelectorAll('.dialog-close,.dialog-back').forEach(el=>el.addEventListener('click',closeDialog));
dialog.addEventListener('cancel',()=>dialog.querySelector('video')?.pause());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();}});
const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');navigation.classList.remove('open');}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){toggle.setAttribute('aria-expanded','false');navigation.classList.remove('open');toggle.focus();}});
document.querySelector('#year').textContent=new Date().getFullYear();
