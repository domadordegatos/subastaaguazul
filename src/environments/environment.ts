// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    projectId: 'login-firebase-16',
    appId: '1:494345858912:web:811cbaa3ccb1f7ba64f805',
    storageBucket: 'login-firebase-16.appspot.com',
    apiKey: 'AIzaSyDEZVIEoCv3HwVo4wjHIAWB8uvnEXSRBBg',
    authDomain: 'login-firebase-16.firebaseapp.com',
    messagingSenderId: '494345858912',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.