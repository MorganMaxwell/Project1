$(document).ready(function () {

    // setup masonry grid
    var msnry = $('.masonry').masonry({
        columnWidth: '.mason-sizer',
        itemSelector: '.mason-item',
        gutter: 15,
        percentPosition: true
    });

    msnry.imagesLoaded().progress( function() {
        msnry.masonry();
    });

    // setup materialize date picker
    $('.datepicker').datepicker({
        format: 'mmmm d',
    });

    // this will be the variable we use for the queries
    var searchDate = moment();
    var NYTsearch = moment(searchDate).format("MD");
    var wikiSearch = moment(searchDate).format("M/D");
    var searchDisplay = moment(searchDate).format("MMMM D");

    $('#date-search').val(searchDisplay);

    // clear ajax arrays
    function clearArrays() {
        keyArray = [];
        dateArray = [];
        picArray = [];
        titleArray = [];
        urlArray = [];
    }

    // grab userInput from searchbar, and grab data
    function userInput() {
        searchDisplay = $('#date-search').val().trim();
        wikiSearch = moment(searchDisplay).format('M/D');
        clearArrays();
        wikipedia();
    };

    // change date 1 day backward
    function backButton() {
        searchDate = moment(searchDate).subtract(1, 'd');
        wikiSearch = moment(searchDate).format("M/D");
        searchDisplay = moment(searchDate).format("MMMM D");
        $('#date-search').val(searchDisplay);
        console.log(wikiSearch);
        clearArrays();
        wikipedia();
    };

    // change date 1 day forward
    function nextButton() {
        searchDate = moment(searchDate).add(1, 'd');
        wikiSearch = moment(searchDate).format("M/D");
        searchDisplay = moment(searchDate).format("MMMM D");
        $('#date-search').val(searchDisplay);
        console.log(wikiSearch);
        clearArrays();
        wikipedia();
    };

    //First use wikipedia api to get events on this day in history
    //Wikipedia uses Wikimedia for content and their API doesn't allow for simple accessing the particular content of a particular page.
    //"muffinlabs" has created an api that fetches this data from the "Today in History" page of wikipedia and parses it into an 
    //easy to read JSON.
    //the date variable will be acquired from the moment.js, here I just filled it in with an example.  The API is set to recieve "mm/dd" format.
    //the nyt requires a date variable in "mmdd" without the "/"

    var queryUrl = "https://history.muffinlabs.com/date/";

    //the date variable will be acquired from the moment.js, here I just filled it in with an example.  The API is set to recieve "mm/dd" format.
    //the nyt requires a date variable in "mmdd" without the "/"
    var keyArray = [];
    var dateArray = [];
    var picArray = [];
    var titleArray = [];
    var urlArray = [];

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
                    titleArray.push(response.data.Events[i].links[0].title);
                    urlArray.push(response.data.Events[i].links[0].link);
                }
            }
            for (var j = 0; j < titleArray.length; j++) {
                var searchKey = titleArray[j].split(" ").join("_").substring(0, 49);
                var picUrl = "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=";
                var counter = 0;
                $.ajax({
                    url: picUrl + searchKey,
                    crossDomain: true,
                    crossOrigin: true,
                    method: "GET"
                }).then(function (response) {
                    counter++;
                    // console.log(counter);
                    var keys = Object.keys(response.query.pages);
                    // console.log(keys);
                    picArray.push(response.query.pages[keys].original ? response.query.pages[keys].original.source : "#");
                    // console.log(response.query.pages[keys].original.source);
                    // console.log('pic array: ' + picArray);

                    dataPush();
                })
            };

            console.log(dateArray);
            console.log(keyArray);
            console.log(urlArray);
            console.log(picArray);
            
        });

    };

    function dataPush() {
        for (var i = 0; i < 5; i++) {
            var div = $('<div>');
            var head = $('<h2>');
            var dateSpan = $('<span class="dateSpan">');
            var desc = $('<p>');
            var img = '<img src="' + picArray[i] + '"/>';
            var btn = $('<a class="waves-effect waves-light btn" target="_blank">')

            div.attr('class', 'mason-item');
            dateSpan.text(wikiSearch);
            head.text(dateArray[i]).append(dateSpan);
            desc.text(keyArray[i]);
            btn.attr('href', urlArray[i]).text('Learn More');

            div.append(img, head, desc, btn);

            $('.masonry').prepend(div).masonry('prepended', div);
        };
    };

    wikipedia();

    // grab data from user, searchbar and buttons
    $('.datepicker-done').on("click", userInput);
    $('#backButton').on('click', backButton);
    $('#nextButton').on('click', nextButton);

});