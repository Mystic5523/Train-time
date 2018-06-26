var nextTrain;
var minAway;
console.log("Hello");

$(document).ready(function () {
    $("#add").click(function () {
        event.preventDefault();
        var tName = $("#tName").val();
        var dest = $("#dest").val();
        var startTime = $("#startTime").val();
        var freq = $("#freq").val();
        var markup = "<tr><th>" + tName + "</th><td>" + dest + "</td><td>" + freq + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>";
        $("table tbody").append(markup);
        console.log(tName, dest, startTime, freq)
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

$("#add").on("click", function (event) {
    event.preventDefault();

    tName = $("#tName").val().trim();
    dest = $("#dest").val().trim();
    startTime = $("#startTime").val().trim();
    freq = $("#freq").val().trim();

    database.ref().push({
        tName: tName,
        dest: dest,
        startTime: startTime,
        freq: freq
    });
});
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    console.log(sv.tName);
    console.log(sv.dest);
    console.log(sv.startTime);
    console.log(sv.freq);
    var nextTrain = moment().diff(moment(sv.startTime), 'months');
    $("table tbody").append("<tr><th>" + sv.tName + "</th><td>" + sv.dest + "</td><td>" + sv.startTime + "</td><td>" + nextTrain + "</td><td>" + sv.freq + "</td></tr>");


})



