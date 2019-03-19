// var artist;
// var city;

//on click event for search 
// $("#submitBtn").on("click", function (event) {
//     event.preventDefault();

//     var artist = $("#artistInput").val().trim();
//     var city = $("#cityInput").val().trim();
//     $(".w3-input").val("");

//     console.log("artist: " + artist);
//     console.log("city: " + city);

//     $("#artistDispaly").text(artist);
//     $("#cityDisplay").text(city);

//     sessionStorage.clear();
//     sessionStorage.setItem("artist", artist);
//     sessionStorage.setItem("city", city);
// });

// $("#artistDisplay").text(sessionStorage.getItem("artist"));
// $("#cityDisplay").text(sessionStorage.getItem("city"));


// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else {
//         var x = document.getElementById("location");
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }


// //Ticket Master 
//     TMqueryURL = "https://app.ticketmaster.com/discovery/v2/events?keyword=" + keyword +"&city=" + city + "&apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&keyword"
//     var keyword = $("#artistInput").val();
//     var city = $("#cityInput").val();

// function showPosition(position) {
//     var x = document.getElementById("location");
//     x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

//     var latlon = position.coords.latitude + "," + position.coords.longitude;

// //     $.ajax({
// //         type: "GET",
// //         url: TMqueryURL
// //         async: true,
// //         dataType: "json",
// //         success: function (json) {
// //             console.log(json);
// //             var e = document.getElementById("events");
// //             e.innerHTML = json.page.totalElements + " events found.";
// //             showEvents(json);
// //             initMap(position, json);
// //         },
// //         error: function (xhr, status, err) {
// //             console.log(err);
// //         }
// //     });

// // }



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


// function showEvents(json) {
//     for (var i = 0; i < json.page.size; i++) {
//         $("#events").append("<p>" + json._embedded.events[i].name + "</p>");
//     }
// }


// function initMap(position, json) {
//     var mapDiv = document.getElementById('map');
//     var map = new google.maps.Map(mapDiv, {
//         center: { lat: position.coords.latitude, lng: position.coords.longitude },
//         zoom: 10
//     });
//     for (var i = 0; i < json.page.size; i++) {
//         addMarker(map, json._embedded.events[i]);
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
//xxxx
var config = {
    apiKey: "AIzaSyC7t6-fp_6DxP74ZGUNNVxlfGkfdPksrl8",
    authDomain: "teaapitest.firebaseapp.com",
    databaseURL: "https://teaapitest.firebaseio.com",
    projectId: "teaapitest",
    storageBucket: "teaapitest.appspot.com",
    messagingSenderId: "926063267951"
};
firebase.initializeApp(config);
//xxxxxx
//initialize firebase
var database = firebase.database();
console.log("this is working")


//materialize modal function
$(document).ready(function () {
    $('.modal').modal();
});


$("#loginSubmit").on("click", function (event) {
    event.preventDefault();
    // grabs user inputs
    var userName = $("#userNameInput").val().trim();
    var userPassword = $("#userPassword").val().trim();
    //clears user inputs
    // $("#checkBoxInput").on("click", function(){
        
    //     if(this.click){
    //         console.log("checked")
    //     }
    // });

    $(".input-field").val("");

    console.log("Username: " + userName);
    console.log("Password: " + userPassword);
    //creates local "temporary" object for holding user data
    //Will push to firebase
    database.ref().push({
        userName: userName,
        userPassword: userPassword,
    })

    database.ref().on("child_added", function (snapshot) {

    })

});

$("#submitBtn").on("click", function(event){
    event.preventDefault();
    console.log("clicked");
})

$("#checkBoxInput").click(function() {
    $("#submitBtn").attr("disabled", !this.checked);
  });

//   $("#checkBoxInput").click(function() {
//     var checked_status = this.checked;
//     if (checked_status == true) {
//        $("#submitBtn").removeAttr("disabled");
//     } else {
//        $("#submitBtn").attr("disabled", "disabled");
//     }
// });



