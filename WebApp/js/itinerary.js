try {

    var username = "#username"
    var password = "#password"
    var button = ".submit-input"
  
    var usernameSelector = document.querySelector(`${username}`)
    var passwordSelector = document.querySelector(`${password}`)
    var buttonListener = document.querySelector(`${button}`)
  
    buttonListener.addEventListener('click', async function() {
        try {
            console.log("IN")
  
            const response = await Itinerary.itinerary(usernameSelector.value, passwordSelector.value)  
            console.log(response)
  
  
            if (response.status === 'error') {
                console.log("ERROR")
                document.querySelector('#error-login').innerHTML = response.message
                return console.log('null');
            } else {
              console.log("OK")
              localStorage.setItem('token', response.data.token);
              setTimeout(() => {
                window.location.href = '/index.html';
            }, 100) 
            }
            
            usernameSelector.value = ""
            passwordSelector.value = ""
        } catch (error) {
            console.log("IN HERE")
            console.error(error)
            document.querySelector('#error-login').innerHTML = error.message
        }
    })
  } catch (error) {
    console.error(error)
  }