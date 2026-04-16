# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static personal portfolio website built with vanilla HTML, CSS, and JavaScript — no framework, no build tools, no dependencies.

## Running Locally

No build step required. Serve the files directly:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Architecture

- `index.html` — homepage (hero, projects, blog preview, contact)
- `blog.html` — blog post listing
- `blog/post-template.html` — template for individual blog posts
- `css/style.css` — all styles (~300 lines); single file, no preprocessor
- `js/main.js` — theme toggle only; persists preference to `localStorage`

## Styling Conventions

- Dark theme is default; light theme toggled via `.light-theme` class on `<html>`
- Design tokens are defined as CSS custom properties at the top of `style.css`
- Dark theme accents: pink `#f472b6`, cyan `#7dd3fc` on `#130a10` background
- Light theme accents: red `#e11d48`, blue `#0369a1` on `#f0f8ff` background
- Glassmorphism via `backdrop-filter: blur(16px)` on cards and nav
- Mobile breakpoint: `640px`
- Fonts: Inter (body), Fira Code / Cascadia Code (code blocks) — loaded from Google Fonts

## Adding Blog Posts

Copy `blog/post-template.html` to a new file under `blog/`, fill in the content, then add a link entry to `blog.html`.
