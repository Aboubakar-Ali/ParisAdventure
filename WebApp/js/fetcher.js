class Fetcher {
  
    constructor() {
    }

    itinerary(position, hours, price, adults) {
      return new Promise((resolve, reject) => {
          fetch(`${window.CONFIG.API_URL}/itinerary/get`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                position: position,
                hours: hours,
                price: price,
                adults: adults
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
  
  
const fetcher = new Fetcher();