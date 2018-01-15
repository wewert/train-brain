var config = {
     apiKey: "AIzaSyD22eDyFKuhnWMFITSmtAsEEPeEeZkVt_w",
     authDomain: "thomas-the-train-peep-peep.firebaseapp.com",
     databaseURL: "https://thomas-the-train-peep-peep.firebaseio.com",
     projectId: "thomas-the-train-peep-peep",
     storageBucket: "",
     messagingSenderId: "1081635965216"
   };
   firebase.initializeApp(config);

    var database = firebase.database();

var database = firebase.database();

 $(".btn").on("click",function(){
   var nameInput = $("#name-input").val().trim();
   var destInput = $("#dest-input").val().trim();
   var timeInput = $("#time-input").val().trim();
   var freqInput = $("#freq-input").val().trim();

   database.ref().push({
     nameInput: nameInput,
     destInput: destInput,
     timeInput: timeInput,
     freqInput: freqInput,
     dateAdded: firebase.database.ServerValue.TIMESTAMP
   })
 });

 database.ref().on("child_added", function(snapshot) {
   var tFrequency = snapshot.val().freqInput;
   var firstTime = snapshot.val().timeInput;
   var firstTimeConverted = moment(firstTime, "hh:mm A").subtract(1, "years");
   var currentTime = moment();
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   var tRemainder = diffTime % tFrequency;
   var tMinutesTillTrain = tFrequency - tRemainder;
   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   var nextTrainFormatted = moment(nextTrain).format("hh:mm A");

   var tBody = $("tbody");
   var tRow = $("<tr>");
   var nameTd = $("<td>").text(snapshot.val().nameInput);
   var destTd = $("<td>").text(snapshot.val().destInput);
   var freqTd = $("<td>").text(snapshot.val().freqInput);
   var nextTrainTd = $("<td>").text(nextTrainFormatted);
   var tMinutesTillTrainTd = $("<td>").text(tMinutesTillTrain);

   tRow.append(nameTd, destTd, freqTd, nextTrainTd, tMinutesTillTrainTd);
   tBody.append(tRow);

   }, function (errorObject) {
   console.log("The read failed : " + errorObject.code);
 });
