# Maintenance of the code

## Commands

### Run the unit tests with Jest

**Run:** `npx baldrick-broth test jest`

See also:

-   [Jest is a JavaScript Testing Framework](https://jestjs.io/)

***

### Run unit tests declaratively

> Run unit tests for pure functions declaratively using YAML files

**Motivation:** Check that the units of code behave as intended

**Run:** `npx baldrick-broth test spec`

See also:

-   [Baldrick Zest run tests
    declaratively](https://github.com/flarebyte/baldrick-zest-engine)

***

### Run node.js unit tests

> Run traditional unit tests

**Motivation:** Test what is not easily covered with zest

**Run:** `npx baldrick-broth test unit`

See also:

-   [JavaScript tests that report results in TAP
    format](https://nodejs.org/dist/latest-v18.x/docs/api/test.html)

***

### Run acceptance tests for the CLI

> Run acceptance tests declaratively using YAML files

**Motivation:** Check that the CLI application behaves as intended

**Run:** `npx baldrick-broth test pest`

See also:

-   [Testing with
    baldrick-pest](https://github.com/flarebyte/baldrick-pest)

***

### Count lines of code

> Count lines of code

**Motivation:** Count lines of code

**Run:** `npx baldrick-broth test scc`

See also:

-   [Counting lines of code in many programming
    languages](https://github.com/boyter/scc)

***

### Run client directly

> Run the client with ts-node during development

**Motivation:** Simulate a CLI app in development without the need to install
it globally

**Run:** `npx baldrick-broth test cli`

***

### Transpile typescript

> Generate javascript from the typescript source code

**Motivation:** Javascript code is more portable and can be consumed by other
projects

**Run:** `npx baldrick-broth transpile ts`

See also:

-   [tsc compiles typescript defined by a
    tsconfig.json](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

***

### Upgrade to latest dependencies

> Upgrade to latest npm dependencies

**Motivation:** Keep up with security and improvements

**Run:** `npx baldrick-broth deps upgrade`

***

### Generate documentation

> Generate the markdown documentation for the typescript project

**Motivation:** Good documentation is essential for developer experience

**Run:** `npx baldrick-broth doc ts`

See also:

-   [TypeDoc converts comments in Typescript into a JSON
    model](https://typedoc.org/)

-   [baldrick-doc-ts produces markdown
    documentation](https://github.com/flarebyte/baldrick-doc-ts)

-   [baldrick-doc-ts produces markdown
    documentation](https://github.com/flarebyte/baldrick-doc-ts)
    
-   [Package development of Typescript library in ESM
    format](https://github.com/flarebyte/baldrick-dev-ts)

***

### Standardize the github repository

> Enable useful features for the github project repository

**Motivation:** Create consistent settings

**Run:** `npx baldrick-broth github standard`

***

### Static code analysis of Typescript code

> Find problems in Typescript code

**Motivation:** Make the code more consistent and avoid bugs

**Run:** `npx baldrick-broth lint check`

***

### Fix static code analysis

> Fix problems in Typescript code

**Motivation:** Facilitate routine maintenance of code

**Run:** `npx baldrick-broth lint fix`

***

### Check Markdown files

> Checks that the markdown documents follows some consistent guidelines

**Motivation:** Make the markdown documents consistent in style

**Run:** `npx baldrick-broth md check`

***

### Fix Markdown files

> Modify the markdown documents to ensure they follow some consistent
> guidelines

**Motivation:** Make the markdown documents consistent in style

**Run:** `npx baldrick-broth md fix`

***

### Ready for publishing

> Run a sequence of commands to check that the library is ready to be
> published

**Motivation:** Detect quality flaws before pushing the code

**Run:** `npx baldrick-broth release ready`

***

### Upgrade baldrick-broth configuration to latest version

> Gets the latest version of this configuration file

**Motivation:** Always apply the latest project conventions

**Run:** `npx baldrick-broth scaffold upgrade`

***

### Normalize the project

> Normalize the project in a similar fashion that the other typescript
> projects

**Motivation:** Make the project structure consistent and easier to navigate

**Run:** `npx baldrick-broth scaffold norm`

***

### Normalize the project

> Normalize the project in a similar fashion that the other typescript
> projects

**Motivation:** Make the project structure consistent and easier to navigate

**Run:** `npx baldrick-broth scaffold norm-package`

***
