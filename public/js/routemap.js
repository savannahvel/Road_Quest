var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initMap() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var portland = new google.maps.LatLng(45.512794, -122.676483);
  var mapOptions = {
    zoom: 6,
    center: portland
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
   console.log(start, end);
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');
  console.log(checkboxArray)
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected == true) {
      waypts.push({
          location:checkboxArray[i].value,
          stopover:true});
    }
  }


  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions_panel');
      summaryPanel.innerHTML = '';
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    }
  });
}

async function saveRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  let userId = document.querySelector('#user-id').value;
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected == true) {
      waypts.push({
          location:checkboxArray[i].value,
          stopover:true});
    }
  }

  let tripName = document.getElementById('trip-name').value;
  createTrip(tripName, start, end, userId).then((data) => {
    createMarkers(data.id, waypts)
  })
}

async function createTrip(tripName, startPoint, endPoint, userId) {

  const tripsBody = {
      "trip_name": tripName,
      "is_shared": true,
      "start_point": startPoint,
      "end_point": endPoint,
      "is_active": true,
      "primary_owner": userId,
    }
  
  const postTrip = await fetch('/trips', {
    method: 'POST',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tripsBody)
  });

  return postTrip.json();
}

async function createMarkers(tripId, locationArray) {
  locationArray.forEach(async location => {
    const markersBody = {
      "trip_id": tripId,
      "location": location.location,
    };

    const postMarker = await fetch('/markers', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(markersBody)
    });

    return postMarker.json();
  });
}
  
google.maps.event.addDomListener(window, 'load', initMap);
