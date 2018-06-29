$(document).ready(function () {
    $("#add").click(function () {
        event.preventDefault();
        var tName = $("#tName").val();
        var dest = $("#dest").val();
        var startTime = $("#startTime").val();
        var freq = $("#freq").val();
        var firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % freq;
        var minAway = freq - tRemainder;

        var nextTrain = moment().add(minAway, "minutes");
        var next = moment(nextTrain).format("HH:mm")
        console.log(minAway)
        console.log(next)

        console.log("Hello");

        tName = $("#tName").val().trim();
        dest = $("#dest").val().trim();
        startTime = $("#startTime").val().trim();
        freq = $("#freq").val().trim();



        database.ref().push({
            tName: tName,
            dest: dest,
            startTime: startTime,
            freq: freq,
            trainTime: next,
            nextTrain: minAway
        });
    });
});
var config = {
    apiKey: "AIzaSyA6LZ6_hkI-vsE5DXRiVcKe89LXPGHOEBQ",
    authDomain: "train-tracker-63938.firebaseapp.com",
    databaseURL: "https://train-tracker-63938.firebaseio.com",
    projectId: "train-tracker-63938",
    storageBucket: "train-tracker-63938.appspot.com",
    messagingSenderId: "292879422217"
};
firebase.initializeApp(config);

var database = firebase.database();

//initial values
var tName = "";
var dest = "";
var startTime = "";
var freq = "";


database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    console.log(sv.minAway)
    $("table tbody").append("<tr><th>" + sv.tName + "</th><td>" + sv.dest + "</td><td>" + sv.freq + "</td><td>" + sv.trainTime + "</td><td>" + sv.nextTrain + "</td></tr>");


})



