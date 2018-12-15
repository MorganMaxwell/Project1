//First use wikipedia api to get events on this day in history
//Wikipedia uses Wikimedia for content and their API doesn't allow for simple accessing the particular content of a particular page.
//"muffinlabs" has created an api that fetches this data from the "Today in History" page of wikipedia and parses it into an 
//easy to read JSON.

var queryUrl = "https://history.muffinlabs.com/date/";

//the date variable will be acquired from the moment.js, here I just filled it in with an example.  The API is set to recieve "mm/dd" format.
//the nyt requires a date variable in "mmdd" without the "/"
var date = "02/14";
var nytDate = "0214";
var keyArray = [];
var dateArray = [];
$.ajax({
    url: queryUrl + date,
    method: "GET",
    dataType: "jsonp"
}).then(function (response) {
    console.log(response.data.Events)

    for (var i = 0; i < response.data.Events.length; i++) {
        var y = parseInt(response.data.Events[i].year);
        if (y >= 1851 && y <= 2018) {
            keyArray.push(response.data.Events[i].links[0].title);
            dateArray.push(response.data.Events[i].year);
        }
    }
    console.log(keyArray);
    console.log(dateArray);
    //Create the components for the API query to the NYT
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
    for (var n = 0; n < keyArray.length; n++) {
        var begin_date = dateArray[n] + nytDate;
        var q = keyArray[n];


        nytUrl += '?' + $.param({
            'api-key': "23b3fa378bcf46cb8aa4f6c7d3aa7070",
            'q': q,
            'begin_date': begin_date,
            'end_date': begin_date,
            'fl': 'headline'
        });
        var api = "api-key=23b3fa378bcf46cb8aa4f6c7d3aa7070";

        $.ajax({
            url: nytUrl + api,
            method: "GET"
        }).then(function (response) {
            console.log(response)
        });
    }
});


