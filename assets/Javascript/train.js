// starts off the document with a ready function keeps some information in th eparent contex.
$(document).ready(function () {
    console.log("hello")


    // firebase database information to connect
    var firebaseConfig = {
        apiKey: "AIzaSyAiMtHScs5e63vFwhE9iBilWRdJhst8RsA",
        authDomain: "train-scheduler-d5596.firebaseapp.com",
        databaseURL: "https://train-scheduler-d5596.firebaseio.com",
        projectId: "train-scheduler-d5596",
        storageBucket: "train-scheduler-d5596.appspot.com",
        messagingSenderId: "368950325483",
        appId: "1:368950325483:web:cb69cc9cc9ef178422ceae",
        measurementId: "G-QY0K2CPEJ5"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // variable to reference the firebase database.
    var database = firebase.database();


    //   variables for the onClick event, the on click is adding the train.
    var name = "";
    var destination = "";
    var firstTrain = "";
    var frequency = 0;




    // this is the button function to add new trains
    $("#add-train").on("click", function () {
        event.preventDefault();
        //retreiving new train data from text boxes
        name = $("#train-name-input").val().trim();
        destination = $("#destination-name-input").val().trim();
        firstTrain = $("#first-train-input").val().trim().
        frequency = $("#frequency-input").val().trim().

        // below is pushing to database

        // code for setting values in the database
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dataAdded: firebase.database.ServerValue.TIMESTAMP
        });
        // clears out the input of new trains
        $("form")[0].reset();

    });

    // firebase watcher
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrain);
        console.log(childSnapshot.val().frequency);

        // var tFrequency = 17;
        // var firstTime = "3:00"
        
        var minAway= 0;

        var firstNewTrain = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        console.log(firstNewTrain);

        // this is the current time
        var currentTime = moment();
        console.log("14:45 " + moment(currentTime).format("hh:mm"));

        // diff between the times

        var diffTime = moment().diff(moment(firstNewTrain), "minutes");
        console.log("Difference in time:" + diffTime);

        // time apart, this is the remainder

        var tRemainder = diffTime % childSnapshot.val().frequency;
        console.log(tRemainder);

        // minute until the train comes

        var minAway = childSnapshot.val().frequency - tRemainder;
        console.log("Minutes till trian: " + minAway);

        // train that is coming next

        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");
        console.log("arrival time: " + moment(nextTrain).format("hh:mm"));

        $("#add-row").append("<tr><td>" + childSnapshot.val().name +
            " </td><td> " + childSnapshot.val().destination +
            " </td><td> " + childSnapshot.val().frequency +
            " </td><td>" + nextTrain +
            " </td><td>" + minAway +
            " </td></tr>");

            

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

   




    

})
