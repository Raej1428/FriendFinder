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

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the survey)
    // ---------------------------------------------------------------------------

    app.get("/api/survey", function(req, res) {
        res.json(friendData);
    });

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the friendData array)
    // ---------------------------------------------------------------------------

    app.post("/api/survey", function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a survey or not.
        // It will do this by sending out the value "true" have a survey
        // req.body is available since we're using the body parsing middleware
        if (friendData.customerlasagna == 5) {
            friendData.push(req.body);
            res.json(true);
        } else {
            friendData.push(req.body);
            res.json(false);
        }
    });

    app.post('/api/friends', function (req, res) {

        // Parse new friend input to get integers (AJAX post seemed to make the numbers strings)
        var newFriend = {
          name: req.body.name,
          photo: req.body.photo,
          scores: []
        };
        var scoresArray = [];
        for(var i=0; i < req.body.scores.length; i++){
          scoresArray.push( parseInt(req.body.scores[i]) )
        }
        newFriend.scores = scoresArray;
    
    
        // Cross check the new friend entry with the existing ones
        var scoreComparisionArray = [];
        for(var i=0; i < friendsData.length; i++){
    
          // Check each friend's scores and sum difference in points
          var currentComparison = 0;
          for(var j=0; j < newFriend.scores.length; j++){
            currentComparison += Math.abs( newFriend.scores[j] - friendsData[i].scores[j] );
          }
    
          // Push each comparison between friends to array
          scoreComparisionArray.push(currentComparison);
        }
    
        // Determine the best match using the postion of best match in the friendsData array
        var bestMatchPosition = 0; // assume its the first person to start
        for(var i=1; i < scoreComparisionArray.length; i++){
          
          // Lower number in comparison difference means better match
          if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
            bestMatchPosition = i;
          }
    
        }
    
        // ***NOTE*** If the 2 friends have the same comparison, then the NEWEST entry in the friendsData array is chosen
        var bestFriendMatch = friendsData[bestMatchPosition];
    
    
    
        // Reply with a JSON object of the best match
        res.json(bestFriendMatch);
    
    
    
        // Push the new friend to the friends data array for storage
        friendsData.push(newFriend);
    
      });
    

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the survey while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data
        friendData.length = 0;

        res.json({ ok: true });
    });
};