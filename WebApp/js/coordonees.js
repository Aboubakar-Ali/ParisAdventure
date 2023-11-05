const fs = require('fs');
const csv = require('csv-parser');

// const apiKey = 'YOUR_API_KEY';
const addresses = [];

const files_csv = ['./Scrapping/activities/activities.csv','./Scrapping/hotels/hotels.csv','./Scrapping/restaurants/restaurants.csv','./Scrapping/restaurants/Clean.csv','./Scrapping/activities/Clean.csv'];

fs.createReadStream(files_csv) // Remplacez 'votre_fichier.csv' par le chemin de votre fichier CSVs
  .pipe(csv())
  .on('data', (row) => {
    const address = [row.address,row.ADRESSE,row.adress,row.Adress];
    if (address) {
      addresses.push(address);
    }
  })
  .on('end', () => {
    console.log('Adresses extraites :', addresses);
  });


Promise.all(addresses.map(geocodeAddress))
  .then(coordinatesArray => {
    console.log(coordinatesArray);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la géocodage :', error);
  });

// const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

// // Effectuer une requête HTTP pour récupérer les données de géocodage
// fetch(geocodeUrl)
//   .then(response => response.json())
//   .then(data => {
//     if (data.status === 'OK' && data.results.length > 0) {
//       const location = data.results[0].geometry.location;
//       const latitude = location.lat;
//       const longitude = location.lng;
//       console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//     } else {
//       console.error('Impossible de géocoder cette adresse.');
//     }
//   })
//   .catch(error => {
//     console.error('Une erreur s\'est produite lors de la récupération des coordonnées GPS :', error);
//   });
