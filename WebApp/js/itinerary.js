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

            //hide class booking-cta
            document.querySelector('.booking-cta').style.display = "none"

            //display a google map 
            // document.querySelector('#map').style.display = "block"
  
            const response = await fetcher.itinerary(positionSelector.value, hoursSelector.value, priceSelector.value, adultsSelector.value);
  
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
            document.querySelector('#error-login').innerHTML = error.message
        }
    })
  } catch (error) {
    console.error(error)
  }