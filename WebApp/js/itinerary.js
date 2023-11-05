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

            //hide class booking-cta
            document.querySelector('.booking-cta').style.display = "none"

            //display a google map 
            // document.querySelector('#map').style.display = "block"

            //get coordinates from address
            var geocoder = new google.maps.Geocoder();
            var address = positionSelector.value;
            var latitude;
            var longitude;

            geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                jQuery('#coordinates').val(latitude+', '+longitude);
                } 
            });
  
            console.log("LATITUDE: ", latitude, "LONGITUDE: ", longitude)

            const response = await fetcher.itinerary([latitude, longitude], hoursSelector.value, priceSelector.value, adultsSelector.value);
  
            if (response.status === 'error') {
                console.log("ERROR")
                return console.log('null');
            } else {
              console.log("OK")
              console.log(response)
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