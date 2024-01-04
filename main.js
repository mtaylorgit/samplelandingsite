//function to convert degrees, doesn't need to be inside the handler
function celsiusToFahr(temperature) {
    let fahr = (temperature * (9/5)) + 32
    return fahr;
}
//Greeting Section

function greetingHandler() {


    let currentHour = new Date().getHours();
    
    let greetingText;
    if (currentHour <12) {
        greetingText = "Good morning!";
    } else if (currentHour < 19) {
        greetingText = "Good afternoon!";
    } else if (currentHour < 24) {
        greetingText = "Good evening!";
    } else {
        greetingText = "Welcome!";
    }
    
    //Weather Text
    
    // Fetch method for using API for weather at location, I'm placing it in greeting handler
    navigator.geolocation.getCurrentPosition(function(position){
    
        const latitude = position.coords.latitude;
        
        const longitude = position.coords.longitude;
     
        console.log(latitude);
        console.log(longitude);
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
        console.log(url);
    
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data); //<--helps to get the actual object
            const temperature = data.current.temperature_2m;
            console.log(temperature);//<--gets actual temperature, no location or condition because using another free API
    
           
            
        //TEMPERATURE CHANGE 
        document.querySelector(".weather-group").addEventListener("click", function(e) {
       
        if (e.target.id == "celsius") {
            document.querySelector("p#weather").innerHTML = celsiusText;
        } else if (e.target.id == "fahr") {
            document.querySelector("p#weather").innerHTML = farenheitText;
        }
        });
        
    
        let celsiusText = `It is ${temperature.toFixed(1)} °C outside.`;//can also use temperature.toString()
        let farenheitText = `It is ${celsiusToFahr(temperature).toFixed(1)} °F outside.`;//can also use temperature.toString()
    
    
    
        //send the values to the HTML elements!
        document.querySelector("#greeting").innerHTML = greetingText;
        document.querySelector("p#weather").innerHTML = celsiusText;
        
    }).catch((error => {
        document.querySelector("p#weather").innerHTML = "Unable to get the weather information. Try again later.";//test this by typing undefined for temperature const
    }));
    
    });
    }

    function clockHandler() {
        setInterval(function(){
            let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
        },1000); //every second gets the time every second updated
        }
    
    //Page Load
    greetingHandler();
    clockHandler();