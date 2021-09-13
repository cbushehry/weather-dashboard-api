var getWeatherData = function(event) {

    event.preventDefault();

    var searchByCity = searchByCityEl.value.trim().toLowerCase();
    console.log("The selected by user is: " + searchByCity);

    if (searchByCity == "") {
        alert("Please do not leave city name blank");
        searchByCityEl.value = "";
        return 
    }

    let openWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchByCity + "&appid=32a27c42260b02de3ba5e1466def4861&units=imperial";
    console.log(openWeatherApiUrl);
    

    let citiesLocalStorage = JSON.parse(localStorage.getItem("savedCities"));

    let cityExist = 0;


    if (citiesLocalStorage === null) {
        citiesSearched =  new Array();
        console.log("new array craeted");
        
    } else { // Assign the localStorage values to new (array), not a reference
        citiesSearched = citiesLocalStorage;
        console.log("Values from local Storage are: " + citiesSearched);
    };


    fetch(openWeatherApiUrl).then(function(response) {

        if(response.ok) { 

            
                response.json().then(function(jsonData) {
                console.log("json city returned is: " + jsonData.name); 
                
                getDate(jsonData.dt);
                jsonData.weather[0].icon;
                console.log(jsonData.weather[0].icon); 
                let tempImperial = jsonData.main.temp
               console.log("Temperature:" + tempImperial + " °F");
                let humidity = jsonData.main.humidity + "%"
                console.log(humidity);
                let metersPerSecSpeed = jsonData.wind.speed
                let mphWindSpeed = Math.round(metersPerSecSpeed * 2.237) + " MPH"; 
                console.log(mphWindSpeed);
        
                let latNum = jsonData.coord.lat;
                let lonNum = jsonData.coord.lon;
                
                console.log("latitude" + latNum);
                console.log("longitud" + lonNum);
           
                getUVNumber(latNum, lonNum); 
                getFiveDayForcast(latNum, lonNum);

                for (i=0; i < citiesSearched.length; i++) {
                    if (searchByCity === citiesSearched[i].toLowerCase()) {
                        console.log("city " + citiesSearched[i] + "already exist in array")
                        cityExist =1
                        break;
                    } 
                }

                if (cityExist === 0) {
                    alert("city has been pushed" + ( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) ));
                    citiesSearched.push( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) ) ;
                    localStorage.setItem("savedCities", JSON.stringify(citiesSearched));
                }

                populateSavedCities(); 

            })
       
        } else { 
            window.alert("Error: " + response.statusText + "\nPlease re-enter a valid city");
            searchByCityEl.value = "";
            return;
        }
    }).catch(function(error) { 
        alert("Unable to connect to OpenWeather");
        return;
      });

};