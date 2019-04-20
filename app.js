
var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capbara", "teacup pig", "serval", "salamander", "frog"];
var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
var apiKey = "IUVeDO5tMqDFSLwLqPojoTz1CQD7bug7";
var searchQty = 10;

function buttonMaker() {
  $("#animal-buttons").empty();
  for (i = 0; i <  topics.length; i++) {
    var emptyButton = $("<button>");
    
    $(emptyButton).addClass("btn btn-primary m-1 animal-button");
    $(emptyButton).attr("id", topics[i]);
    $(emptyButton).html(topics[i]);
    $("#animal-buttons").append(emptyButton);
  }
};
function motionMaker() {
  if ($(this).attr("current-state") === "img-still") {
    $(this).attr("current-state", "img-motion");
    $(this).attr("src", $(this).attr("img-motion"));
  } else {
    $(this).attr("current-state", "img-still");
    $(this).attr("src", $(this).attr("img-still"));
  }
};
function cardMaker() {
  $("#animals").empty();
  
  $.ajax({
    url: queryURL + $(this).attr("id") + "&api_key=" + apiKey + "&limit=" + searchQty,
    method: "GET"
  }).then(function (response) {
    for (i= 1; i < searchQty; i++){ 
      console.log(response);
      var newCard = $("<div class='card mt-4 mx-2 float-left'>")
      var newImage = $("<img class='card-img-top img-thumbnail'>");
      var stillImage = response.data[i-1].images.downsized_still.url;
      var motionImage = response.data[i-1].images.downsized.url;
      $(newImage).attr("alt", response.data[i-1].title);

      $(newImage).attr("src", stillImage);
      $(newImage.attr("img-still", stillImage));
      $(newImage.attr("img-motion", motionImage));
      $(newImage).attr("current-state", "img-still");
      var newCardBody = $("<div class='card-body'>");
    
      var newCardText = $("<p class='card-text'>");
      newCardText.html("Rating: " + response.data[i-1].rating);
      newCardBody.append(newCardText);
      newCard.append(newImage).append(newCardBody);
      $("#animals").append(newCard);
    };
  })
};
function addAnimal() {
  event.preventDefault();
  var newAnimal = $("#animal-input").val();
  topics.push(newAnimal);
  $("#animal-input").val("");
  buttonMaker();
};
$(document).on('click', '.animal-button', cardMaker); 
$(document).on('click', '.img-thumbnail', motionMaker);
$(document).on('click', '#add-animal', addAnimal);
buttonMaker();