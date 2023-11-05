let map;
let directionsService;
let directionsRenderer1; // Pour le premier trajet
let directionsRenderer2; // Pour le deuxième trajet
let userPosition; // Variable globale pour stocker la position de l'utilisateur

// Fonction d'initialisation de la carte appelée par l'API Google Maps
function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer1 = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: 'blue' } });
    directionsRenderer2 = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: 'green' } });

    const mapOptions = {
        zoom: 7,
        center: { lat: 48.8566, lng: 2.3522 } // Coordonnées de Paris
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer1.setMap(map);
    directionsRenderer2.setMap(map);

    directionsRenderer1.setPanel(document.getElementById('directions-panel-1'));
    directionsRenderer2.setPanel(document.getElementById('directions-panel-2'));

    var endInput = document.getElementById('end');
    var autocompleteEnd = new google.maps.places.Autocomplete(endInput);

    document.getElementById('submit').addEventListener('click', function() {
        calculateAndDisplayRoute();
    });

    // Récupère la position actuelle de l'utilisateur
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(userPosition);
        }, function() {
            handleLocationError(true, map.getCenter());
        });
    } else {
        // Le navigateur ne supporte pas la géolocalisation
        handleLocationError(false, map.getCenter());
    }
}
function calculateAndDisplayRoute() {
    var start = userPosition; // Utilisez la position de l'utilisateur comme point de départ
    var via = document.getElementById('via').value;
    var end = document.getElementById('end').value;
    var departureTime1 = new Date();
    var departureTime2 = new Date();

    if (document.getElementById('departureTime1').value) {
        departureTime1.setHours(document.getElementById('departureTime1').value.split(":")[0]);
        departureTime1.setMinutes(document.getElementById('departureTime1').value.split(":")[1]);
    }

    if (document.getElementById('departureTime2').value) {
        departureTime2.setHours(document.getElementById('departureTime2').value.split(":")[0]);
        departureTime2.setMinutes(document.getElementById('departureTime2').value.split(":")[1]);
    }

    // Premier trajet
    directionsService.route({
        origin: start,
        destination: via,
        travelMode: 'TRANSIT',
        transitOptions: {
            departureTime: departureTime1
        }
    }, function(response, status) {
        if (status === 'OK') {
            directionsRenderer1.setDirections(response);
        } else {
            window.alert('First directions request failed due to ' + status);
        }
    });

    // Deuxième trajet
    directionsService.route({
        origin: via,
        destination: end,
        travelMode: 'TRANSIT',
        transitOptions: {
            departureTime: departureTime2
        }
    }, function(response, status) {
        if (status === 'OK') {
            directionsRenderer2.setDirections(response);
        } else {
            window.alert('Second directions request failed due to ' + status);
        }
    });
}

// Assurez-vous d'inclure la balise de script pour l'API Google Maps avec votre clé API dans votre HTML, et de l'appeler après votre code JavaScript pour initialiser la carte.
