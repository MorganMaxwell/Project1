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
    var searchDisplay = moment(searchDate).format("MMMM D");

    $('#date-search').val(searchDisplay);

    // grab userInput from searchbar
    function userInput() {
        searchDisplay = $('#date-search').val().trim();
        wikiSearch = moment(searchDisplay).format('M/D');
        wikipedia();
    };
    // change date 1 day backward
    function backButton() {
        searchDate = moment(searchDate).add(1, 'd');
    };
    // change date 1 day forward
    function nextButton() {
        searchDate = moment(searchDate).subtract(1, 'd');
    };
    //First use wikipedia api to get events on this day in history
    //Wikipedia uses Wikimedia for content and their API doesn't allow for simple accessing the particular content of a particular page.
    //"muffinlabs" has created an api that fetches this data from the "Today in History" page of wikipedia and parses it into an 
    //easy to read JSON.
    //the date variable will be acquired from the moment.js, here I just filled it in with an example.  The API is set to recieve "mm/dd" format.
    //the nyt requires a date variable in "mmdd" without the "/"


    // grab data from user, searchbar and buttons
    $('#date-search').on("keyup", userInput);
    $('#back-button').on('click', backButton);
    $('#next-button').on('click', nextButton);

    var queryUrl = "https://history.muffinlabs.com/date/";

    //the date variable will be acquired from the moment.js, here I just filled it in with an example.  The API is set to recieve "mm/dd" format.
    //the nyt requires a date variable in "mmdd" without the "/"
    var keyArray = [];
    var dateArray = [];
    var picArray = [];
    var titleArray = [];
    function wikipedia() {
        $.ajax({
            url: queryUrl + wikiSearch,
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
                    counter++;
                    console.log(counter);
                    var keys = Object.keys(response.query.pages);
                    console.log(keys);
                    picArray.push(response.query.pages[keys].original ? response.query.pages[keys].original.source : "#");
                    console.log(response.query.pages[keys].original.source);
                })

            };
            dataPush();
        });
    };
    function dataPush() {
        for (var i = 0; i < keyArray.length; i++) {
            var div = $('<div>');
            div.attr('class', 'mason-item');
            console.log(div);
            div.html(
                '<h2>' + dateArray[i] + '</h2>' +
                '<p>' + keyArray[i] + '</p>'
            );
            $('.masonry').prepend(div).masonry('prepended', div);
        };
    };
    wikipedia();
    // grab data from user, searchbar and buttons
    $('.datepicker-done').on("click", userInput);
    $('#back-button').on('click', backButton);
    $('#next-button').on('click', nextButton);
});
