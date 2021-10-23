# RecipeApp ![main workflow](https://github.com/mihaiborbea/recipe-app/actions/workflows/firebase-hosting-merge.yml/badge.svg)

<img alt="foodilo-logo" src="https://github.com/mihaiborbea/recipe-app/blob/main/src/assets/logo/brand-logo.png" width="200" height="200" />
A simple web app to store cooking recipes and to manage a shopping list.

## Features:

- Auth: Sign up and Sign in user accounts
- Recipes: Create/Update/Delete cooking recipes
- Shopping list: Add/Update/Remove ingredients to shopping list (manually or via recipes)
- UI: Fully responsive, Dark Theme support

## Tech Stack

- Angular front-end
- Firebase back-end (Firebase Auth and Firestore)
- Material UI (Angular Material)
- NgRx (Redux) state-management

## Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Firebase

Firebase SDK was used through [AngularFire](https://github.com/angular/angularfire) library.

In order to configure this project to work with firebase, all you need to do is to provide a Firebase config object inside environment.ts file (/src/environments/). To get the config based on _your_ Firebase account, check this [page](https://support.google.com/firebase/answer/7015592?hl=en#web).
