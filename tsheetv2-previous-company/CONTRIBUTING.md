# Contributing

The goal of this document is to give a quick overview of coding guidelines and other standards being used in this project.

# General

## TypeScript

Every file that could be `.js` or `.jsx`, should be `.ts` or `.tsx` (with rare exceptions such as config files). In addition to performance benefits, we want to leverage TypeScript's [static typing](https://developer.mozilla.org/en-US/docs/Glossary/Static_typing) to ensure the variable types we've declared are strictly adhered to, preventing many errors that often occur with vanilla JavaScript.

Use of the `any` type is strongly discouraged, but as with anything there are exceptions. Every attempt should be made to explicitly type the variable, and **not** use `any` as this defeats the whole purpose of using TypeScript.

## Installing Packages

**Special attention should be paid when installing new packages**

If this a dependency that is needed in the ui workspace, you would install it with the `--workspace` option:

```bash
$ npm i vite --workspace=ui
```

If it is a dev dependency, it should be installed in the **root** package with the `--save-dev` flag:

```bash
$ npm i eslint --save-dev
```

**This means that only the root package.json will contain dev dependencies, and the workspaces will only contain dependencies needed for production**

Installing the packages in this manner is not a _technical_ requirement, but it should help simplify where packages should be installed.

When deciding to install the package as a dev dependency or not, keep in mind the following definitions:

> "dependencies": Packages required by your application in production.
>
> "devDependencies": Packages that are only needed for local development and testing.

## Testing

In general, we should strive for 100% code coverage. Not every line should necessarily be tested, but should be accounted for (conditionally skipped). Coverage should only be skipped when there is a valid reason to do so.

The test file should be placed adjacent to the file it's testing:

```
|-- reducers
    |-- example.ts
    |-- example.test.ts
```

**selector tests should modify some part of the state we are selecting. You only need to modify a single nested property for selectors that return an object**

# API

## Endpoint Creation

Each collection (projects, roles, timesheets, and users) will have it's own route file in the [routes](./packages/api/routes) directory. Within these route files, we should only be querying data from the collection it's named after. **The returned data should always be an object**.

### Passing Data

We will pass data from the ui to our api through [req.body](https://expressjs.com/en/api.html#req.body), [req.params](https://expressjs.com/en/api.html#req.params), and [req.query](https://expressjs.com/en/api.html#req.query). But how do we decide which of these is the most appropriate way to pass the data for our endpoint? See below.

#### Body

Use the request body to send data when doing a POST or PUT request. Technically it is possible to send data in the body for a GET request, but this should never be done, as it does not conform to traditional HTTP spec. If doing a PUT request, the id of the document you wish to update should be in the route params, with the updating data contained in the body.

#### Route Params

The route params are typically used to pass something like an id when doing a GET, PUT, or DELETE request. For example, if we wanted to get a timesheet by it's id, it would make more sense to use route params over query params:

✅ Correct:

```
GET /timesheets/:id
```

❌ Incorrect:

```
GET /timesheets?id=
```

#### Query Params

Query params should only be used during a GET request to specify the parameters we wish to search by. This method should be used when we (likely) have several parameters to search with that wouldn't make sense to do so with route params since the path would not follow the data model.

### Naming

In general, **the naming of a route should follow the model of whatever collection you are querying**.

#### Use Nouns

If we are following the respective model when naming a route path, each part should be a noun. Do not include verbs, as the intention of the endpoint could be derived from it's method:

✅ Correct:

```
GET /projects
```

❌ Incorrect:

```
GET /getProjects
```

#### Follow Hierarchical Order

If we want to get data for a specific property of a particular timesheet, the `id` of the timesheet should come _before_ the property. Indicating that the returned data belongs to that particular document:

✅ Correct:

```
GET /timesheets/:id/comments
```

❌ Incorrect:

```
GET /timesheets/comments/:id
```

#### Use Hyphens

If you need to use multiple words in your route path, separate them with a hyphen to improve readability.

## REST Client

For this project, we will be using a VS code extension called "Rest Client" to test our api routes. This extension allows us to make http requests to our api from VS Code to ensure that routes are working properly.

When creating a new route, YOU MUST CREATE a new file with the proper http requests for that route. Name the file after the route. If you are updating a route, YOU MUST UPDATE the http file with the requests for that route.

To start testing, you must install the VS Code extension "Rest Client" by Huachao Mao.

In addition to the docs, this tutorial may help...
https://www.youtube.com/watch?v=RcxvrhQKv8I

# UI

## Aliases

There are a few aliases used to help with importing modules that should be preferred over relative paths. See [tsconfig.json](./tsconfig.json) or [vite.config.ts](./packages/ui/vite.config.ts).

## Components/Pages

All components/pages should have their own capitalized directory containing:

- the tsx file (capitalized)
- it's own scss file (if applicable) with the same capitalized name and `.module.scss` extension
- An index.ts file to serve as the default import for the directory

```
|-- Button
    |-- Button.tsx
    |-- Button.module.scss
    |-- index.ts
```

### File Structure

The file structure of [components](./packages/ui/src/components/) should follow a parent/child relationship, with the child components nested within their respective parent. If the child component is also used outside the parent, it should be restructured to be a sibling of the parent instead.

```
|-- components
    |-- Tabnav
        |-- Tab
            |-- index.ts
            |-- Tab.module.scss
            |-- Tab.tsx
        |-- index.ts
        |-- Tabnav.module.scss
        |-- Tabnav.tsx
```

The file structure of [pages](./packages/ui/src/pages/) should mirror that of the respective url. In the below, [SelectWeek](./packages/ui/src/pages/Timesheet/SelectWeek/) is nested within [Timesheet](./packages/ui/src/pages/Timesheet/) to reflect `/timesheet/select-week`.

```
|-- pages
    |-- Timesheet
        |-- SelectWeek
            |-- index.ts
            |-- SelectWeek.module.scss
            |-- SelectWeek.tsx
        |-- index.ts
        |-- Timesheet.module.scss
        |-- Timesheet.tsx
```

# Pull Requests

Please ensure you are always working off a ticket in Jira. Even if the change is small, create a ticket in Jira and name the branch after the ticket.

This project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary). Please adhere to our [git guidelines](https://sites.google.com/t1cg.com/home/internal/git-guideline) in regards to making a valid commit. The are [tools](https://github.com/conventional-changelog/commitlint) in place to enforce this, but you should be familiar with the guidelines nonetheless.
