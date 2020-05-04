// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on survey-data, friends, etc.
// ===============================================================================

// var friendData = require("../data/friendData");
var friendData = require("../data/friends.js");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = apiRoutes;

function apiRoutes(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the survey)
  // ---------------------------------------------------------------------------
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
  app.post("/api/friends", function (req, res) {

    // Parse new friend object tfor score integers
    var newFriend = {
      customerName: req.body.customerName,
      photoNumber: req.body.photoNumber,
      scores: []
    };
    var scoresArray = [];
    for (var i = 0; i < req.body.scores.length; i++) {
      scoresArray.push(parseInt(req.body.scores[i]))
    }
    newFriend.scores = scoresArray;

    // Check  new friend against with the existing ones
    var scoreComparisionArray = [];
    for (var i = 0; i < friendData.length; i++) {

      // Check each friend's scores and sum difference in points
      var currentComparison = 0;
      for (var j = 0; j < newFriend.scores.length; j++) {
        currentComparison += Math.abs(newFriend.scores[j] - friendData[i].scores[j]);
      }
      // Push each comparison between friends to array
      scoreComparisionArray.push(currentComparison);
    }
    // Determine the best match using the postion of best match in the friendData array
    var bestMatchPosition = 0; // assume its the first person to start
    for (var i = 1; i < scoreComparisionArray.length; i++) {
      //lowest number for difference is the best match signaling most in common.
      if (scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]) {
        bestMatchPosition = i;
      }
    }
    var bestFriendMatch = friendData[bestMatchPosition];
    // Reply with a JSON object of the best match
    res.json(bestFriendMatch);
    // Push the new friend to the friends data array for storage
    friendData.push(newFriend);

  });

}