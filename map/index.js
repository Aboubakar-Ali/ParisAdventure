var map = L.map('map').setView([48.8566, 2.3522], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

var routingControl;

async function getRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;

  if (start && end) {
    try {
      const startCoords = await getCoordinates(start);
      const endCoords = await getCoordinates(end);

      if (routingControl) {
        map.removeControl(routingControl);
      }

      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(startCoords.lat, startCoords.lng),
          L.latLng(endCoords.lat, endCoords.lng)
        ],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim(),
        show: true,
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        // Remplacez OSRMv1 par GraphHopper
        router: new L.Routing.GraphHopper('c340ff43-10cb-430e-9210-d3a7eb663156', {
          serviceUrl: 'https://graphhopper.com/api/1/route',
          profile: 'car', // ou 'bike', 'foot', etc.
          // d'autres options pour GraphHopper peuvent être configurées ici
        }),
      }).addTo(map);

      routingControl.on('routesfound', function (e) {
        var routes = e.routes;
        var summary = routes[0].summary;
        // Traitez les routes ici si nécessaire
        // ...
      });

    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la récupération de l\'itinéraire.');
    }
  } else {
    alert('Veuillez entrer les deux adresses.');
  }
}

function getCoordinates(address) {
  return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      } else {
        throw new Error('Adresse non trouvée');
      }
    });
}

// Vous pouvez ajouter ici des éléments d'interface utilisateur pour recueillir l'adresse de départ et de destination.
// Par exemple, des champs de saisie et un bouton pour déclencher la fonction getRoute.




// Assurez-vous d'inclure tout autre fonctionnalité ou gestion des erreurs dont vous avez besoin ici.


// Make sure to include any additional functionality or error handling you need.



// ça marche mais ça m'affiche que la carte, ce que je veux est que je récupere l'adresse du user et lui demander de mettre l'adresse ou il veux aller ainsi je lui propose un itineraire 5b3ce3597851110001cf62480ef973bc48364a53bb755052be8e0fba