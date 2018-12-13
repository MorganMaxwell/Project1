/*This is my ajax call from another project, but the api key is new */
$(document).on("click",".search", function() {
    var data = $(this).data("search");
    var queryUrl = "https://pixabay.com/api/?key=10991575-42d8db2ac1f8661dc432f18af&q=yellow+flowers&image_type=photo
    console.log(queryUrl);

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
     }