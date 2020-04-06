// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
   
    apiKey: "AIzaSyDL3eGlqWDG6IY49P8LuLS8YsU2WUh3PuE",
    authDomain: "tasklist-3a4e6.firebaseapp.com",
    databaseURL: "https://tasklist-3a4e6.firebaseio.com",
    projectId: "tasklist-3a4e6",
    storageBucket: "",
    messagingSenderId: "549144425266",
    appId: "1:549144425266:web:68a082bb16bdcc89d49d2b",
    measurementId: "G-EVT1KX5DFD"
  },
  signalRHuburl:'http://task1.4thminds.com/signalr',
  apiBaseUrl:'http://task1.4thminds.com/'
};
