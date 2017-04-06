// sanity check
console.log('working');
// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";


$(document).on("ready", function() {

	initMap();
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.78, lng: -122.44},
          zoom: 1
        });
       
      }

  $.ajax ({
  	method: "GET",
  	url: weekly_quakes_endpoint,
  	dataType: "json",
  	success: onSuccess,
  	error: onError
  })

  function onSuccess(json) {
  	console.log(json);
  	console.log(json.features[0].properties.mag);
  
   var quakes = json.features;
   
   // for of loop (ES6 practice)
   for (quake of quakes) {

	// declare variable for each string
	var mag = quake.properties.mag;
	var lat = quake.geometry.coordinates[1];
	var lng = quake.geometry.coordinates[0];

	// markers for our location in SF and all other cities with earthquake data
	
	marker = new google.maps.Marker({
    map: map,
    position: {lat: lat, lng: lng}
  	});

	console.log(mag);

   	$('#info').append("<p>"+ quake.properties.title + "</p>");
   	
   }
  }
// function incase if there is an error console will show us
function onError(xhr, status, errorThrown) {
	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
  }

});













