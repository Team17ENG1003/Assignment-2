// Check if geolocation is on
// Creating Array for GPS co-ordinates
// Display list of recorded journeys
// Delete routes
// Make initial plot a marker
// Everything after is a polyline
// Final plot is a marker

function recordJourney(){
    // Position Array
    var posArray = [];

    // .watchPosition(success,error,options); 
    navigator.geolocation.watchPosition(function(position){
        // Save the current position into position Array
        posArray.push(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        
        var mapProp = {
            zoom:1,
            center:posArray[0],            
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("liveGoogleMap"),mapProp);

        // Create the array that will be used to fit the view to the points range and
        // place the markers to the polyline's points
        var latLngBounds = new google.maps.LatLngBounds();
        for(var i = 0; i < posArray.length; i++){
            latLngBounds.extend(posArray[i]);
            // Place the marker
            new google.maps.Marker({
              map: map,
              position: posArray[i],
              title: "Point " + (i + 1)
            });
        }
        // Creates the polyline object
        var polyline = new google.maps.Polyline({
            map: map,
            path: posArray,
            strokeColor: '#0000FF',
            strokeOpacity: 0.7,
            strokeWeight: 1
        });
        // Fix the bounds of the generated points
        map.fitBounds(latLngBounds);
    },
        function(positionError){
          $("#error").append("Error: " + positionError.message + "<br />");
        },
        {
          enableHighAccuracy: false,
          timeout: 10 * 1000 // 10 seconds
        });
};











