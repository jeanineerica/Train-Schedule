// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBwSxyfMuk6nMVpBZOvJWYKbwGuPwvmZIE",
    authDomain: "train-schedule-23017.firebaseapp.com",
    databaseURL: "https://train-schedule-23017.firebaseio.com",
    projectId: "train-schedule-23017",
    storageBucket: "",
    messagingSenderId: "478120228115"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();

//On click add input
$("#addTrainBtn").on("click", function(){
	event.preventDefault();
	
	//User inpt variables
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

	var newTrain = {
		name:  trainName,
		destination: destination,
		firstTrain: firstTrainUnix,
		frequency: frequency
	}

	// Train data
	trainData.ref().push(newTrain);

	//New txt box
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	return false;
});


// Add rows
trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrain;

	//unix difference in minutes
	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;

	//
	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 



	// Add data
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});