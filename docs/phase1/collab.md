# Collaboration

> Establish how your team is going to work together. How you will manage your sources. How you will contribute to your sources. When you will meet, how you will communicate, who will scribe, how you will maintain your backlog, etc.

## Meetings

We have two meetings every week:

- Tuesday @ 7PM EST: Touchbase and status report with Prof. Zaleski during tutorial
- Friday @ 6-7PM EST: Team meeting to discuss current tasks, planning for next week, and any blockers

During our Friday meetings, Umar keeps track of meeting notes in a Google doc and any action items are assigned to individuals and/or he creates relevant issues on GitHub and adds them to our backlog.

## Communication

Besides weekly meetings, we also heavily make use of Discord for team member communication. We have a Discord server with channels about different topics, like: frontend, backend, devops, artifacts (where we keep important links), etc. Discord messages provide a more immediate communication medium and are often used for debugging and discussions. We also use voice channels to run our meetings, as well as a dedicated `git-log` channel that receives webhooks from GitHub about any activity on the repo.

![image](https://user-images.githubusercontent.com/8302959/108604379-9b621480-737b-11eb-98aa-534aad728cda.png)

## Source Code

To manage our source code, we are using GitHub and require the use of Pull Requests to integrate code. We require at least one approving review on a PR for it to be merged. We decided early on to have a couple integration branches: `dev`, `frontend`, `backend`. The former being the main integration branch, and the latter two being separate integration branches with no branch protection. The reason for this is that we wanted to allow for rapid iterationm on the frontend and backend teams respectively, at the beginning of the project since there are many changes that need to be made.

We plan on deprecating the `frontend` and `backend` branches after P1 since our codebase will have stabilized at that point, and we can move forward with short-lived feature branches off of `dev`.

## Backlog Management

Umar manages the backlog with the help of team members to add relevant details to issues on GitHub. Sometimes there are tasks that are duplicated or no longer relevant, and it is the Product Manager's job to find these issues and syndicate them.

To keep us organized and on-schedule, we also created a system of issue tags and milestones on GitHub. The tags subdivide the issues by their area (ex. frontend, backend, devops, etc.) and the milestones are based on the due dates of phases in the project.

As tasks are ready to get started, devs move them through the various stages in our Kanban board. PRs are linked to GitHub issues and marked for review by the author, and it's the job of the reviewer to review the code, follow the QA steps (as outlined in the PR description), and hopefully approve the code changes to have them integrated.

![image](https://user-images.githubusercontent.com/8302959/108604287-ffd0a400-737a-11eb-9238-a0a3d4cf529c.png)
