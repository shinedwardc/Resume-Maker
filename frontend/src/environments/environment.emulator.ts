// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAChVM7XTXSGQjSR1yux51N802ZgL5npNQ',
    authDomain: 'resume-maker-20813.firebaseapp.com',
    // projectId: 'resume-maker-20813',
    projectId: 'demo-resume',
    storageBucket: 'resume-maker-20813.appspot.com',
    messagingSenderId: '486543884744',
    appId: '1:486543884744:web:8d53dceb64bc4a709c80fd',
  },
  firebaseEmulator: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
