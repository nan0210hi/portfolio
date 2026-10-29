import './skills.js';
import './scrapbook.js';
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
const isGallery = document.body.dataset.page === 'school-gallery';
const visibleProjects = isGallery ? projects.filter(p => p.category === 'school') : projects.filter(p => p.category !== 'school' || ['school-one', 'school-two'].includes(p.id));
for (const project of visibleProjects) {
 const article=document.createElement('article'); article.className='project'; article.dataset.projectId=project.id;
 const button=document.createElement('button'); button.className='project-button'; button.setAttribute('aria-label',`View ${project.title} details`);
 const visual=document.createElement('div'); visual.className=`project-art art-${project.visual}`; visual.setAttribute('aria-hidden','true'); visual.innerHTML=art[project.visual]+`<span class="art-corner">${arrow}</span>`;
 if(project.cover){
  const image=document.createElement('img');image.src=project.cover;image.alt=project.coverAlt || `${project.title} screenshot`;image.loading='lazy';
  visual.removeAttribute('aria-hidden');visual.replaceChildren(image);
  image.addEventListener('error',()=>{visual.setAttribute('aria-hidden','true');visual.innerHTML=art[project.visual];},{once:true});
 } else if(isGallery){
  const caption=document.createElement('span');caption.className='cover-placeholder';caption.textContent='PROJECT SCREENSHOT · COMING SOON';visual.append(caption);
 }
 const info=document.createElement('div'); info.className='project-info';
 const meta=document.createElement('div'); meta.className='project-meta';
 const type=document.createElement('span');type.textContent=project.type;
 const status=document.createElement('span');status.textContent=project.status;
 meta.append(type,status);
 const title=document.createElement('h3');title.textContent=project.title;
 const subtitle=document.createElement('p');subtitle.textContent=project.subtitle;
 const stack=document.createElement('div');stack.className='card-stack';
 for(const technology of project.technologies){const tag=document.createElement('span');tag.textContent=technology;stack.append(tag);}
 info.append(meta,title,subtitle,stack);button.append(visual,info);article.append(button);
 button.addEventListener('click',()=>openProject(project));
 document.querySelector(`#${project.category}-projects`)?.append(article);
}
const dialog=document.querySelector('#project-dialog');
function safeUrl(value){try {const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:null;}catch{return null;}}
function openProject(project){
 document.querySelector('#dialog-cover')?.remove();
 if(project.cover){const image=document.createElement('img');image.id='dialog-cover';image.src=project.cover;image.alt=project.coverAlt || `${project.title} screenshot`;image.addEventListener('error',()=>image.remove(),{once:true});document.querySelector('.detail-grid').before(image);}
 const previous=document.querySelector('#coding-contribution');previous?.remove();
 const contribution=document.createElement('section');contribution.id='coding-contribution';contribution.className='coding-contribution';
 const heading=document.createElement('h3');heading.textContent='My coding contribution';
 const description=document.createElement('p');description.textContent=project.contribution || 'Coming soon: my role, the features I implemented, key technical decisions, and how I tested the result.';
 contribution.append(heading,description);document.querySelector('#video-area').before(contribution);
 document.querySelector('#dialog-category').textContent=project.type;
 document.querySelector('#dialog-title').textContent=project.title;
 document.querySelector('#dialog-description').textContent=project.subtitle;
 document.querySelector('#dialog-overview').textContent=project.overview;
 document.querySelector('#dialog-learning').textContent=project.learning;
 document.querySelector('#dialog-tags').replaceChildren(...[...project.tags,...project.technologies].map(tag=>{const isTechnology=project.technologies.includes(tag);const el=document.createElement(isTechnology?'a':'span');el.textContent=tag;if(isTechnology){el.href=`${import.meta.env.BASE_URL}school-projects.html?tech=${encodeURIComponent(tag)}`;el.setAttribute('aria-label',`Explore ${tag} school projects`);}return el;}));
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
 for(const [field,label] of [['repo','View code on GitHub'],['live','Open live demo']]){const url=safeUrl(project[field]);if(url){const a=document.createElement('a');a.href=url;a.textContent=label+' ↗';a.target='_blank';a.rel='noopener noreferrer';a.className='button secondary';links.append(a);}else{const labelElement=document.createElement('span');labelElement.className='unavailable-link';labelElement.textContent=field==='repo'?'GitHub · coming soon':'Live demo · coming soon';links.append(labelElement);}}
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

if (isGallery) {
 const filters=document.querySelector('#technology-filters');
 const technologies=['All',...new Set(visibleProjects.flatMap(p=>p.technologies))];
 const params=new URLSearchParams(location.search);
 let selected=technologies.includes(params.get('tech'))?params.get('tech'):'All';
 function filterProjects(technology){
  selected=technology;
  let count=0;
  document.querySelectorAll('.gallery-grid .project').forEach(card=>{
   const project=visibleProjects.find(p=>p.id===card.dataset.projectId);
   card.hidden=technology!=='All'&&!project.technologies.includes(technology);
   if(!card.hidden)count++;
  });
  filters.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.textContent===technology)));
  document.querySelector('#project-count').textContent=`${count} of ${visibleProjects.length} project slots`;
  document.querySelector('#empty-projects').hidden=count!==0;
 }
 for(const technology of technologies){
  const button=document.createElement('button');button.type='button';button.textContent=technology;
  button.addEventListener('click',()=>{
   filterProjects(technology);
   const url=new URL(location.href);if(technology==='All')url.searchParams.delete('tech');else url.searchParams.set('tech',technology);
   history.replaceState(null,'',url);
  });filters.append(button);
 }
 filterProjects(selected);
 window.addEventListener('popstate',()=>{const tech=new URLSearchParams(location.search).get('tech');filterProjects(technologies.includes(tech)?tech:'All');});
}
// Observe once; content remains visible without animation or browser support.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}
 }),{threshold:0.08});
 document.querySelectorAll('.section-heading,.about-text,.note-grid article,.project').forEach(el=>observer.observe(el));
}
const sectionLinks=[...navigation.querySelectorAll('a[href^="#"]')];
if ('IntersectionObserver' in window) {
 const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting)sectionLinks.forEach(link=>{
   if(link.hash===`#${entry.target.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
  });
 }),{rootMargin:'-20% 0px -55% 0px'});
 document.querySelectorAll('main section[id]').forEach(section=>activeObserver.observe(section));
}
