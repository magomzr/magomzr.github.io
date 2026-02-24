[![Deploy static content to Pages](https://github.com/magomzr/magomzr.github.io/actions/workflows/main.yml/badge.svg)](https://github.com/magomzr/magomzr.github.io/actions/workflows/main.yml)

# /home/mago

A minimalist tech blog built with Angular 21 and deployed on GitHub Pages.

## Tech Stack

- Angular 21 with standalone components and signals
- TypeScript
- Vitest for unit testing
- pnpm for package management
- GitHub Actions for CI/CD

## Features

- Static post rendering from JSON
- Tag-based filtering
- Hash-based routing for GitHub Pages compatibility
- Responsive minimalist design
- Full test coverage

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm start

# Run tests
pnpm test

# Build for production
pnpm build
```

## Project Structure

```
src/app/
├── components/     # Reusable UI components
├── pages/          # Route components
├── services/       # Data services
├── guards/         # Route guards
└── types/          # TypeScript interfaces
```

## License

MIT
