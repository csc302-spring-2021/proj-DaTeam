# Testing

> Describe the approach you intend to take for testing your implementation.

To verify the correctness of our code and to verify that there are no regressions in behaviour, we wrote unit tests for both our frontend and backend.

## Frontend

For our frontend we used Jest + React Testing Library (set up with Create React App) to write component unit tests. We plan on writing integration tests of pages and user interactions in the future.

## Backend

For our backend, we used Jest + Supertest to test each of our API endpoints. For endpoints that are not implemented yet, we wrote out stubs that are currently skipped.
