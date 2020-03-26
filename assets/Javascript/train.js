$(document).ready(function() {
    console.log("hello")


    // firebase database information to connect
    var firebaseConfig = {
        apiKey: "AIzaSyAiMtHScs5e63vFwhE9iBilWRdJhst8RsA",
        authDomain: "train-scheduler-d5596.firebaseapp.com",
        databaseURL: "https://train-scheduler-d5596.firebaseio.com",
        projectId: "train-scheduler-d5596",
        spId: "1:368950325483:web:cb69cc9cc9ef178422ceae",
        measurementId: "G-QY0K2CPEJ5"
      };
      // Initialize Firebase
      firebase.initializeApp(firebastorageBucket: "train-scheduler-d5596.appspot.com",
        messagingSenderId: "368950325483",
        apeConfig);
    
        // variable to reference the firebase database.
    var database = firebase.database();

    //   variables for the onClick event, the on click is adding the train.
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

    $("#add-train").on("click" , function() {
        event.preventDefault();
        // storing and retreiving new train data
        name = $("#train-name").val().trim()
        destination = $("#destination-name").val().trim()
        firstTrain = $("#first-train").val().trim()
        frequency = $("#frequency").val().trim()

    })




})






var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
connectedRef.on("value" , function(snap) {
    if (snap.val()) {
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
    }
});

connectionsRef.on("value" , function(snapshot) {
    $("").text(snapshot.numChildren());
})

// connect firebase database
// create places for users to type to get information
// grab train data from database
// create a place to store the data from database
