const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const axios = require('axios');

const files_csv = ['./Scrapping/restaurants/Clean.csv', './Scrapping/activities/Clean.csv'];
const outputFilePath = 'resultats_geocodage.csv';
const addresses = [];
const geocodingPromises = [];

const apiKey = '6748e70e5b8344639705ca7125622a68';

// Fonction pour géocoder une adresse
function geocodeAddress(address) {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        const data = response.data;
        if (data.results.length > 0) {
          const result = data.results[0];
          const coordinates = {
            lat: result.geometry.lat,
            lng: result.geometry.lng
          };
          resolve(coordinates);
        } else {
          // Adresse non trouvée, résout avec null
          resolve(null);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Lisez tous les fichiers CSV et collectez les adresses et les promesses de géocodage
files_csv.forEach((file) => {
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
      const address = row.address;
      if (address && address.trim() !== '') {
        addresses.push(address);
        geocodingPromises.push(geocodeAddress(address));
      }
    });
});

Promise.all(geocodingPromises)
  .then((coordinatesArray) => {
    console.log('Toutes les géocodes :', coordinatesArray);

    // Créez un fichier CSV avec les adresses et les géocodes correspondants
    const records = addresses.map((address, index) => {
      const geocode = coordinatesArray[index] ? coordinatesArray[index] : 'Non géocodé';
      return {
        Address: address,
        Geocode: JSON.stringify(geocode),
      };
    });

    // Créez un nouveau fichier CSV avec les résultats
    const csvWriter = createCsvWriter({
      path: outputFilePath,
      header: [
        { id: 'Address', title: 'Address' },
        { id: 'Geocode', title: 'Geocode' },
      ],
    });

    csvWriter.writeRecords(records)
      .then(() => {
        console.log('Résultats de géocodage écrits dans le fichier CSV :', records);
        console.log(`Résultats de géocodage écrits dans ${outputFilePath}`);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'écriture du fichier CSV :', error);
      });
  })
  .catch((error) => {
    console.error('Une erreur s\'est produite lors du géocodage :', error);
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
