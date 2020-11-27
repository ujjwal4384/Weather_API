window.addEventListener("load", () => {
    let long;
    let lati;

    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lati = position.coords.latitude;


            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=850f7e2106d6085794193f60265cff7b`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    //SET DOM elements from the api
                    temperatureDegree.textContent = data.main.temp - 273.15; //in celsius
                    temperatureDescription.textContent = data.weather[0].description;
                    locationTimezone.textContent = data.timezone;
                    //conversion formula
                    let farhen = (((9 / 5) * (data.main.temp - 273.15)) + (32));
                    // const icon = PARTLY_CLOUDY_DAY;
                    //    setIcons(PARTLY_CLOUDY_NIGHT, document.querySelector('.icon'));
                    //changeTemp
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "C") {
                            temperatureDegree.textContent = Math.floor(farhen);
                            temperatureSpan.textContent = "F";

                        } else {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = data.main.temp - 273.15; //in celsius


                        }


                    });
                });

        });



    

   


    /* function setIcons(icon, iconID) {
         console.log("holaa");
         const skycons = new Skycons({ color: "white" });
         //const currentIcon = icon.replace(/-/g, "_").toUpperCase();
         skycons.play();
         return skycons.set(iconID, Skycons.icon);
     }*/
});