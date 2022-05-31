// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {initializeApp} from "firebase/app";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyA_3tcnZrLeqki7UL74hHgmDcmEqI5G6z4",
    authDomain: "amai-8cd08.firebaseapp.com",
    projectId: "amai-8cd08",
    storageBucket: "amai-8cd08.appspot.com",
    messagingSenderId: "930577392090",
    appId: "1:930577392090:web:b22db0a71ecdd4196820e3",
    measurementId: "G-TVG9FBNC98"
  }
};
const app = initializeApp(environment.firebaseConfig);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
