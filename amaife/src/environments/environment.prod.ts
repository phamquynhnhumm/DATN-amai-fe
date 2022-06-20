// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {initializeApp} from "firebase/app";

export const environment = {
  production: true,
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: "AIzaSyCmnpehxDXFhtZFXpjF7sla3De9df1xOAQ",
    authDomain: "amai-d208b.firebaseapp.com",
    projectId: "amai-d208b",
    storageBucket: "amai-d208b.appspot.com",
    messagingSenderId: "854284928607",
    appId: "1:854284928607:web:87d2fcfbadb10038e07dea",
    measurementId: "G-0CBB48Z35X"
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
