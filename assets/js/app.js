// Initialize Firebase
var config = {
    apiKey: "AIzaSyD69cl6ih6kdaTTiRM12KaWnK61IK7Nhsk",
    authDomain: "rps-multiplayer-460d4.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-460d4.firebaseio.com",
    projectId: "rps-multiplayer-460d4",
    storageBucket: "rps-multiplayer-460d4.appspot.com",
    messagingSenderId: "577236004778"
  };
firebase.initializeApp(config);
  
var database = firebase.database();

// var connectionsRef = database.ref("/connections");
// var connectedRef = database.ref(".info/connected");

// connectedRef.on("value", function(snapshot) {

//     // If they are connected..
//     if (snapshot.val()) {
  
//       // Add user to the connections list.
//       var con = connectionsRef.push(true);
  
//       // Remove user from the connection list when they disconnect.
//       con.onDisconnect().remove();
//     }
// });
  
// // When first loaded or when the connections list changes...
// connectionsRef.on("value", function(snapshot) {
  
//     // Display the viewer count in the html.
//     // The number of online users is the number of children in the connections list.
//     $("#connected-viewers").text(snapshot.numChildren());
// });