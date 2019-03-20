var events = [];
//on click event for search  & TicketMaster ajax call
$("#submitBtn").on("click", function (event) {

    event.preventDefault();

    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    var map, infoWindow;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;


        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);

                var marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                });
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }
    initMap();


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }




    var artist = $("#artistInput").val().trim();
    var city = $("#cityInput").val().trim();
    $(".w3-input").val("");

    console.log("artist: " + artist);
    console.log("city: " + city);

    $("#artistDispaly").text(artist);
    $("#cityDisplay").text(city);

    sessionStorage.clear();
    sessionStorage.setItem("artist", artist);
    sessionStorage.setItem("city", city);

    var TMqueryURL = "https://app.ticketmaster.com/discovery/v2/events?classificationName=music&keyword=" + artist + "&city=" + city + "&apikey=CivSHmaHRiF5tdJGvaAktTdsXl91vzwm";
    // if only artisit is entered then 
    //if only city is entered then 
    // if both is entered then
    // else default option


    $.ajax({
        url: TMqueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        if (!response._embedded) {
            alert('d\'oh');
        } else {
            for (var i = 0; i < response._embedded.events.length; i++) {
                var artistResponse = response._embedded.events[i].name;
                var cityResponse = response._embedded.events[i]._embedded.venues[0].city.name;
                var event = {
                    name: response._embedded.events[i].name,
                    location: response._embedded.events[i]._embedded.venues[0].city.name,
                }
                var latitude = response._embedded.venues[i].location.latitude;
                var longitude = response._embedded.venues[i].location.longitude;
                events.push(event)
                console.log("city response: " + cityResponse);
                console.log("artist response: " + artistResponse);

            }
            showEvents()
        }
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map
        });

    });
});

$("#artistDisplay").text(sessionStorage.getItem("artist"));
$("#cityDisplay").text(sessionStorage.getItem("city"));

function showEvents() {
    console.log("events", events)
    for (var i = 0; i < events.length; i++) {
        $(".events").append("<p>" + events[i].name + "</p>");
        $(".events").append("<p>" + events[i].location + "</p>");
    }
}






// $(document).ready(function(){
//     $('.modal').modal();
//   });

//_______________________________________________________________________________

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else {
//         var x = document.getElementById("location");
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

// function showPosition(position) {
//     // var x = document.getElementById("location");
//     // x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

//     // var latlon = position.coords.latitude + "," + position.coords.longitude;

//     $.ajax({
//         type: "GET",
//         url: TMqueryURL,
//         // async: true,
//         // dataType: "json",
//         success: function (response) {
//             console.log(response);
//             var e = document.getElementById("events");
//             e.innerHTML = response.page.totalElements + " events found.";
//             showEvents(response);
//             // initMap(position, response);
//         },
//         error: function (xhr, status, error) {
//             console.log("error: " + error);
//         }
//     });

// }

// function showError(error) {
//     switch (error.code) {
//         case error.PERMISSION_DENIED:
//             x.innerHTML = "User denied the request for Geolocation."
//             break;
//         case error.POSITION_UNAVAILABLE:
//             x.innerHTML = "Location information is unavailable."
//             break;
//         case error.TIMEOUT:
//             x.innerHTML = "The request to get user location timed out."
//             break;
//         case error.UNKNOWN_ERROR:
//             x.innerHTML = "An unknown error occurred."
//             break;
//     }
// }


// function showEvents(response) {
//     for (var i = 0; i < response.page.size; i++) {
//         $("#events").append("<p>" + response._embedded.events[i].name + "</p>");
//     }
// }


// function initMap(position, response) {
//     var mapDiv = document.getElementById('map');
//     var map = new google.maps.Map(mapDiv, {
//         center: center,
//         zoom: 8
//     });
//     for (var i = 0; i < response.page.size; i++) {
//         addMarker(map, response._embedded.events[i]);
//     }
// }

// function addMarker(map, event) {
//     var marker = new google.maps.Marker({
//         position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
//         map: map
//     });
//     marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
//     console.log(marker);
// }




// getLocation();
