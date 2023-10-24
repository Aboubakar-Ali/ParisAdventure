try {

    var button = ".submit-input"
    var div = ".main-form"
    
    // var buttonListener = document.querySelector(`${button}`)
    var divListener = document.querySelector(`${div}`)
  
    divListener.addEventListener('click', async function() {
        try {
            console.log("IN")

            divListener.style.display = "none"
        } catch (error) {
            console.error(error)
        }
    })
  } catch (error) {
    console.error(error)
  }