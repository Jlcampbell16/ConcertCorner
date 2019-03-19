
//old API key 5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG

//Ticket Master AJAx
//JENN'S CODE

//on click event for search 
$("#submitBtn").on("click", function (event) {
    event.preventDefault();

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
    $.ajax({
        url: TMqueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        if(!response._embedded) {
            alert('d\'oh');
        } else {
            for (var i = 0; i < response._embedded.events.length; i++) {
                var artisitResponse = response._embedded.events[i].name;
                var cityResponse = response._embedded.events[i]._embedded.venues[i].city.name;
    
                console.log("city response: " + cityResponse);
                console.log("artist response: " + artisitResponse);
            }
        }
    });

});

$("#artistDisplay").text(sessionStorage.getItem("artist"));
$("#cityDisplay").text(sessionStorage.getItem("city"));

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