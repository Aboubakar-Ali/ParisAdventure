const fs = require('fs');
const csv = require('csv-parser');

const apiKey = 'YOUR_API_KEY';
const addresses = [];

fs.createReadStream('*.csv') // Remplacez 'votre_fichier.csv' par le chemin de votre fichier CSVs
  .pipe(csv())
  .on('data', (row) => {
    // Assurez-vous que le nom de la colonne contenant les adresses est correct, par exemple, 'adresse' ici
    const address = row.adresse; // Remplacez 'adresse' par le nom de la colonne dans votre fichier CSV
    if (address) {
      addresses.push(address);
    }
  })
  .on('end', () => {
    console.log('Adresses extraites :', addresses);
    // À ce stade, vous pouvez utiliser le tableau 'addresses' pour géocoder les adresses comme indiqué dans l'exemple précédent.
  });


// Exemple de boucle pour géocoder chaque adresse
Promise.all(addresses.map(geocodeAddress))
  .then(coordinatesArray => {
    // Vous pouvez maintenant utiliser les coordonnées géocodées
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
