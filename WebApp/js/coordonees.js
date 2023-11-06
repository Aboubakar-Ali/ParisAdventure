const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const opencage = require('opencage-api-client');

const files_csv = ['./Scrapping/restaurants/Clean.csv', './Scrapping/activities/Clean.csv'];
const outputFilePath = 'resultats_geocodage.csv'; // Spécifiez le chemin du nouveau fichier de résultats
const addresses = [];
const geocodingPromises = [];

const apiKey = '6748e70e5b8344639705ca7125622a68';

// Fonction pour géocoder une adresse
function geocodeAddress(address) {
  return new Promise((resolve, reject) => {
    opencage.geocode({ q: address, key: apiKey })
      .then(data => {
        if (data.results.length > 0) {
          const result = data.results[0];
          const coordinates = {
            lat: result.geometry.lat,
            lng: result.geometry.lng
          };
          resolve(coordinates);
        } else {
          reject('Adresse non trouvée pour : ' + address); // Ajout de l'adresse à l'erreur
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
      const address = row.address; // Utilisez directement la valeur de l'adresse
      if (address && address.trim() !== '') {
        // console.log('Adresse avant géocodage :', address);
        addresses.push(address);
        geocodingPromises.push(geocodeAddress(address));
      }
    });
});

Promise.all(geocodingPromises)
  .then((coordinatesArray) => {
    console.log(coordinatesArray);

    // Créez un tableau de résultats contenant les adresses et les géocodes correspondants
    const results = addresses.map((address, index) => ({
      Address: address,
      Geocode: coordinatesArray[index],
    }));

    results.forEach((result) => {
      console.log(`Adresse géocodée : ${result.Address}, Geocode : ${JSON.stringify(result.Geocode)}`);
    });

    // Créez un nouveau fichier CSV avec les résultats
    const csvWriter = createCsvWriter({
      path: outputFilePath,
      header: [
        { id: 'Address', title: 'Address' },
        { id: 'Geocode', title: 'Geocode' },
      ],
    });

    csvWriter.writeRecords(results)
      .then(() => {
        console.log('Résultats de géocodage écrits dans le fichier CSV :', results);
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
