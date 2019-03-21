var events = [];
var markers = [];

//on click event for search  & TicketMaster ajax call
$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    $(".eventCard").empty();

    var artist = $("#artistInput").val().trim();
    var city = $("#cityInput").val().trim();
    $(".w3-input").val("");
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
        res = response;
        if (!response._embedded) {
            alert("Sorry, there are no results for this search. Please try again.");
        } else {
            events = [];
            for (var i = 0; i < response._embedded.events.length; i++) {
                var event = {
                    name: response._embedded.events[i].name,
                    location: response._embedded.events[i]._embedded.venues[0].name,
                    tixURL: response._embedded.events[i].url,
                    image: response._embedded.events[i].images[0].url,
                    date: response._embedded.events[i].dates.start.localDate,
                }
                events.push(event)
                var latitude = parseFloat(response._embedded.events[i]._embedded.venues[0].location.latitude);
                var longitude = parseFloat(response._embedded.events[i]._embedded.venues[0].location.longitude);
                markers.push({ latitude, longitude });
            }
            showEvents();
            initMap(markers);
        }

        // Note: This example requires that you consent to location sharing when
        // prompted by your browser. If you see the error "The Geolocation service
        // failed.", it means you probably did not give permission for the browser to
        // locate you.
        var map, infoWindow;
        var latitude = parseFloat(response._embedded.events[i]._embedded.venues[0].location.latitude);
        var longitude = parseFloat(response._embedded.events[i]._embedded.venues[0].location.longitude);
        function initMap(obj) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: latitude, lng: longitude },
                zoom: 6
            });
            infoWindow = new google.maps.InfoWindow;
            obj.forEach(function (e) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(e.latitude, e.longitude),
                    map: map
                });
            })

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        };

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }
    });

    $("#artistDisplay").text(sessionStorage.getItem("artist"));
    $("#cityDisplay").text(sessionStorage.getItem("city"));

    //==================================================================================================
    function showEvents() {
        for (var i = 0; i < events.length; i++) {
            var newCard = $("<div class='card horizontal'></div>");
            var cardContent = $("<div class='card-stacked'><div class='card-content'></div></div>");
            var imageContent = $("<div class='card-image'></div>");
            var tixButton = $("<button></button>");

            // if name is not available error else append 
            if (!events[i].name) {
                $(cardContent).append("<p>Unable to find event title</p>");
            } else {
                $(cardContent).append("<p>" + events[i].name + "</p>");
            };

            // if date not available error else append
            if (!events[i].date) {
                $(cardContent).append("<p>Unable to find event date</p>");
            } else {
                $(cardContent).append("<p>" + events[i].date + "</p>");
            };

            // if venue is not available error else append
            if (!events[i].location) {
                $(cardContent).append("<p>Unable to find event venue</p>");
            } else {
                $(cardContent).append("<p>" + events[i].location + "</p>");
            };

            // // if ticket url not available error else append
            if (!events[i].tixURL) {
                $(tixButton).append("<p>Unable to find tickets</p>");
            } else {
                $(tixButton).append("<a href=" + events[i].tixURL + ">Buy Tickets</a>");
            };

            // if image is not available error else append
            if (!events[i].image) {
                $(imageContent).append("<p>image not found</p>");
            } else {
                $(imageContent).append("<img src=" + events[i].image + "></img>");
            };

            newCard.append(imageContent)
            newCard.append(cardContent);
            cardContent.append(tixButton);
            $(".eventCard").append(newCard);
        };
    }
});

function addMarker(map, event) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
        map: map
    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
}

// Initializes use of Materialize Modals
$(document).ready(function () {
    $('.modal').modal();
});
// Opens Terms and Agreement on page load and reload
var windowTimeout = setTimeout(function () {
    $("#modal1").modal('open');
}, 2000);

// Requires that user click checkbox to access "agree" button
$("#checkBoxInput").click(function () {
    if ($(this).is(":checked")) {
        $("#submitModalBtn").removeClass("disabled");
    } else {

        $("#submitModalBtn").addClass("disabled");
    }
});


