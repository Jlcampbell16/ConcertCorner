var events = [];


//on click event for search  & TicketMaster ajax call
$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    var res;


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
        // dataType: "jsonp",
        // contentType: "application/json",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        res = response;
        console.log(res);
        if (!response._embedded) {
            alert('d\'oh');
        } else {
            for (var i = 0; i < response._embedded.events.length; i++) {
                var artistResponse = response._embedded.events[i].name;
                var cityResponse = response._embedded.events[i]._embedded.venues[0].name;

                var event = {
                    name: response._embedded.events[i].name,
                    location: response._embedded.events[i]._embedded.venues[0].name,
                    tixURL: response._embedded.events[i].url,
                    image: response._embedded.events[i].images[0].url,

                }
                events.push(event)
                console.log(events)
                var latitude = parseFloat(response._embedded.events[i]._embedded.venues[0].location.latitude);
                var longitude = parseFloat(response._embedded.events[i]._embedded.venues[0].location.longitude);
                console.log("coord " + latitude)
                console.log("coord " + longitude)
                console.log("city response: " + cityResponse);
                console.log("artist response: " + artistResponse);


                console.log("tixURL: " + event.tixURL);

            }
            showEvents();
            initMap();


        }



        console.log(res);
        // Note: This example requires that you consent to location sharing when
        // prompted by your browser. If you see the error "The Geolocation service
        // failed.", it means you probably did not give permission for the browser to
        // locate you.
        var map, infoWindow;
        var latitude = parseFloat(response._embedded.events[i]._embedded.venues[0].location.latitude);
        console.log(latitude);
        var longitude = parseFloat(response._embedded.events[i]._embedded.venues[0].location.longitude);
        console.log(longitude);
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: latitude, lng: longitude },
                zoom: 6
            });
            infoWindow = new google.maps.InfoWindow;


            //     // Try HTML5 geolocation.
            //     if (navigator.geolocation) {
            //         navigator.geolocation.getCurrentPosition(function (position) {
            //             var pos = {
            //                 lat: position.coords.latitude,
            //                 lng: position.coords.longitude
            //             };

            //             infoWindow.setPosition(pos);
            //             infoWindow.setContent('Location found.');
            //             infoWindow.open(map);
            //             map.setCenter(pos);

            //             var marker = new google.maps.Marker({
            //                 position: pos,
            //                 map: map,
            //             });
            //         }, function () {
            //             handleLocationError(true, infoWindow, map.getCenter());
            //         });
            //     } else {
            //         // Browser doesn't support Geolocation
            //         handleLocationError(false, infoWindow, map.getCenter());
            //     }
            // }


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

    function showEvents() {

        console.log("events", events)

        for (var i = 0; i < events.length; i++) {


            var newCard = $("<div class='card horizontal'></div>");
            var cardContent = $("<div class='card-stacked'><div class='card-content'></div></div>");
            var imageContent = $("<div class='card-image'></div>");
            // var eventTitle = ""; 
            // var eventVenue = ""; 
            // var image = ""; 
            // var description = "";



            // if name is not available error else append 
            if (!events[i].name) {
                $(cardContent).append("<p>Unable to find event title</p>");
            } else {
                $(cardContent).append("<p>" + events[i].name + "</p>");
            };

            // if venue is not available error else append
            if (!events[i].location) {
                $(cardContent).append("<p>Unable to find event venue</p>");
            } else {
                $(cardContent).append("<p>" + events[i].location + "</p>");
            };

            // // if image is not available error else append
            if (!events[i].tixURL) {
                $(cardContent).append("<p>Unable to find tickets</p>");
            } else {
                $(cardContent).append("<p>" + events[i].tixURL + "</p>");
            }
            // // if description is not available error else append
            // // if image is not available error else append
            if (!events[i].image) {
                $(imageContent).append("<p>image not found</p>");
            } else {
                $(imageContent).append("<img src=" + events[i].image + "></img>");
            }
            newCard.append(imageContent)
            newCard.append(cardContent);
            $(".eventCard").append(newCard);


        };


    }




    // Initializes use of Materialize Modals
    $(document).ready(function () {
        $('.modal').modal();
    });
    // Opens Terms and Agreement on page load and reload
    var windowTimeout = setTimeout(function () {
        console.log("Ping")
        $("#modal1").modal('open');
    }, 2000);

    // Requires that user click checkbox to access "agree" button
    $("#checkBoxInput").click(function () {
        console.log($(this).is(":checked"));
        if ($(this).is(":checked")) {
            $("#submitModalBtn").removeClass("disabled");
            console.log($("#submitModalBtn"));
        } else {

            $("#submitModalBtn").addClass("disabled");
        }
    });


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



})
