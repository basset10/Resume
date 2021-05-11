'use strict';

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var query = "";
var queryURL = "https://api.edamam.com/search?q=" + query + "&app_id=b828a265&app_key=5e2a9fdf008e5aa93c056009d598780a";
console.log(queryURL);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function fetchResults(searchQuery){
    query = searchQuery;
    queryURL = "https://api.edamam.com/search?q=" + searchQuery + "&app_id=b828a265&app_key=5e2a9fdf008e5aa93c056009d598780a";
    console.log(queryURL);
$.ajax({
    url: queryURL,
    method: "GET",
  })
    .then (function(response) {
        let randomInt = getRandomInt(response.hits.length-1);
        console.log(randomInt);
        console.log(response.hits.length);
        $(".card-body").html("");

      $(".card-body").append("<h1>" + response.hits[randomInt].recipe.label) + "</h1>";
      $(".card-body").append("<p><img src="+response.hits[randomInt].recipe.image+" alt ="+response.hits[randomInt].recipe.label+" title="+response.hits[randomInt].recipe.label+"></p>");

      var ingredientList = "<li>" + response.hits[randomInt].recipe.ingredientLines.join("</li><li>") + "</li>";
      $(".card-body").append("<h2>Ingredients:</h2>");
      $(".card-body").append("<ul>"+ingredientList+"</ul>");

      var healthList = "<li>" + response.hits[randomInt].recipe.healthLabels.join("</li><li>") + "</li>";
      $(".card-body").append("<h2>Health Labels:</h2>");
      $(".card-body").append("<ul>"+ healthList +"</ul>");

  })    .catch(error =>{
    $(".card-body").html("");
    renderError(error);
  });
}

$('#search-button').on('click', (event) => {
    console.log($('#searchQuery').val());
    fetchResults($('#searchQuery').val());
    event.preventDefault();
  })



function renderError(){
    $(".card-body").html("");
    $(".card-body").prepend(`<p class="error">Could not find results for query '`+query+`', please try refining your search</p>`);
    renderRandomButton();
  }

  function renderRandomButton(){
      $(".card-body").append(`
      <div class="form-group2">
        <button class="random" id="random-button">
          <i aria-hidden="true"></i>Completely Random Recipe!
        </button>
      </div>`);
      $('#random-button').on('click', (event) => {
        fetchResults(alphabet[getRandomInt(alphabet.length-1)]);
        event.preventDefault();
      });
  }

