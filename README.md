# Nan Xi — portfolio

A warm, responsive portfolio with About, school projects, Internship, personal projects, learning notes, and Contact. Built with Vite, CSS, and vanilla JavaScript. Placeholder entries are clearly marked; no experience or completed projects are invented.

## Run locally

Node.js 22 or newer:

```sh
npm ci --cache /tmp/portfolio-npm-cache
npm run dev
```

## Add a project

Edit `src/projects.js`. Duplicate an entry, give it a unique `id`, and choose `category: 'school'` or `category: 'personal'`. Update the title, subtitle, tags, overview, learning, and status. The page creates the card and detail dialog automatically. Choose `visual: 'browser'`, `'shapes'`, `'play'`, or `'idea'`.

### Add a video demo

Put an MP4 file in `public/videos/`, then set the project's `video` field to `'videos/my-demo.mp4'`. Use MP4 with H.264 video for broad browser support. The site shows native playback controls and does not autoplay. You can also use a direct HTTPS video-file URL; a YouTube page URL is not a video file. Add captions when the demo includes spoken content. Large video files should be hosted externally to avoid GitHub file-size limits.

Optional `repo` and `live` fields accept full HTTPS URLs; leave them empty until ready.

Edit the About and Internship text directly in `index.html`. Change colours in `src/style.css`. Google Fonts is optional and falls back to system fonts.

## Publish

In GitHub repository Settings → Pages, select **GitHub Actions** as the source. The included workflow builds and publishes each push to `main`. The expected site address is https://nan0210hi.github.io/portfolio/ once deployment succeeds.

```sh
npm run build -- --base=/portfolio/
```

Refresh the same site link after each successful deployment to test changes. The GitHub Actions tab shows deployment progress and errors.

## Commit identity

Before committing, verify repository-local `user.name` is `nan0210hi` and `user.email` matches the identity used in the repository owner's initial commit. Verify **both author and committer** on the resulting commit before pushing. Do not rely on a machine's global Git identity.

## School project gallery

`school-projects.html` is an internal page, linked from the school section. Vite builds both HTML pages, including when the site is hosted under `/portfolio/`. GitHub and live-demo buttons open external destinations in a new tab.

All current entries are placeholders. Ten school slots are provided; suggested technology labels describe plans, not completed skills or projects. Edit the entries and `schoolSlots` in `src/projects.js` to replace them with real work. Set `technologies` to the actual tools used (languages, frameworks, databases, or hosting tools); these generate the gallery filters automatically. Filters are also shareable through `?tech=Python`, for example.

Use `cover: 'images/my-project.webp'` and a descriptive `coverAlt` for an actual project screenshot placed in `public/images/`. Add `contribution` to explain the code you personally wrote, technical decisions, and testing. Add `repo` for the full GitHub repository URL, `live` for a deployed demo URL, and `video` for a demo video as described above. Missing links display “coming soon” without fake destinations. Videos have controls and never autoplay. Keep `placeholder: true` and the placeholder status until the entry is replaced with real work.

Preview the production build with `npm run preview -- --base=/portfolio/` so that its asset base matches the build.
