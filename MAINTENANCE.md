# Maintenance of the code

## Overall workflow

The typical developer workflow goes as follow:

| Mode                   | Code analysis | Testing                    | Building     | Publishing                        |
| ---------------------- | ------------- | -------------------------- | ------------ | --------------------------------- |
| Checking               | yarn lint     | yarn test or yarn test:cov | yarn build   | yarn ready and yarn release:check |
| Fixing                 | yarn lint:fix | yarn test:fix              | Fix the code | Update dependencies and yarn doc  |
| Continuous integration | yarn lint:ci  | yarn test:ci               | yarn build   | bpub                              |

## Commands

### Run GitHub Actions locally

> Run GitHub Actions inside a docker container

__Motivation:__ Test GitHub Actions locally

__When to use it:__ When changing github actions

__Run:__ ```act```

__From package:__ [act](https://github.com/nektos/act) of [brew](https://docs.brew.sh/) :  Run GitHub Actions locally

---

### Build the library

> Transpile all the typescript source code to javascript

__Motivation:__ ESM library should be written in javascript

__When to use it:__ Before building

__Run:__ ```yarn build```

__From package:__ [yarn](https://classic.yarnpkg.com/en/) of [npm](https://www.npmjs.com/) :  Dependency management

---

### Generate the documentation

> Generate the markdown documentation for the typescript project

__Motivation:__ Good documentation is essential for developer experience

__When to use it:__ Before publishing

__Run:__ ```yarn doc```

__From package:__ [yarn](https://classic.yarnpkg.com/en/) of [npm](https://www.npmjs.com/) :  Dependency management

---

### Update github repository

> Enable useful features for the github project repository

__Motivation:__ Create consistent settings

__When to use it:__ After creating

__Run:__ ```yarn github```

__From package:__ [gh](https://cli.github.com/) of [brew](https://docs.brew.sh/) :  GitHub CLI brings GitHub to your terminal

---

### Static code analysis for continuous integration

> Find problems in Typescript code

__Motivation:__ Make the code more consistent and avoid bugs

__When to use it:__ When pushing code to github, before testing

__Run:__ ```yarn lint:ci```

__From package:__ [baldrick](https://github.com/flarebyte/baldrick-dev-ts) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

---

### Static code analysis

> Find problems in Typescript code

__Motivation:__ Make the code more consistent and avoid bugs

__When to use it:__ Before compilation

__Run:__ ```yarn lint```

__From package:__ [baldrick](https://github.com/flarebyte/baldrick-dev-ts) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

---

### Fix static code analysis

> Fix problems in Typescript code

__Motivation:__ Facilitate routine maintenance of code

__When to use it:__ Before compilation

__Run:__ ```yarn lint:fix```

__From package:__ [baldrick](https://github.com/flarebyte/baldrick-dev-ts) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

---

### Markdown check

> Checks that the markdown documents follows some consistent guidelines

__Motivation:__ Make the markdown documents consistent in style

__When to use it:__ Before publishing

__Run:__ ```yarn md```

__From package:__ [yarn](https://classic.yarnpkg.com/en/) of [npm](https://www.npmjs.com/) :  Dependency management

---

### Markdown fix

> Modify the markdown documents to ensure they follow some consistent guidelines

__Motivation:__ Make the markdown documents consistent in style

__When to use it:__ Before publishing

__Run:__ ```yarn md:fix```

__From package:__ [yarn](https://classic.yarnpkg.com/en/) of [npm](https://www.npmjs.com/) :  Dependency management

---

### Clear previous build

> Delete the dist and report folder

__Motivation:__ Start from a clean slate

__When to use it:__ Before building

__Run:__ ```yarn prebuild```

__From package:__ [yarn](https://classic.yarnpkg.com/en/) of [npm](https://www.npmjs.com/) :  Dependency management

---

### Ready for publishing

> Run a sequence of commands to check that the library is ready to be published

__Motivation:__ Detect quality flaws before pushing the code

__When to use it:__ Before pushing a branch

__Run:__ ```yarn ready```

__From package:__ [yarn](https://classic.yarnpkg.com/en/) of [npm](https://www.npmjs.com/) :  Dependency management

---

### Reset distribution and report folders

> Delete the dist and report folder

__Motivation:__ Start from a clean slate

__When to use it:__ Before building

__Run:__ ```yarn reset```

__From package:__ [yarn](https://classic.yarnpkg.com/en/) of [npm](https://www.npmjs.com/) :  Dependency management

---

### Unit testing code and coverage for continuous integration

> Test and verify the coverage of the code

__Motivation:__ Check that the units of code behave as intended and ensure that every code branch and function is executed 

__When to use it:__ When pushing code to github

__Run:__ ```yarn test:ci```

__From package:__ [baldrick](https://github.com/flarebyte/baldrick-dev-ts) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

---

### Unit testing

> Run the unit tests

__Motivation:__ Check that the units of code behave as intended

__When to use it:__ After compilation, before build

__Run:__ ```yarn test```

__From package:__ [baldrick](https://github.com/flarebyte/baldrick-dev-ts) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

---

### Unit testing code coverage

> Verify the extent to which the code has been executed. This does not include any threshold, but it is recommended to maximize the coverage

__Motivation:__ Ensure that every code branch and function is executed 

__When to use it:__ After compilation, before build

__Run:__ ```yarn test:cov```

__From package:__ [baldrick](https://github.com/flarebyte/baldrick-dev-ts) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

---

### Fix unit testing snapshots

> Run the unit tests and update the snapshots

__Motivation:__ Facilitate routine maintenance of unit test snapshots

__When to use it:__ After compilation, before build

__Run:__ ```yarn test:fix```

__From package:__ [baldrick](https://github.com/flarebyte/baldrick-dev-ts) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

---

### Release check

> Checks if a release could be created

__Motivation:__ Avoid failing the release

__When to use it:__ After publishing

__Run:__ ```yarn release:check```

__From package:__ [baldrick](https://github.com/flarebyte/baldrick-dev-ts) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

---

### Release

> Creates a github release

__Motivation:__ Save releases in github

__When to use it:__ After publishing

__Run:__ ```bpub```

__From package:__ [baldrick](https://github.com/flarebyte/baldrick-dev-ts) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

---

### Help for commands

> Summarize all the yarn and shell commands

__Motivation:__ Assist the developer in quickly finding commands

__When to use it:__ Before running a command

__Run:__ ```yarn h```

__From package:__ [baldrick](https://github.com/flarebyte/baldrick-dev-ts) of [npm](https://www.npmjs.com/) :  Zero-config CLI for TypeScript package development

---

### Git commit from file

> Git commit a message that has been saved in the .message file

__Motivation:__ Quicker commit for pre-defined use cases

__When to use it:__ When commit to github

__Run:__ ```gcf```

__From package:__ [zsh](https://www.zsh.org/) of [brew](https://docs.brew.sh/) :  Shell designed for interactive use

---

### Install the local project globally

> Install this local project/script globally on the dev machine for development or testing purpose

__Motivation:__ Test global project locally before publishing

__When to use it:__ When testing locally

__Run:__ ```yig```

__From package:__ [yarn](https://classic.yarnpkg.com/en/) of [npm](https://www.npmjs.com/) :  Dependency management

---

### Normalize the code structure using latest

> Normalize the code structure using baldrick (npx version)

__Motivation:__ Create a consistent developer experience

__When to use it:__ When changing github actions

__Run:__ ```yarn norm```

__From package:__ [baldrick-ts](https://github.com/flarebyte/baldrick-ts) of [npm](https://www.npmjs.com/) :  Typescript scaffolding assistant

---

### Normalize the code structure

> Normalize the code structure using baldrick (global version)

__Motivation:__ Create a consistent developer experience

__When to use it:__ When changing github actions

__Run:__ ```yarn norm:g```

__From package:__ [baldrick-ts](https://github.com/flarebyte/baldrick-ts) of [npm](https://www.npmjs.com/) :  Typescript scaffolding assistant

---

### Run client directly

> Run the client with ts-node during development

__Motivation:__ Simulate a CLI app in development without the need to install it globally

__When to use it:__ After compilation

__Run:__ ```yarn cli```

__From package:__ [yarn](https://classic.yarnpkg.com/en/) of [npm](https://www.npmjs.com/) :  Dependency management

---