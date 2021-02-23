# Release

> What does the git and release workflow look like?

For our Git workflow, we have a couple of different branches with different purposes:

- **main**: reflects the current state of production
- **dev**: active development branch, all PRs are destined for this branch
- **frontend/backend**: initial integration branches for frontend/backend-specific code changes (will be deprecated after P1?)

We also set up a GitHub actions release workflow that runs on pushes to dev and deploys two Docker containers (frontend and backend) to Heroku.
