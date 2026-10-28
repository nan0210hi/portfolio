// Add or edit projects here. Duplicate an entry to create another project card.
// Video files go in public/videos. Example: video: 'videos/my-demo.mp4'.
// All entries below are placeholders, not claims of completed work.
export const projects = [
  {
    id: 'school-one', category: 'school', title: 'My first school project',
    subtitle: 'A space for a coursework project, from the first idea to the final outcome.',
    type: 'SCHOOL PROJECT', status: 'Details coming soon', visual: 'browser',
    tags: ['Coursework', 'Learning journey'],
    overview: 'Project details will be added here: the brief, the problem, my role, and how I approached it.',
    learning: 'I’ll share the tools I used, the challenges I worked through, and what I would improve next time.',
    video: '', repo: '', live: '',
  },
  {
    id: 'school-two', category: 'school', title: 'The next chapter',
    subtitle: 'More room for a team assignment, technical exploration, or creative challenge.',
    type: 'SCHOOL PROJECT', status: 'Details coming soon', visual: 'shapes',
    tags: ['Coursework', 'Exploration'],
    overview: 'This is a placeholder for another school project. Project goals, contributions, and screenshots can be added later.',
    learning: 'Lessons and reflections from this project will appear here.',
    video: '', repo: '', live: '',
  },
  {
    id: 'personal-one', category: 'personal', title: 'A little side project',
    subtitle: 'An idea built out of curiosity, at my own pace and just for the fun of it.',
    type: 'PERSONAL PROJECT', status: 'Details coming soon', visual: 'play',
    tags: ['Spare-time ideas', 'Experimenting'],
    overview: 'A space for something I create outside the classroom. I’ll add the idea, the process, and the result here.',
    learning: 'Experiments, discoveries, and little breakthroughs will be documented here.',
    video: '', repo: '', live: '',
  },
  {
    id: 'personal-two', category: 'personal', title: 'What if I tried…',
    subtitle: 'A blank page for the next experiment. Small ideas are welcome here.',
    type: 'PERSONAL PROJECT', status: 'Details coming soon', visual: 'idea',
    tags: ['Creative technology', 'New possibilities'],
    overview: 'This space is reserved for a future personal project. Nothing completed yet — just room to explore.',
    learning: 'I’ll share what I discover as the project takes shape.',
    video: '', repo: '', live: '',
  },
];

// Suggested stacks describe empty portfolio slots, not completed work or skills.
const schoolSlots = [
  ['Web interface', ['HTML', 'CSS', 'JavaScript']],
  ['Mobile application', ['Dart', 'Flutter']],
  ['C# application', ['C#']],
  ['Python exploration', ['Python']],
  ['Database project', ['MySQL', 'SQL']],
  ['Full-stack experiment', ['JavaScript', 'MySQL']],
  ['Deployed web project', ['HTML', 'CSS', 'Vercel']],
  ['Open-ended coursework', ['Other']],
];
for (const [index, [name, technologies]] of schoolSlots.entries()) {
  projects.push({
    id: `school-slot-${index + 3}`, category: 'school',
    title: name, subtitle: 'Reserved for a real coursework project. Details will be added when ready.',
    type: 'SCHOOL PROJECT', status: 'Project slot · not published', visual: 'browser',
    tags: ['Placeholder'], technologies, placeholder: true,
    overview: 'This is an empty project slot, not a completed project. The suggested stack can be changed to match the actual work.',
    learning: 'Add a technical challenge, the approach you tried, and what the result taught you.',
    contribution: '', cover: '', coverAlt: '', video: '', repo: '', live: '',
  });
}
for (const project of projects) {
  project.placeholder ??= true;
  project.technologies ??= [];
  project.cover ??= '';
  project.coverAlt ??= '';
  project.contribution ??= '';
}
