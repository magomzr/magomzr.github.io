# Mario Gomez Personal Portfolio & Blog

A React 18 + Vite single-page application (SPA) serving as a personal portfolio and blog. The application uses hash-based routing, TailwindCSS for styling, and connects to an external AWS Lambda API backend for content management.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the information here.**

## Working Effectively

### Prerequisites and Environment Setup
- Node.js v20.19.4+ and npm 10.8.2+ are required
- Verify versions: `node --version && npm --version`

### Bootstrap, Build, and Test the Repository
1. **Install dependencies**: `npm ci` -- takes 20 seconds. Uses package-lock.json for reproducible builds.
2. **Lint the code**: `npm run lint` -- takes 1 second. NEVER CANCEL. Uses ESLint with React plugins.
3. **Build for production**: `npm run build` -- takes 5 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
   - Outputs to `./dist/` directory
   - May show chunk size warnings (expected for 1.4MB main bundle)
4. **Development server**: `npm run dev` -- starts in under 200ms on http://localhost:9365/
5. **Preview production build**: `npm run preview` -- serves built files on http://localhost:4173/

### Validation Steps
- **ALWAYS** run linting before committing: `npm run lint` or CI will fail
- **CRITICAL**: Test actual functionality after any changes:
  - Navigate between pages (Home, Posts, Tags)
  - Test search functionality (click search button or Cmd/Ctrl+K)
  - Verify responsive design and dark/light theme toggle
  - Check that API error handling displays gracefully when backend is unavailable
- **Manual Testing Scenarios**:
  - Load homepage and verify navigation works
  - Click Posts and Tags links to test routing
  - Open search modal and verify it shows "No results" when backend is unavailable
  - Test mobile menu toggle on smaller screens

## Application Architecture

### Technology Stack
- **Frontend**: React 18.3.1 with React Router 6.27.0 (hash routing)
- **Build Tool**: Vite 5.4.8 with HMR (Hot Module Replacement)
- **Styling**: TailwindCSS 3.4.14 with Typography plugin
- **Search**: kbar 0.1.0-beta.45 for command palette
- **External API**: AWS Lambda backend at `https://h6hwgp2ek4zzm3wt5tsl...aws`
- **Deployment**: GitHub Pages via GitHub Actions

### Key Files and Structure
```
/
├── .github/workflows/main.yml  # CI/CD pipeline for GitHub Pages
├── src/
│   ├── main.jsx               # App entry point with router setup
│   ├── config/site.config.js  # Site configuration and settings
│   ├── services/api.js        # API service configuration
│   ├── pages/                 # Route components (home, posts, tags, etc.)
│   ├── components/           # Reusable UI components
│   ├── layouts/              # Page layout components
│   └── utils/                # Utility functions
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration (dev server port 9365)
├── tailwind.config.js       # TailwindCSS configuration
├── eslint.config.js         # ESLint configuration
└── dist/                    # Build output directory
```

### Routing Configuration
- Uses hash-based routing (`createHashRouter`) for GitHub Pages compatibility
- Routes: `/` (home), `/posts`, `/posts/:id`, `/tags`, `/tags/:tag`, `/editor`, `*` (404)
- All routes are wrapped in `MainLayout` component

### API Integration
- External backend for posts and tags data
- Services in `src/services/api.js`: `postService`, `tagService`, `tokenService`
- Graceful error handling when API is unavailable (shows "No posts found", "No tags found")

## Development Workflow

### Making Changes
- **Always start the dev server**: `npm run dev` for live reload during development
- **Key areas for common modifications**:
  - Site configuration: `src/config/site.config.js`
  - Routing: `src/main.jsx`
  - API endpoints: `src/services/api.js`
  - Styling: TailwindCSS classes (see `tailwind.config.js` for custom theme)
  - Components: `src/components/` and `src/pages/`

### Build and Deployment
- **CI/CD Pipeline**: `.github/workflows/main.yml`
  - Triggers on push to `main` branch
  - Runs: `npm ci` → `npm run build` → deploys to GitHub Pages
  - Build artifact uploaded from `./dist` directory
- **Local build testing**: Always run `npm run build && npm run preview` before pushing

### Common Tasks
- **Adding new pages**: Create in `src/pages/`, add route in `src/main.jsx`
- **Styling changes**: Modify TailwindCSS classes (custom config in `tailwind.config.js`)
- **API modifications**: Update `src/services/api.js` for endpoint changes
- **Configuration updates**: Modify `src/config/site.config.js` for site settings

## Troubleshooting

### Known Issues and Workarounds
- **API Connection Errors**: Expected in development when external backend is unavailable
- **Chunk Size Warnings**: Normal for current bundle size (~1.4MB), consider code splitting for optimization
- **npm install warnings**: Dependency conflicts with kbar package are non-blocking

### Common Error Solutions
- **Build failures**: Run `npm run lint` first to catch syntax errors
- **Routing issues**: Remember this uses hash routing (`#/path`) for GitHub Pages
- **Styling not applying**: Check TailwindCSS class names and custom config
- **API errors**: Verify `src/services/api.js` configuration and external service availability

## Repository Commands Quick Reference

### Timing Expectations (NEVER CANCEL)
- `npm ci`: 20 seconds
- `npm run lint`: 1 second  
- `npm run build`: 5 seconds (set timeout 60+ seconds)
- `npm run dev`: <200ms startup
- `npm run preview`: <1 second startup

### File Listings for Common Directories
```
Repository root:
.github/  .gitignore  README.md  dist/  eslint.config.js  
index.html  node_modules/  package-lock.json  package.json  
postcss.config.js  public/  src/  tailwind.config.js  vite.config.js

src/ directory:
components/  config/  css/  index.css  layouts/  
main.jsx  pages/  services/  utils/

Key source files:
src/main.jsx                  # Router and app entry
src/config/site.config.js     # Site configuration
src/services/api.js           # API configuration
src/pages/home.jsx            # Homepage component
src/pages/posts.jsx           # Posts listing
src/pages/post.jsx            # Individual post view
src/pages/tags.jsx            # Tags listing
src/layouts/MainLayout.jsx    # Main app layout
```

## Additional Notes
- **Development port**: 9365 (configured in `vite.config.js`)
- **Preview port**: 4173 (Vite default)
- **External dependencies**: Fetches content from AWS Lambda backend
- **Hash routing**: Required for GitHub Pages static hosting
- **Search functionality**: Uses kbar for command palette (Cmd/Ctrl+K)
- **Theme support**: Dark/light mode via TailwindCSS classes