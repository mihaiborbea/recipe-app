// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDv3qXHWQ71YzX1oNrL9FFOeW4OSMNpMH0',
    authDomain: 'foodilo.app',
    databaseURL:
      'https://recipe-app-8ac24-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'recipe-app-8ac24',
    storageBucket: 'recipe-app-8ac24.appspot.com',
    messagingSenderId: '602852224046',
    appId: '1:602852224046:web:bc19d50b5f93ad2e2443bf',
    measurementId: 'G-47PHTQPH72',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
