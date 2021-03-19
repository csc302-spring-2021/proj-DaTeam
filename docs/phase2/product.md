# Technical Product Report

> ## Rubric:
>
> - Clearly describes what was built.
> - Uses meaningful artifacts (e.g. diagrams, links to source-code and/or pull-requests, etc.)
> - Documents specific progress towards your goal.
> - High-quality technical documentation
> - Describes strengths and weaknesses of your process in an insightful way
> - Referring to specific meeting minutes or other process artifacts.
> - Makes realistic plan for final work towards demo

## Proposed Features

For Phase 2, we plan on implementing the following use-cases:

### Create Response

> As a form filler, I want to be able to create a new response for an SDCForm for a particular patient with default values filled in

![New Response](https://user-images.githubusercontent.com/8302959/109045985-3c194280-76a2-11eb-8371-30611ae49a16.png)

### Create New Form

> As a form manager, I want to be able to add a new SDCForm to the system and associate it with a DiagnosticProcedureID so that form fillers can use the new form to collect data for that procedure

![Structure](https://user-images.githubusercontent.com/8302959/109045932-2c016300-76a2-11eb-9ba1-4c8ed6e94bd7.png)

## What We Actually Built

- **TODO:** What did you actually build during this phase?
  - How is this different from what you originally proposed? Why?

## High-level design

> High-level design of your software.

- App is sliced up into two parts:
  - Frontend
  - Backend
- Frontend communicates with backend via REST API (as defined in [OpenAPI spec](../../backend/openapi.yml)) on different endpoints and JSON payloads
- Frontend and backend deserialize content from JSON to our own data model classes defined in a shared library
- We have a database mapping layer that translates a given data model instance into the relevant SQL queries needed for CRUD operations
- On the frontend, we divided the app into different routes using React Router and built pages that compose React components to fetch and display data
- On the backend, we divided into services on domain areas:
  - Forms
  - Responses
  - Patients
  - etc.
- In each domain area, we created separate controllers and routes to separate logic for easier unit testing
- In development, we use Docker compose to spin up the frontend, backend, and database as separate containers on the same network
- In production, we deploy the frontend and backend separately as Apps on Heroku due to a limititation of Heroku, they communicate with eachother via HTTP

INSERT INFRASTRUCTURE DIAGRAM HERE

## Technical Highlights

> Technical highlights: interesting bugs, challenges, lessons learned, observations, etc.

- **Solution:** Custom ORM for mapping domain models (represented as JavaScript objects) to SQL queries
- **Observation:** database interaction in tests is hard to work with, [we discussed a couple different approaches](https://github.com/csc302-spring-2021/proj-DaTeam/pull/99#issuecomment-785388981), and settled on mocking out database access layer for unit tests and maybe writing a small number of full-scale End-to-end tests that spin up the full app, including a real database
- **Interesting Bugs:** Some of our serialization logic depends on [reflection](https://en.wikipedia.org/wiki/Reflective_programming) of JS classes to extract constructor types. This lead to an interesting problem when we integrated this serialization code into our frontend app. When developing locally, we had no issues, but when we built our React app for production, we were seeing errors with this part of the code. After a couple minutes of debugging the minified code (not a fun way to debug!), we found out that the cause of the bug was that in production, our tooling was running a minification and obfuscation step that was changing constructor names to make them terser. This was good for performance as it resulted in a smaller bundle size being sent over the network, but it was breaking one of the invariants that we assumed when writing the serialization logic. We investigated some solutions and found two options that were reasonable:

  1. Disable minification - this is the easiest fix, but has the side-effect of increasing bundle size
  2. Replace/reconfigure the built-in minification to avoid stripping class constructor names - this is the better solution, but requires investigation into the settings of Webpack (the bundler used by our build tool)

We decided that, in the interests of time and considering that the project size is small, we would go with the first option that would allow us to quickly get unblocked. We filed an issue for this problem, so that if we have time at the end of the project, we can come back to it and re-enable minification for better network performance

- Lesson Learned: We initially had a single issue for the parser implementation but this was too big a task for one person, so we decided to split the task up into smaller sub-parser tasks that multiple developers could work on concurrently

## Reflection

- **TODO:** Reflect on your teamwork and process. What worked well, what needs improvement.
  - Ideally you will have specific artifacts from your development process to show (for instance, a burndown chart)

## Next Phase

> Triage: What will you build for phase 3, the final demo?

- Patients management
- Filtering and searching for forms and responses
- Delete forms and responses
- Share URL for form response
