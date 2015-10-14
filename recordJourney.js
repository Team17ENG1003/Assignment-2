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
var posArray2=[];
var id;
var journeyCount;
var key;
var lat;
var long;
var distance;
var runName;

function recordJourney(){
    // .watchPosition(success,error,options); 
     id = navigator.geolocation.watchPosition(function(position){
        var newLat;
        var newLong;
         
        newLat = position.coords.latitude;
        newLong = position.coords.longitude;
        
         
        if ((Math.round(newLat*10000) != Math.round(lat*10000))||(Math.round(newLong*10000) != Math.round(long*10000))){ //10000
            lat = newLat
            document.getElementById("liveSpeed").innerHTML = lat;
            console.log(lat);
            long=newLong;
            document.getElementById("liveTime").innerHTML = long;
            console.log(long);
            
            
            // Save the current position into position Array

            posArray.push(new google.maps.LatLng(lat, long));
            posArray2.push({lat: lat,lng: long});

            var mapProp = {
                zoom:1,
                center:posArray[0],            
                mapTypeControl: false,
                streetViewControl: false, mapTypeId:google.maps.MapTypeId.ROADMAP
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
            
            getDistance();
        }
        else{
            console.log("no change");
        }
    },
        function(positionError){
         console.log("LOCATION ERROR");         document.getElementById("recordImg").src="images/stop_icon.png"
         alert("GPS error. Refresh to try again.");
        },
        {
          enableHighAccuracy: true,
          timeout: 15 * 1000 // 10 seconds
        });
};

function stop(){
    // stop counters
    
    // Retrieve object variables
    var date = document.getElementById("currentDate").innerHTML;
    
    // Create unique journey Object
    var runObject ={
        path: posArray,
        path2: posArray2,
        date: date,
        distance: distance,
        title: runName
        // Add other objects
        // - Run Type
        // - Average Speed
        // - Duration
    }
    // Store journey Object to localStorage
    journeyCount = localStorage.numberOfJourneys
    journeyCount++
    key = 'runJourney' + journeyCount
    localStorage[key] = JSON.stringify(runObject);
    localStorage['numberOfJourneys'] = journeyCount;
}

function recordStart(){
    // Start map recording
    recordJourney();
    // Change button onclick attribute
    document.getElementById("recordButton").onclick= function(){recordPause()};
    // Change button image
    document.getElementById("recordImg").src="images/pause_icon.png";
    // Test
    console.log("Recording");
}

function recordPause(){
    // Stop map recording
    // stop watchPosition
    navigator.geolocation.clearWatch(id);
    // Change button onclick attribute
    document.getElementById("recordButton").onclick= function(){recordStart()};
    // Change button image
    document.getElementById("recordImg").src="images/play_icon.png";
    // Test
    console.log("Paused Run");
}

function initialStorageData(){
    var journeyCount = 0;
    var key = 'run' + journeyCount;
    localStorage['numberOfJourneys'] = journeyCount;
    
    getDistance();
    changeDate();
    
    // Save current position    
    navigator.geolocation.getCurrentPosition(function showPosition(position){
        lat = position.coords.latitude;
        long = position.coords.longitude;
        posArray.push(new google.maps.LatLng(lat, long));
        posArray2.push({lat: lat,lng: long});
        var mapProp = {
            zoom:18,
            center:{lat: lat, lng: long},            
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId:google.maps.MapTypeId.ROADMAP
    };
        var map=new google.maps.Map(document.getElementById("liveGoogleMap"),mapProp);
        // add marker of current ocation
        new google.maps.Marker({
            map: map,
            position: posArray[0],
            title: 'Start'
        });
    });    
}


// Change date of Run
function changeDate(){
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
}



// for the purpose of clearing local storage
function clearAll(){
    localStorage.clear();
    initialStorageData();
}


// Calculate distance travelled using position array
// distance formula: http://stackoverflow.com/a/27943

function getDistance(){  
    
    if (posArray2.length<2){
        distance=0;
    }
    else{
        for (var i = 0; i < posArray2.length-1; i++){
            distance = distance + getDistanceFromLatLonInKm(posArray2[i].lat,posArray2[i].lng,posArray2[i+1].lat,posArray2[i+1].lng);
        }
    }
    
    if (distance<1){
    document.getElementById("liveDistance").innerHTML = (distance*1000).toFixed(2)+" m";
    }
    else{
    document.getElementById("liveDistance").innerHTML = distance.toFixed(2)+" km"
    }
    
        function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2-lat1);  // deg2rad below
          var dLon = deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          return d;
        }

        function deg2rad(deg) {
          return deg * (Math.PI/180)
        }
}

// onkeypress function for Journey Name
// Stops the run and saves it to storage
function handle(e){
        if(e.keyCode === 13){
            var k = document.getElementById("newRunName").value;
            runName = k;
            recordPause();
            stop();
            window.location.href="view.html";
        }

        return false;
}
