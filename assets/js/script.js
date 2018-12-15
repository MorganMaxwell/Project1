console.log('The JavaScript file is linked.');

// setup masonry grid
$('.masonry').masonry({
    itemSelector: '.mason-item',
    columnWidth: 300,
    gutter: 15
});

// this will be the variable we use for the queries
var searchDate = moment();

// grab userInput from searchbar
function userInput() {
    if (event.keyCode === 13) {
        searchDate = $('#date-search').val().trim();
        var queryUrl = "https://pixabay.com/api/?key=10991575-42d8db2ac1f8661dc432f18af&q=yellow+flowers&image_type=photo";
   
$.ajax({ 
    url: queryUrl, 
    crossDomain: true,
    method: "GET"})
  
.then(function(response) {
    console.log(response);
     for(var i = 0; i < response.data.length;i++) {
     var div = $("<div>");
     var img = $("<img>");
     var p = $("<p>");
     p.text("rating: " + response.data[i].rating);
     img.attr("src", response.data[i].images.fixed_height_still.url);
    img.attr("data-state", "still");
    img.attr("data-animated", response.data[i].images.fixed_height.url);
    img.attr("data-still", response.data[i].images.fixed_height_still.url);
     div.append(img);
    div.append(p);
     $("#thinkers").prepend(div);
    }})
    };
};
// change searchDate to 1 day backwards
function backButton() {
    searchDate; // -1 TODO if we want it
};
// change searchdate to 1 day forwards... it could be fun
// to just let them change it to future dates because the 
// code should still run, but it might also look weird
function nextButton() {
    searchDate;// +1 TODO if we want it
};

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
    //Create the components for the API query to the NYT
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
    for (var n = 0; n < dateArray.length; n++) {
        var begin_date = dateArray[n] + nytDate;
        var end_date = (parseInt(dateArray[n]) + 1) + nytDate;
        var q = keyArray[n];
        var api = "23b3fa378bcf46cb8aa4f6c7d3aa7070";
        nytUrl += '?' + $.param({
            'api-key': api,
            'q': q,
            'begin_date': begin_date,
            'end_date': end_date,
        });
        $.ajax({
            url: nytUrl + api,
            method: "GET",
            //dataType: "jsonp"
        }).then(function (response) {
            console.log(response.response.docs[0].headline.main);
        });
    }
});



// grab data from user, searchbar and buttons
$('#date-search').on("keyup", userInput);
$('#back-button').on('click', backButton);
$('#next-button').on('click', nextButton);

/*This is my ajax call from another project, but the api key is new */

