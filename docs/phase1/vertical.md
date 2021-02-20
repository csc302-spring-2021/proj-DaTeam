# Vertical Slice

> Describe your vertical slice

For our P1 Vertical Slice, we will be tackling the following use-cases:

1. As a form filler, I want to be able to create a new response for an SDCForm for a particular patient with default values filled in
2. As a form manager, I want to be able to add a new SDCForm to the system and associate it with a DiagnosticProcedureID so that form fillers can use the new form to collect data for that procedure

## Feature 1: Create a new response

The first feature will require us to implement a basic form renderer on the frontend that takes a form object, as returned from the backend API, and render form inputs and sections with the correct labels and metadata.

![Layout](https://user-images.githubusercontent.com/8302959/108566998-5be0ed00-72d5-11eb-8749-1e8ef6f74b63.png)

We'll also set up the app layout as part of this vertical slice, so that we have a solid foundation to build off of for the rest of the project.

## Feature 2: XML upload

For the second feature, we'll be building two components:

- XML parser endpoint: takes a sample SDC XML file and returns the parsed form JSON
- Form creation endpoint: creates a new form using the provided form JSON

**We will NOT be guaranteeing an implementation for the XML parsing logic for the vertical slice.** If we have time we will implement part of it, but most likely we will follow the advice from the P1 Handout and return mock data from the associated endpoint.

## Scaffolding

In addition, to the above two features, we will also be spending much of our time in P1 setting up the deployment and testing infrastructure for our project, as well as creating stub endpoints for the ones documented in our [openapi.yml](../../backend/openapi.yml) file.
