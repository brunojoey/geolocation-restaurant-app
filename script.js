var locationData = {
  state: 'state',
  city: 'city',
  postalCode: 'postalCode',
  word: []
};

var baseURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"
const apiKey = "?key=dea56771-7642-4f50-895c-bb6a6a34f4de"
var searchTerm = ""
var isFirstSearch = true;
var url = baseURL + "default" + apiKey

function sendQuery(url){
    $.ajax({
        url: url,
        method: "GET"
      }).then(function (response) {

        console.log(response);
        displayResponse(response);
    
    })
}


function displayResponse(data){

    if(isFirstSearch){
        $("#tbody").html("");
        isFirstSearch = false;
    }
    var tr = $("<tr>");
    var td1 = $("<td>");
    var td2 = $("<td>");

    td1.text(searchTerm)
    td2.text(data[0].shortdef[0]);

    tr.append(td1);
    tr.append(td2);

    $("#tbody").prepend(tr);
}

$("#search").on("click", function(){
    event.preventDefault();
    searchTerm = $("#input").val().toLowerCase();
    url = encodeURI(baseURL + searchTerm + apiKey);
    sendQuery(url);
    locationData.word.push(searchTerm);
    localStorage.setItem('location', JSON.stringify(locationData));
})




const geoApiKey = 'at_hD6JpWnRqX4YG6LsBbHUWzg0rBYAs'
var geoURL = 'https://geo.ipify.org/api/v1?apiKey=' + geoApiKey


$.ajax({
    url: geoURL,
    method: "GET"
}).then(function (response) {
    console.log(response);


    locationData.state = response.location.region;
    locationData.city = response.location.city;
    locationData.postalCode = response.location.postalCode;
    
})



  

