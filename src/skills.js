// Only tools confirmed by Nan Xi. Descriptions explain tools, not proficiency.
const skills = [
  ['HTML', 'HTML', '#bd4827', 'Web / markup', 'The structure of a web page: its headings, links, content, and meaningful sections.'],
  ['CSS', 'CSS', '#326aab', 'Web / styling', 'Layouts, colours, responsive screens, and the small visual details that shape an interface.'],
  ['JavaScript', 'JS', '#977313', 'Web / language', 'The language behind interactive web pages, from responding to a click to bringing an interface to life.'],
  ['Node.js', 'node', '#527a41', 'Backend / runtime', 'A JavaScript runtime for working beyond the browser, including servers and development tools.'],
  ['MongoDB', 'M', '#437953', 'Data / database', 'A document database that stores flexible, JSON-like records.'],
  ['Vercel', '▲', '#352e26', 'Web / hosting', 'A platform for deploying web projects and sharing them online.'],
  ['Figma', 'Fi', '#a04f7b', 'Design / interface', 'A collaborative space for interface designs, layouts, and interactive prototypes.'],
  ['Photoshop', 'Ps', '#326b94', 'Design / images', 'An image-editing tool for working with photos, compositions, and visual assets.'],
  ['Illustration', '✎', '#af692b', 'Design / illustration', 'Drawing and visual storytelling: exploring ideas through shapes, colour, and composition.'],
  ['PHP', 'php', '#74649c', 'Backend / language', 'A server-side programming language often used to build dynamic websites.'],
  ['MySQL', 'my', '#3c7b8f', 'Data / database', 'A relational database for organising information into tables and querying it with SQL.'],
  ['SQL Workbench', 'SQL', '#8b623b', 'Data / tool', 'A database tool for working with SQL queries and exploring structured data.'],
  ['C++', 'C++', '#476a9c', 'Programming / language', 'A compiled programming language used for a wide range of software, from applications to systems.'],
  ['Python', 'Py', '#88722c', 'Programming / language', 'A general-purpose language used for scripting, automation, data, and application development.'],
  ['Dart', 'Da', '#357e92', 'Programming / language', 'A programming language used with Flutter to build applications.'],
  ['Flutter', 'Fl', '#2c7d9f', 'Apps / framework', 'A framework for building interfaces for multiple platforms from a shared Dart codebase.'],
];

const root = document.querySelector('#skills');
if (root) {
  const globe = root.querySelector('.skills-globe');
  const canvas = globe.querySelector('canvas');
  const context = canvas.getContext('2d');
  const nodes = globe.querySelector('.globe-nodes');
  const list = root.querySelector('.skills-list');
  const motion = root.querySelector('#globe-motion');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let visible = false;
  let hovered = false;
  let dragging = false;
  let moved = false;
  let yaw = .4;
  let pitch = -.16;
  let size = 480;
  let lastTime = 0;
  let frame = 0;
  let selected = 2;
  const points = skills.map((_, i) => {
    const y = 1 - 2 * (i + .5) / skills.length;
    const angle = i * Math.PI * (3 - Math.sqrt(5));
    return [Math.cos(angle) * Math.sqrt(1 - y * y), y, Math.sin(angle) * Math.sqrt(1 - y * y)];
  });
  const buttons = [];
  const chips = [];
  function select(index) {
    selected = index;
    const [name, , , category, description] = skills[index];
    root.querySelector('#skill-name').textContent = name;
    root.querySelector('#skill-category').textContent = category.toUpperCase();
    root.querySelector('#skill-description').textContent = description;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(index === i)));
    chips.forEach((button, i) => button.setAttribute('aria-pressed', String(index === i)));
  }
  skills.forEach(([name, mark, colour], i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'globe-skill';
    button.style.setProperty('--skill-colour', colour);
    button.setAttribute('aria-label', `Explore ${name}`);
    const icon = document.createElement('span'); icon.className = 'skill-mark'; icon.textContent = mark;
    const label = document.createElement('span'); label.className = 'skill-node-label'; label.textContent = name;
    button.append(icon, label);
    button.addEventListener('click', () => { if (!moved) select(i); });
    button.addEventListener('focus', () => select(i));
    nodes.append(button); buttons.push(button);
    const chip = document.createElement('button');chip.type = 'button';chip.textContent = name;
    chip.addEventListener('click', () => select(i)); list.append(chip);chips.push(chip);
  });
  select(selected);
  function project([x, y, z]) {
    const a = x * Math.cos(yaw) + z * Math.sin(yaw);
    const b = -x * Math.sin(yaw) + z * Math.cos(yaw);
    const c = y * Math.cos(pitch) - b * Math.sin(pitch);
    const depth = y * Math.sin(pitch) + b * Math.cos(pitch);
    const scale = 3 / (3 - depth * .35);
    return [size / 2 + a * size * .35 * scale, size / 2 + c * size * .35 * scale, depth];
  }
  function draw() {
    if (context) {
      context.clearRect(0, 0, size, size);
      const line = points => {
        context.beginPath();
        points.forEach((point, i) => { const [x,y] = project(point); if (i) context.lineTo(x,y); else context.moveTo(x,y); });
        context.stroke();
      };
      context.lineWidth = .7;
      context.strokeStyle = 'rgba(190,132,63,.19)';
      for(let lat = 1;lat < 10;lat++) {
        const phi = lat * Math.PI / 10;
        line(Array.from({length:81}, (_, j) => {const theta = j * Math.PI / 40;return [Math.sin(phi)*Math.cos(theta),Math.cos(phi),Math.sin(phi)*Math.sin(theta)];}));
      }
      for(let lon = 0;lon < 12;lon++) {
        const theta = lon * Math.PI / 6;
        line(Array.from({length:81}, (_, j) => {const phi = j * Math.PI / 40;return [Math.sin(phi)*Math.cos(theta),Math.cos(phi),Math.sin(phi)*Math.sin(theta)];}));
      }
    }
    buttons.forEach((button, i) => {
      const [x,y,z] = project(points[i]);
      button.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${.8 + (z+1)*.13})`;
      button.style.opacity = String(.45 + (z+1)*.275);
      button.style.zIndex = String(Math.round((z+1)*100));
    });
  }
  function canAnimate() { return visible && !document.hidden && !paused && !hovered && !dragging && !globe.contains(document.activeElement); }
  function tick(time) {
    frame = 0;
    if (canAnimate()) { yaw += Math.min(time - (lastTime || time), 40) * .00012; draw();lastTime=time;frame=requestAnimationFrame(tick); }
    else lastTime=0;
  }
  function resume() { if (!frame && canAnimate()) frame=requestAnimationFrame(tick); }
  function setMotionLabel() { motion.textContent = paused ? 'Play rotation' : 'Pause rotation';motion.setAttribute('aria-pressed',String(paused)); }
  setMotionLabel();
  motion.addEventListener('click', () => { paused=!paused;setMotionLabel();resume(); });
  reducedMotion.addEventListener('change', () => { paused=reducedMotion.matches;setMotionLabel();resume(); });
  new IntersectionObserver(entries => { visible=entries[0].isIntersecting;resume(); }, {threshold:.1}).observe(globe);
  new ResizeObserver(() => {
    size=globe.clientWidth;
    const ratio=Math.min(devicePixelRatio || 1,2);
    canvas.width=size*ratio;canvas.height=size*ratio;
    context?.setTransform(ratio,0,0,ratio,0,0);draw();
  }).observe(globe);
  globe.addEventListener('pointerenter', () => {hovered=true;});
  globe.addEventListener('pointerleave', () => {hovered=false;resume();});
  globe.addEventListener('focusout', () => requestAnimationFrame(resume));
  document.addEventListener('visibilitychange',resume);
  let startX=0, startY=0, previousX=0, previousY=0;
  globe.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    dragging=true;moved=false;startX=previousX=event.clientX;startY=previousY=event.clientY;
  });
  globe.addEventListener('pointermove', event => {
    if (!dragging) return;
    if (Math.abs(event.clientX-startX)>6 || Math.abs(event.clientY-startY)>6) {
      moved=true;
      if (!globe.hasPointerCapture(event.pointerId)) globe.setPointerCapture(event.pointerId);
    }
    if (moved) {yaw+=(event.clientX-previousX)*.008;pitch=Math.max(-1,Math.min(1,pitch+(event.clientY-previousY)*.005));draw();}
    previousX=event.clientX;previousY=event.clientY;
  });
  function endDrag() {dragging=false;resume();}
  globe.addEventListener('pointerup',endDrag);globe.addEventListener('pointercancel',endDrag);
  let scrollY=window.scrollY;
  window.addEventListener('scroll', () => { const delta=window.scrollY-scrollY;scrollY=window.scrollY;if(visible && !paused && !reducedMotion.matches && !dragging){yaw+=delta*.001;draw();} }, {passive:true});
}
