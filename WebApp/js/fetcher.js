class Hackaton {
  
    constructor() {
    }
  
    login(username, password) {
      return new Promise((resolve, reject) => {
          fetch(`${window.CONFIG.API_URL}/itinerary`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            }),
        }).then((response) => {
            response.json().then((data) => {
              if (response.status === 200) {
                resolve(data);
              } else {
                reject(data);
              }
            });
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
  }
  
  
  const hackaton = new Hackaton();