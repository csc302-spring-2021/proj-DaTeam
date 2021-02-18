# DaTeam's SDC Web App

## Getting Started

1. `npm i`
2. `cp .env.template .env`

## Docker

1. (Optional) Run `docker-compose --env-file=./.env down --remove-orphans` to remove orphaned containers
2. `npm run docker`
3. Go to http://localhost:3000 for frontend and http://localhost:3001 for backend


## Testing

1. `npm test`