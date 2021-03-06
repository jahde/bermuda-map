// This example adds an animated symbol to a polyline.
$(document).ready(function(){
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
      center: new google.maps.LatLng(32.3078, -64.7505),
      zoom: 5,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.TERRAIN, 'map_style']
      }
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    // button effect to map new stuff

    var from_loc = [];
    var to_loc = [];

    $('button').click(function(){
        var from = $('#from').val();
        var to = $('#to').val();

        var url_from = "https://maps.googleapis.com/maps/api/geocode/json?address="+from+"&key=AIzaSyAIAT5ptZVJqiFiTQZxAXp6KT8jREfKidU";
        var url_to = "https://maps.googleapis.com/maps/api/geocode/json?address="+to+"&key=AIzaSyAIAT5ptZVJqiFiTQZxAXp6KT8jREfKidU";

        $.getJSON(url_from,function(data){
            from_loc.push(data["results"][0]["geometry"]["location"]["lat"]);
            from_loc.push(data["results"][0]["geometry"]["location"]["lng"]);
        })

        $.getJSON(url_to,function(data){
            to_loc.push(data["results"][0]["geometry"]["location"]["lat"]);
            to_loc.push(data["results"][0]["geometry"]["location"]["lng"]);
        })

        var lineCoordinates = [
          new google.maps.LatLng(from_loc[0],from_loc[1]),
          new google.maps.LatLng(to_loc[0],to_loc[1])
        ];

        var lineCoordinates = [
            new google.maps.LatLng(from_loc[0],from_loc[1]),
            new google.maps.LatLng(to_loc[0],to_loc[1])
        ];

        // Define the symbol, using one of the predefined paths ('CIRCLE')
        // supplied by the Google Maps JavaScript API.
        var lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
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

    });
}

// // Use the DOM setInterval() function to change the offset of the symbol
// // at fixed intervals.
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



});
