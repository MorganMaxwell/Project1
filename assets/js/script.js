$(document).ready(function () {
    // setup masonry grid
    $('.masonry').masonry({
        columnWidth: '.mason-sizer',
        itemSelector: '.mason-item',
        gutter: 15,
        percentPosition: true
    });


// setup materialize date picker

    $('.masonry').masonry({
        columnWidth: '.mason-sizer',
        itemSelector: '.mason-item',
        gutter: 15,
        percentPosition: true
    });
    $('.datepicker').datepicker({
        format: 'mmmm d',
    });
    // this will be the variable we use for the queries
    var searchDate = moment();
    var NYTsearch = moment(searchDate).format("MD");
    var wikiSearch = moment(searchDate).format("M/D");
    var searchDisplay = moment(searchDate).format("MMMM d");
    
    $('#date-search').val(searchDisplay);

    // grab userInput from searchbar
    function userInput() {
        searchDate = $('#date-search').val().trim();
        console.log(searchDate);
    };
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
            }
        } console.log(keyArray, dateArray);
        dataPush();
    });
    function dataPush() {
        for (var i = 0; i < keyArray.length; i++) {
            var div = $('<div>');
            div.attr('class', 'mason-item');
            div.html(
                "<h2>" + dateArray[i] + "</h2>" +
                "<p>" + keyArray[i] + "</p>"
            );
            $('.masonry').append(div).masonry('appended', div);
        };
    };
    // grab data from user, searchbar and buttons
    $('.datepicker-done').on("click", userInput);
    $('#back-button').on('click', backButton);
    $('#next-button').on('click', nextButton);
});
