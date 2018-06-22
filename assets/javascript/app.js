var monthsWorked;
var totalBilled;
var placeHolder;
var timeHolder;
console.log("Hello");

$(document).ready(function () {
    $("#add").click(function () {
        var name = $("#name").val();
        var role = $("#role").val();
        var startDate = $("#startDate").val();
        var monthlyRate = $("#monthlyRate").val();
        // var markup = "<tr><th>" + name + "</th><td>" + role +  "</td><td>" + startDate + "</td><td>" + monthsWorked + "</td><td>" + monthlyRate + "</td><td>" + totalBilled + "</td></tr>";
        $("table tbody").append(markup);
    });
});
var config = {
    apiKey: "AIzaSyA6LZ6_hkI-vsE5DXRiVcKe89LXPGHOEBQ",
    authDomain: "train-tracker-63938.firebaseapp.com",
    databaseURL: "https://train-tracker-63938.firebaseio.com",
    projectId: "train-tracker-63938",
    storageBucket: "",
    messagingSenderId: "292879422217"
};
firebase.initializeApp(config);

var database = firebase.database();

//initial values
var uName = "";
var uRole = "";
var uSDate = "";
var uMRate = "";

$("#add").on("click", function (event) {
    event.preventDefault();

    uName = $("#name").val().trim();
    uRole = $("#role").val().trim();
    uSDate = $("#startDate").val().trim();
    uMRate = $("#monthlyRate").val().trim();

    database.ref().push({
        uName: uName,
        uRole: uRole,
        uSDate: uSDate,
        uMRate: uMRate
    });
});
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    console.log(sv.uName);
    console.log(sv.uRole);
    console.log(sv.uSDate);
    console.log(sv.uMRate);
    var monthsWorked = moment().diff(moment(sv.uSDate), 'months');
    var totalBilled = monthsWorked * sv.uMRate;
    $("table tbody").append("<tr><th>" + sv.uName + "</th><td>" + sv.uRole + "</td><td>" + sv.uSDate + "</td><td>" + monthsWorked + "</td><td>" + sv.uMRate + "</td><td>" + totalBilled + "</td></tr>");


})



