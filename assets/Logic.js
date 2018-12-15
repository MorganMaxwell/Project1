//First use wikipedia api to get events on this day in history
//Wikipedia uses Wikimedia for content and their API doesn't allow for simple accessing the particular content of a particular page.
//"muffinlabs" has created an api that fetches this data from the "Today in History" page of wikipedia and parses it into an 
//easy to read JSON.

var queryUrl = "https://history.muffinlabs.com/date/";
var date = "2/14";
var keyArray = [];
$.ajax({
    url: queryUrl + date,
    method: "GET",
    dataType: "jsonp"
}).then(function (response) {
    console.log(response.data.Events)

    for (var i = 0; i < response.data.Events.length; i++) {
        var y = parseInt(response.data.Events[i].year);
        if (y >= 1851 && y <= 2018) {
            keyArray.push(response.data.Events[i].links[0].title)
        }
    }
    console.log(keyArray);
});



//Create the components for the query URL

/*var url = "http://api.nytimes.com/svc/search/v1/article?query=organicpublication_year:[2004]publication_month:[01]&"

var api = "api-key=23b3fa378bcf46cb8aa4f6c7d3aa7070";

var month = "03";
var day = "";
var year = "";
*/
