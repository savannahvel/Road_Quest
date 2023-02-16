let map;

function initMap() {
  geocoder = new google.maps.Geocoder();
  var loca = new google.maps.LatLng(45.5152, -122.6784);

  map = new google.maps.Map(document.getElementById('map'), {
    center: loca,
    zoom: 11
  });
}

window.initMap = initMap;

google.maps.event.addDomListener(window, 'load', initMap);