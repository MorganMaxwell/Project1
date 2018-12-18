console.log('The JavaScript file is linked.');

// setup masonry grid
$('.masonry').masonry({
    columnWidth: '.mason-sizer',
    itemSelector: '.mason-item',
    gutter: 15,
    percentPosition: true
});

// this will be the variable we use for the queries
var searchDate = moment();
var NYTsearch = moment(searchDate).format("MD");
var wikiSearch = moment(searchDate).format("M/D");
console.log(searchDate);

// grab userInput from searchbar

// change searchDate to 1 day backwards
function backButton() {
    searchDate = moment(searchDate).add(1, 'd');
};
// change searchdate to 1 day forwards... it could be fun
// to just let them change it to future dates because the 
// code should still run, but it might also look weird
function nextButton() {
    searchDate = moment(searchDate).subtract(1, 'd');
};

//First use wikipedia api to get events on this day in history
//Wikipedia uses Wikimedia for content and their API doesn't allow for simple accessing the particular content of a particular page.
//"muffinlabs" has created an api that fetches this data from the "Today in History" page of wikipedia and parses it into an 
//easy to read JSON.

var queryUrl = "https://history.muffinlabs.com/date/";

//the date variable will be acquired from the moment.js, here I just filled it in with an example.  The API is set to recieve "mm/dd" format.
//the nyt requires a date variable in "mmdd" without the "/"
var date = wikiSearch;
var keyArray = [];
var dateArray = [];
var titleArray = [];
var picArray = [];
$.ajax({
    url: queryUrl + date,
    method: "GET",
    dataType: "jsonp"
}).then(function (response) {
    for (var i = 0; i < response.data.Events.length; i++) {
        var y = parseInt(response.data.Events[i].year);
        if (y >= 1851 && y <= 2018) {
            keyArray.push(response.data.Events[i].text);
            dateArray.push(response.data.Events[i].year);
            titleArray.push(response.data.Events[i].links[0].title)
        }
    }
    for (var j = 0; j < keyArray.length; j++) {
        var searchKey = titleArray[j].split(" ").join("_").substring(0, 49);
        var picUrl = "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=";
var counter = 0;
        $.ajax({
            url: picUrl + searchKey,
            crossDomain: true,
            method: "GET"
        }).then(function (response) {
            //console.log("second response", response);
            counter++;
            console.log(counter);
            var keys = Object.keys(response.query.pages);
            console.log(keys);
            // if (response.query.pages[keys].original? response.query.pages[keys].original.source ) {

            //    console.log(response.query.pages[keys].original.hasOwnProperty("source"));
                picArray.push(response.query.pages[keys].original? response.query.pages[keys].original.source :"#");
                console.log(response.query.pages[keys].original.source);
            // }else {
            //     picArray.push("#")
            // }
        })
    };
});

console.log(titleArray, dateArray, picArray);

// grab data from user, searchbar and buttons
//$('#date-search').on("keyup", userInput);
$('#back-button').on('click', backButton);
$('#next-button').on('click', nextButton);
