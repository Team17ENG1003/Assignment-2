// Check if geolocation is on
// Creating Array for GPS co-ordinates
// Display list of recorded journeys
// Delete routes
// Make initial plot a marker
// Everything after is a polyline
// Final plot is a marker


// Save Array to local Storage
// Retrieve Array from local Storage
// Delete list if needed

var posArray=[];
var id;
var journeyCount;
var key;

function recordJourney(){
    // .watchPosition(success,error,options); 
     id = navigator.geolocation.watchPosition(function(position){
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
        }
        // Place Marker at first position
        new google.maps.Marker({
              map: map,
              position: posArray[0],
              title: "Point " + 1
            });
        // Place Marker at last position
        new google.maps.Marker({
              map: map,
              position: posArray[posArray.length-1],
              title: "Point " + (posArray.length + 1)
            });
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
         console.log("LOCATION ERROR");         document.getElementById("recordImg").src="images/stop_icon.png"
         alert("GPS error. Refresh to try again.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10 * 1000 // 10 seconds
        });
};

function stop(){
    // stop watchPosition
    navigator.geolocation.clearWatch(id);
    // stop counters
    
    // Retrieve object variables    
    var localJCount
    var date = document.getElementById("currentDate").innerHTML;
    
    // Create unique journey Object
    var runObject ={
        path: posArray.toString(),
        date: date,
        // Add other objects
        // - Run Type
        // - Distance
        // - Average Speed
        // - Duration
        // - Title
        // - Date
    }
    // Store journey Object to localStorage
    journeyCount = localStorage.numberOfJourneys
    journeyCount++
    key = 'runJourney' + journeyCount
    localStorage[key] = JSON.stringify(runObject);
    localStorage['numberOfJourneys'] = journeyCount;
    
    // Delete Array
    posArray=[];
}

function recordStart(){
    // Start map recording
    recordJourney();
    // Change button onclick attribute
    document.getElementById("recordButton").onclick= function(){recordStop()};
    // Change button image
    document.getElementById("recordImg").src="images/pause_icon.png";
    // Test
    console.log("Recording");
}

function recordStop(){
    // Stop map recording
    stop();
    // Change button onclick attribute
    document.getElementById("recordButton").onclick= function(){recordStart()};
    // Change button image
    document.getElementById("recordImg").src="images/play_icon.png";
    // Test
    console.log("Stopping & Saved to storage");
}

function initialStorageData(){
    var journeyCount = 0;
    var key = 'run' + journeyCount;
    localStorage['numberOfJourneys'] = journeyCount;
}


// Change date of Run
var date;
var date2String;
var currentDate;

currentDate = document.getElementById("currentDate");

    Date.prototype.ddmmyyyy = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return (dd[1]?dd:"0"+dd[0]) + (mm[1]?mm:"0"+mm[0]) + yyyy; // padding
  };

    d = new Date();
    date = d.ddmmyyyy();

// Change document date to current date.
 currentDate.innerHTML =  date[0]+date[1]+"/"+date[2]+date[3]+"/"+date[6]+date[7];

// for the purpose of clearing local storage
function clearAll(){
    localStorage.clear();
    initialStorageData();
}

