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

var playerOne;
var playerTwo;
var currentPlayer;
var playerOneName;
var playerTwoName;
var playerOneWins;
var playerOneLosses;
var playerTwoWins;
var playerTwoLosses;
var ties;

//<--- tracks how many browsers are open/how many people are watching --->
connectedRef.on("value", function(snapshot) {
    if (snapshot.val()) {
        con = connectionsRef.push(true);
        con.onDisconnect().remove();
    }
});
//Prints number of people watching 
connectionsRef.on("value", function(snapshot) {
    $(".people-watching").text(snapshot.numChildren());
});

//Resets game
function resetGame() {
    playerOne = '';
    playerTwo = '';
    currentPlayer = '';
    $(".player-one-name").show();
    $(".player-one-button").text("Join Game");
    $(".player-one-button").prop("disabled", false);
    $(".player-two-name").show();
    $(".player-two-button").text("Join Game");
    $(".player-two-name").prop("disabled", true);
    $(".chat-room").empty();
    playerOneName = '';
    playerTwoName = '';
    playerOneWins = 0;
    playerOneLosses = 0;
    playerTwoWins = 0;
    playerTwoLosses = 0;
    ties = 0;
}
resetGame();

//Upon player 1 button click, player 1 joins the game
$(".player-one-button").on("click", function() {
    playerOneName = $(".player-one-name").val().trim();
    $(".player-one h1").text(playerOneName);
    $(".player-one-name").hide();
    $(".player-one-button").text("Player 1 has joined the game");
    $(".player-one-button").prop("disabled", true);
    $(".player-two-name").prop("disabled", false);
    $(".player-two-button").prop("disabled", false);

    connectedRef.on("value", function(snapshot) {

        if (snapshot.val()) {
      
            var p1 = connectionsRef.push({
                name: playerOneName,
                wins: playerOneWins,
                losses: playerOneLosses,
                ties: ties,
                player: "Player 1"
            });
            playerOne = p1.path.o[1]; //<--- gives player path in firebase

            currentPlayer = playerOne;

            p1.onDisconnect().remove();
        }
    
    });
});


//Upon player 2 button click, player 2 joins the game
$(".player-two-button").on("click", function() {
    playerTwoName = $(".player-two-name").val().trim();
    $(".player-two h1").text(playerTwoName);
    $(".player-two-name").hide();
    $(".player-two-button").text("Player 2 has joined the game");
    $(".player-two-button").prop("disabled", true);

    connectedRef.on("value", function(snapshot) {

        if (snapshot.val()) {
      
            var p2 = connectionsRef.push({
                name: playerTwoName,
                wins: playerTwoWins,
                losses: playerTwoLosses,
                ties: ties,
                player: "Player 2"
            });
            playerTwo = p2.path.o[1];

            currentPlayer = playerTwo;

            p2.onDisconnect().remove();
        }
    
    });
});

$(".chat-button").on("click", function() {
    var message = $(".chat-input").val();
        if (currentPlayer === playerOne) {
            $(".chat-room").append('<li class="list-group-item text-left" style="background-color: #8aff7f;">' + message + '</li>').fadeIn(8000);
        } else if (currentPlayer === playerTwo) {
            $(".chat-room").append('<li class="list-group-item text-right" style="background-color: #7fa8ff;">' + message + '</li>').fadeIn(8000);
        } 
    $(".chat-input").val(null);    
});
    

