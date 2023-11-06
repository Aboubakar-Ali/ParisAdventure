try {

    var position = "#position"
    var hours = "#hours"
    var price = "#price"
    var adults = "#adults"
    var button = ".submit-btn"
  
    var positionSelector = document.querySelector(`${position}`)
    var hoursSelector = document.querySelector(`${hours}`)
    var priceSelector = document.querySelector(`${price}`)
    var adultsSelector = document.querySelector(`${adults}`)
    var buttonListener = document.querySelector(`${button}`)
  
    buttonListener.addEventListener('click', async function() {
        try {
            console.log("IN")

            // console.log(positionSelector.value, hoursSelector.value, priceSelector.value, adultsSelector.value)

            const response = await fetcher.itinerary(["latitude", "longitude"], hoursSelector.value, priceSelector.value, adultsSelector.value);
  
            if (response.status === 'error') {
                console.log("ERROR")
                return console.log('null');
            } else {
              console.log("OK")
              console.log(response)

              //hide class booking-cta
              document.querySelector('.booking-cta').style.display = "none"
              //display class map-container
              document.querySelector('.map-container').style.display = "block"

              const address1 = response.bestItinerary[0].address
              const address2 = response.bestItinerary[1].address
              const depart = document.getElementById('depart').value

              var userPos = {lat: 48.856614, lng: 2.3522219}
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setCenter(userPos);
                }, function() {
                    handleLocationError(true, map.getCenter());
                });
              } else {
                  // Le navigateur ne supporte pas la géolocalisation
                  handleLocationError(false, map.getCenter());
              }

              // add itinerary to map
              calculateAndDisplayRoute(address1, address2, depart, userPos);
            }
            
            positionSelector.value = ""
            hoursSelector.value = ""
            priceSelector.value = ""
            adultsSelector.value = ""
        } catch (error) {
            console.log("IN HERE")
            console.error(error)
        }
    })
  } catch (error) {
    console.error(error)
  }