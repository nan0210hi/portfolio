const book = document.querySelector('#about-book');
if (book) {
  const chapters = [
    { title: 'A little about me.', name: 'My story', art: 'story', symbol: '✳', note: 'Still learning. Still becoming.', caption: 'THE EVERYDAY COLLECTION', paragraphs: ['I’m Nan Xi, an Infocomm & Media Engineering student exploring technology, creativity, and everyday life.', 'This scrapbook is a place for the person behind the projects: the time I spend teaching, the games that spark my curiosity, and the activities I enjoy away from a screen.'], tags: ['Curiosity', 'Learning', 'Everyday life'] },
    { title: 'Learning goes both ways.', name: 'Tutoring', art: 'teaching', symbol: 'Aa', note: 'Time, patience & a little encouragement.', caption: 'THREE YEARS OF TUTORING', paragraphs: ['Tutoring has been part of my life for three years. It is a responsibility I take seriously: making time for someone else’s learning and communicating with care.', 'For me, teaching means listening, being patient, and finding a clear way to explain an idea. I want this part of my story to show the care I bring to working with people.'], tags: ['Responsibility', 'Communication', 'Patience'] },
    { title: 'A little room to play.', name: 'Gaming & creativity', art: 'gaming', symbol: '＋', note: 'What if I made something, too?', caption: 'PLAY / WONDER / CREATE', paragraphs: ['Gaming is one of my hobbies — a space for fun, imagination, and curiosity.', 'It also connects with my interest in making things. I’m interested in the step from playing an experience to creating one of my own. This chapter is about that curiosity; project details belong in my personal project collection.'], tags: ['Gaming', 'Imagination', 'Creative ideas'] },
    { title: 'A change of pace.', name: 'Running & swimming', art: 'movement', symbol: '≈', note: 'A little movement. A little breathing room.', caption: 'AWAY FROM THE SCREEN', paragraphs: ['Running and swimming are two activities I enjoy outside my studies and time spent on a screen.', 'They are another side of my everyday life, alongside learning, teaching, and creating. This page is a small reminder to make room for the things I enjoy beyond technology.'], tags: ['Running', 'Swimming', 'Life outside study'] },
  ];
  let current = 0;
  const spread = book.querySelector('.book-spread');
  const previous = book.querySelector('#book-prev');
  const next = book.querySelector('#book-next');
  const heading = book.querySelector('#book-heading');
  const chapterButtons = [...book.querySelectorAll('[data-chapter]')];
  function render(index, animate = true) {
    const direction = index < current ? -1 : 1;
    current = index;
    const chapter = chapters[index];
    heading.textContent = chapter.title;
    book.querySelector('#book-chapter').textContent = `0${index + 1} / ${chapter.name.toUpperCase()}`;
    book.querySelector('#book-body').replaceChildren(...chapter.paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
    book.querySelector('#book-tags').replaceChildren(...chapter.tags.map(text => { const tag = document.createElement('span'); tag.textContent = text; return tag; }));
    const art = book.querySelector('.book-art');
    art.dataset.art = chapter.art;
    art.querySelector('.book-art-caption').textContent = chapter.caption;
    art.querySelector('.chapter-illustration').textContent = chapter.symbol;
    art.querySelector('.book-handwriting').textContent = chapter.note;
    book.querySelector('#book-position').textContent = `${index + 1} / ${chapters.length}`;
    previous.disabled = index === 0;
    next.disabled = index === chapters.length - 1;
    chapterButtons.forEach((button, i) => { if (i === index) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current'); });
    if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const page = spread.querySelector('.book-copy');
      page.getAnimations().forEach(animation => animation.cancel());
      page.animate([{ opacity: .25, transform: `perspective(1200px) rotateY(${direction * -75}deg)` }, { opacity: 1, transform: 'perspective(1200px) rotateY(0deg)' }], { duration: 520, easing: 'ease-out' });
    }
  }
  document.querySelector('#open-scrapbook').addEventListener('click', () => { render(0, false); book.showModal(); });
  book.querySelector('.book-close').addEventListener('click', () => book.close());
  book.addEventListener('close', () => document.querySelector('#open-scrapbook').focus({ preventScroll: true }));
  function turn(index) { render(index); heading.focus({ preventScroll: true }); }
  previous.addEventListener('click', () => turn(Math.max(0, current - 1)));
  next.addEventListener('click', () => turn(Math.min(chapters.length - 1, current + 1)));
  chapterButtons.forEach(button => button.addEventListener('click', () => turn(Number(button.dataset.chapter))));
  book.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' && current < chapters.length - 1) { event.preventDefault(); turn(current + 1); }
    if (event.key === 'ArrowLeft' && current > 0) { event.preventDefault(); turn(current - 1); }
  });
  book.addEventListener('click', event => { if (event.target === book) { const r = book.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) book.close(); } });
}
