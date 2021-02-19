# Scope

> Triage the use cases to identify an area of focus for your team.

## Learning Goals

At the beginning of the project, we came up with the following learning goals to help guide our focus on the project:

- Learn how to approach translating complex business requirements to something reasonable to implement
- Learn how to build a REST API with a good developer experience
- Try using Typescript for both frontend and backend to see how it improves/worsens code re-use and productivity
- Learn how to set up CI/CD processes using GitHub Actions and Heroku

## Use Cases

In this section we list out the use-cases prioritized by: Must Have, Nice to Have, and which ones are out of scope and which we will not be completing (assuming current timeline).

### Must Have

1. As a form filler, I want to be able to create a new response for an SDCForm for a particular patient with default values filled in
2. As a form manager, I want to be able to add a new SDCForm to the system and associate it with a DiagnosticProcedureID so that form fillers can use the new form to collect data for that procedure
3. As a form filler, I want to generate a unique, persistent URL to the form response so that I can share the link with others
4. As a form receiver, I want to be able to view a persistent page with a form response so that I can review the results to make a prognosis
5. As a form filler, I want to be able to update the response for a particular question in an SDCForm so that I can populate a patient’s data

### Nice to Have

1. As a form filler, I want to be able to search for an SDCForm by DiagnosticProcedureID so that I can find the one I’m looking for
2. As a form filler, I want to be able to search for a form response by patient or a DiagnosticProcedureID so that I can review or continue updating the response
3. As a form filler, I want to be able to delete a form response so that I can remove an incorrect/duplicate record
4. As a form manager, I want to be able to delete an SDCForm so that form fillers stop using it
5. As a form filler, I want to be able to email a unique, persistent URL to a form response to a form receiver
6. As a form manager, I want to be able to replace an SDCForm by re-uploading XML so that form fillers have the latest version

### Out of Scope

1. As a form receiver, I want to be able to search for response based on different criteria (ex. Number of patients with LungRADS Category 4A, List of SDCFormResponses for LungRADS Category 4A for female patients older than 65, etc)
