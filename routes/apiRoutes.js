// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on survey-data, friends, etc.
// ===============================================================================

var surveyData = require("../data/surveyData");
var friendData = require("../data/friendsData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the survey)
    // ---------------------------------------------------------------------------

    app.get("/api/surveys", function(req, res) {
        res.json(surveyData);
    });

    app.get("/api/friend", function(req, res) {
        res.json(friendData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the surveyData array)
    // ---------------------------------------------------------------------------

    app.post("/api/surveys", function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a survey or not.
        // It will do this by sending out the value "true" have a survey
        // req.body is available since we're using the body parsing middleware
        if (surveyData.length < 5) {
            surveyData.push(req.body);
            res.json(true);
        } else {
            friendData.push(req.body);
            res.json(false);
        }
    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the survey while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data
        surveyData.length = 0;
        friendData.length = 0;

        res.json({ ok: true });
    });
};