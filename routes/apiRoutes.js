// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on survey-data, friends, etc.
// ===============================================================================

// var friendData = require("../data/friendData");
var friendData = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the survey)
  // ---------------------------------------------------------------------------
  app.get("/api/survey", function (req, res) {
    res.json(friendData);
  });
  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------
  app.post("/api/survey", function (req, res) {
    res.json(friendData);
    // Note the code here. Our "server" will respond to requests and let users know if they have a survey or not.
    // It will do this by sending out the value "true" have a survey
    // req.body is available since we're using the body parsing middleware
    var newFriend = {
      name: friendData.customerName,
      photo: friendData.photoNumber,
      scores: []
    };

    console.log(newFriend);
    var scoresArray = [];
    for (var i = 0; i < newFriend.scores.length; i++) {
      scoresArray.push(parseInt(newFriend.scores[i]))
    }
    newFriend.scores = scoresArray;

    var scoreComparisionArray = [];
    // Check each friend's scores and sum difference in points
    for (var i = 0; i < friendData.length; i++) {
      var currentComparison = '';
      for (var j = 0; j < newFriend.scores.length; j++) {
        currentComparison += Math.abs(newFriend.scores[j] - friendData[i].scores[j]);
      }
      // Push each comparison between friends to array
      scoreComparisionArray.push(currentComparison);
    }

    var bestMatchPosition = ''; // assume its the first person to start
    for (var i = 0; i < scoreComparisionArray.length; i++) {
      // Lower number in comparison difference means better match
      if (scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]) {
        bestMatchPosition = i;
        res.json(true);
      } else {
        res.json(false);
      }
    }

    var bestFriendMatch = friendData[bestMatchPosition];
    // Reply with a JSON object of the best match
    res.json(bestFriendMatch);
    // Push the new friend to the friends data array for storage
    friendData.push(newFriend);

    

  });

  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    console.log(bestFriendMatch);
    console.log(newFriend);
    friendData.length = 0;
    res.json({ ok: true });
  });

}
//   app.post('/api/survey', function (req, res) {
//     // Parse new friend input to get integers (AJAX post seemed to make the numbers strings)
//     var newFriend = {
//       name: req.body.customerName,
//       photo: req.body.photoNumber,
//       scores: []
//     };

//     console.log(newFriend);
//     var scoresArray = [];
//     for (var i = 0; i < newFriend.scores.length; i++) {
//       scoresArray.push(parseInt(newFriend.scores[i]))
//     }
//     newFriend.scores = scoresArray;

//     // Cross check the new friend entry with the existing ones
//     var scoreComparisionArray = [];
//     for (var i = 0; i < friendData.length; i++) {

//       // Check each friend's scores and sum difference in points
//       var currentComparison = '';
//       for (var j = 0; j < newFriend.scores.length; j++) {
//         currentComparison += Math.abs(newFriend.scores[j] - friendData[i].scores[j]);
//       }

//       // Push each comparison between friends to array
//       scoreComparisionArray.push(currentComparison);
//     }

//     // Determine the best match using the postion of best match in the friendData array
//     var bestMatchPosition = ''; // assume its the first person to start
//     for (var i = 0; i < scoreComparisionArray.length; i++) {
//       // Lower number in comparison difference means better match
//       if (scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]) {
//         bestMatchPosition = i;
//         res.json(true);
//       } else {
//         res.json(false);
//       }
//     }
//     var bestFriendMatch = friendData[bestMatchPosition];
//     // Reply with a JSON object of the best match
//     res.json(bestFriendMatch);
//     // Push the new friend to the friends data array for storage
//     friendData.push(newFriend);

//   });
//   // ---------------------------------------------------------------------------
//   // I added this below code so you could clear out the survey while working with the functionality.
//   // Don"t worry about it!

//   app.post("/api/clear", function (req, res) {
//     // Empty out the arrays of data
//     console.log(bestFriendMatch);
//     console.log(newFriend);
//     friendData.length = 0;
//     res.json({ ok: true });
//   });
// 