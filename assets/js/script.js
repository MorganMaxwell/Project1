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
        searchDate = $('#search-example').val().trim();
        console.log(searchDate);
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


// grab data from user, searchbar and buttons
$('#search-example').on("keyup", userInput);
$('#back-button').on('click', backButton);
$('#next-button').on('click', nextButton);
