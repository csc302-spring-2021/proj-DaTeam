# Architecture

> Slice the app. Describe the main client and server components and identify the middleware you intend to use to build each.

We divided our project into three major groups:

- **Shared**: Contains types, data structures, and utilities shared by both frontend and backend applications
- **Frontend**: A React app bootstrapped using [Create React App](https://create-react-app.dev/) that communicates via HTTP requests with the REST API exposed by the Backend service
- **Backend**: An Express-based REST API that returns JSON data and uses a Postgres database as a persistent storage layer


## Frontend

Our frontend is a single page application with multiple routes that fetch, transform, and display information from the backend, including: the form structure and responses. Following best practices, we divided our app into components, pages and services.

- **Components:** These are reusable React components that don't handle any business logic and are easily unit tested.
- **Pages:** These are top-level React components that manage data fetching, UI and business logic, and routing
- **Services:** These implement the data fetching layer for the fronted and encapsulate handling of errors, serialization/deserialization, and validation

For styling, we use TailwindCSS to provide responsive, theme-aware, and ergonomic style rules within our components.

## Backend

Our backend is broken up into the following groups:

- **Database Management:** Provides an interface over a Postgres database
- **XML Parser:** Parses SDC Form XML to our internal domain object classes
- **API Layer:** Express.js handlers for different routes documented by our OpenAPI spec
