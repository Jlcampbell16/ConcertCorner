// Initialize Firebase

var config = {
  apiKey: "AIzaSyBilv09OSIQXQA5FjDXRAYWgyK59DPoDA4",
  authDomain: "teamapi.firebaseapp.com",
  databaseURL: "https://teamapi.firebaseio.com",
  projectId: "teamapi",
  storageBucket: "teamapi.appspot.com",
  messagingSenderId: "880408127269"
};

firebase.initializeApp(config);

        // FirebaseUI config.

        var uiConfig = {
            signInSuccessUrl: 'concertcorner.html',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
            ]
        };

         // Initialize the FirebaseUI Widget using Firebase. 
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
