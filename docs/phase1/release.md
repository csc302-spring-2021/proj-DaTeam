# Release

> What does the git and release workflow look like?

- branches:
  - main: reflects the current state of production
  - dev: active development branch, all PRs are destined for this branch
  - frontend/backend: initial integration branches for frontend/backend-specific code changes (will be deprecated after P1?)
- GitHub actions release on push to main deploys two Docker containers to Heroku
