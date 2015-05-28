// This example adds an animated symbol to a polyline.
var line;

function initialize() {
  // Create an array of styles.
    var styles = [
      {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#004358"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1f8a70"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1f8a70"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fd7400"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1f8a70"
                },
                {
                    "lightness": -20
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1f8a70"
                },
                {
                    "lightness": -17
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "visibility": "on"
                },
                {
                    "weight": 0.9
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1f8a70"
                },
                {
                    "lightness": -10
                }
            ]
        },
        {},
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#1f8a70"
                },
                {
                    "weight": 0.7
                }
            ]
        }
    ];

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles,
      {name: "Styled Map"});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
      center: new google.maps.LatLng(20.291, 153.027),
      zoom: 6,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.TERRAIN, 'map_style']
      }
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    var lineCoordinates = [
      new google.maps.LatLng(32.3078, -64.7505),
      new google.maps.LatLng(40.712784, -74.005941)
    ];

    // Define the symbol, using one of the predefined paths ('CIRCLE')
    // supplied by the Google Maps JavaScript API.
    var lineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeColor: '#fd7400'
    };

    // Create the polyline and add the symbol to it via the 'icons' property.
    line = new google.maps.Polyline({
      path: lineCoordinates,
      icons: [{
        icon: lineSymbol,
        offset: '100%'
      }],
      map: map
    });

    animateCircle();
}

// Use the DOM setInterval() function to change the offset of the symbol
// at fixed intervals.
function animateCircle() {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 20);
}

google.maps.event.addDomListener(window, 'load', initialize);

