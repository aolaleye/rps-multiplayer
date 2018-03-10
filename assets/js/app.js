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

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

var playerOneName = '';
var playerTwoName = '';
var playerOneWins = 0;
var playerOneLosses = 0;
var playerTwoWins = 0;
var playerTwoLosses = 0;

//<--- tracks how many browsers are open/how many people are watching --->
connectedRef.on("value", function(snapshot) {

    if (snapshot.val()) {
  
      var con = connectionsRef.push(true);
  
      con.onDisconnect().remove();
    }
});
  
connectionsRef.on("value", function(snapshot) {
  
    $(".people-watching").text(snapshot.numChildren());
});


function resetGame() {
    $(".player-one-name").show();
    $(".player-one-button").text("Join Game");
    $(".player-one-button").prop("disabled", false);
    $(".player-two-name").show();
    $(".player-two-button").text("Join Game");
    $(".player-two-name").prop("disabled", true);
    playerOneName = '';
    playerTwoName = '';
    playerOneWins = 0;
    playerOneLosses = 0;
    playerTwoWins = 0;
    playerTwoLosses = 0;
}
resetGame();

$(".player-one-button").on("click", function() {
    playerOneName = $(".player-one-name").val();
    $(".player-one h1").text(playerOneName);
    $(".player-one-name").hide();
    $(".player-one-button").text("Player 1 has joined the game");
    $(".player-one-button").prop("disabled", true);
    $(".player-two-name").prop("disabled", false);
    $(".player-two-button").prop("disabled", false);
});

$(".player-two-button").on("click", function() {
    playerTwoName = $(".player-two-name").val();
    $(".player-two h1").text(playerTwoName);
    $(".player-two-name").hide();
    $(".player-two-button").text("Player 2 has joined the game");
    $(".player-two-button").prop("disabled", true);
});