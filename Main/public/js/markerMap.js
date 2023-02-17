let tripLocations = document.querySelectorAll('.location');
let map;
let geocoder;
let destination;
let destinationLat;
let destinationLng;

// TODO: Fetch locations from database and populate html - create buttons
// <button class="location secondary">{location}</button>
// TODO: Get map owner's username and template into title. {Usernames}'s Shared Map

//initial map 
function initMap() {
    geocoder = new google.maps.Geocoder();
    var loca = new google.maps.LatLng(45.5152, -122.6784);

    map = new google.maps.Map(document.getElementById('map'), {
        center: loca,
        zoom: 6
    });
}

// function gets usable location info from supplied location string
function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        } else {
        alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initMap);

// on window load, load all the markers for the map
window.onload = function(){
   tripLocations.forEach(location => {
       codeAddress(location.innerHTML)
   }); 
}

// on click of location button, center map and zoom in
tripLocations.forEach(location => {
    location.addEventListener('click', function () {
        let specificLocation = location.innerHTML;
        geocoder.geocode( { 'address': specificLocation}, function(results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                if (results[0].geometry.viewport) 
                    map.fitBounds(results[0].geometry.viewport);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    })
})