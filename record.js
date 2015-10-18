<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8">
	<title>Eng1003 Workshop Code Week 03</title>
	<style>
		#outputArea{
			padding: .25em;
			border: solid black 2px;
			margin: 2em;
			margin-bottom: 1em;
			
			height: 20em;
			width: 40em;
			
			overflow-y: scroll;
			
			font-family: arial "sans serif";
			font-size: 1em;
			color: rgb(50, 50, 250);
			
			background-color: rgb(225,225,225) ;
		}
		
		button, input{
			margin-top: 1em;
			margin-left: 3em;
			width: 25em;
		}
        
	</style>
</head>

    
<body>
    <!-- 	-->
       
    <div id="outputArea"></div>
    
    <div>
        <button onClick="start()">Start</button>				
    </div>
    <div>
        <button onClick="stop()">Finish</button>
    </div>		

    <script>
    
    var outputArea = document.getElementById("outputArea");
    var outString = "";
    outputArea.innerHTML = outString; //clear the output area
    
    //hr + ":" min + ":" + sec + ":" + ms
    
function start(){


   var ms = 0;
    var sec = 0;
    var min = 0;
    var hr = 0;
    var begin = Date.now();
    
    function counting(){
    var current = Date.now();
    ms = current - begin;
    
	    if (ms >= 1000){
        sec = sec + 1;
        ms = 0;
		begin = Date.now();
			console.log(sec);
    }
    
    if (sec === 60){
        min = min + 1;
        sec = 0;
    }
    
    if (min === 60){
        hr = hr + 1;
        min = 0;
    }
    
    if (hr === 100){
        clearInterval(timing);
    }

    outputArea.innerHTML = hr + ":" + min + ":" + sec + ":" + ms;
        
}

this.timing = setInterval(counting, 10);
    
}

function stop(){
    clearInterval(timing);
}
    
function clear(){
    var saveObj = {
	   name: "Empty Set",
	   saveSet: [],
        hr: 0,
        min: 0,
        sec: 0,
        ms: 0
	}
	
    testSetObjPDO = {
	   name: "Empty Set",
        saveSet: [],
        hr: 0,
        min: 0,
        sec: 0,
        ms: 0
    }				
			
}

function save(){
    var runName = prompt("Name of Run:","")
    this.saveKey;
    this.saveKeyPDO;
    this.saveObj = {
        name: runName,
        hr: hr,
        min: min,
        sec: sec,
        ms: ms,
        saveSet: []
    }
    this.saveObjPDO = {
        name: runName,
        hr: hr,
        min: min,
        sec: sec,
        ms: ms,
        saveSet: []
    }
    if(typeof(storage) !== undefined){
    saveKey = testSetObj.name.replace(/ /g, "-"); 				//replace space (/ /) with hyphen globally (g) i.e. all occurrences of space are replaced with a hyphen
					saveKeyPDO = saveObjPDO.name.replace(/ /g, "-"); 
					
					localStorage.setItem(saveKey, JSON.stringify(saveObj));
					localStorage.setItem(saveKeyPDO, JSON.stringify(saveObjPDO));					
				}
    else{
            console.log("localStorage is not supported by current browser.");
				}			
}

</script>
</body>

</html>





<!-- //Alternate start function

function startalt(){

   var ms = 0;
    var sec = 0;
    var min = 0;
    var hr = 0;
    
    function counting(){
    ms = ms + 10;
        
    
   if (ms === 1000){
        sec = sec + 1;
        ms = 0;
	   console.log(ms)
    }
    
    if (sec === 60){
        min = min + 1;
        sec = 0;
    }
    
    if (min === 60){
        hr = hr + 1;
        min = 0;
    }
    
    if (hr === 100){
        clearInterval(timing);
    }
}
var timing = setInterval(counting, 10);
}

//Potentially helpful function

function Retrieving from local storage(){
				var saveSetName = saveSetNameInput.value; 
				var saveSetPDOName = saveSetPDONameInput.value; 
				
				if (typeof(Storage) !== "undefined"){
					saveKey = saveSetName.replace(/ /g, "-"); 				//replace space (/ /) with hyphen globally (g) i.e. all occurrences of space are replaced with a hyphen
					saveKeyPDO = saveSetPDOName.replace(/ /g, "-"); 
				
					saveSetObj = JSON.parse(localStorage.getItem(saveKey));
					saveSetObjPDO = JSON.parse(localStorage.getItem(saveKeyPDO));
										
					saveSetObj2 = {
						name: saveSetObjPDO.name,
						saveSet: []
					};
					
					saveSetObj2.name = saveSetObjPDO.name;
					for (var i = 1; i <= SAVE_SET_SIZE; i++){
						saveSetObj2.saveSet[i] = ???
				}
				else{
					console.log("localStorage is not supported by current browser.");
				}				
			


*/-->