import csv
import requests
import json

# Liste des fichiers CSV à traiter
files_csv = ['./Scrapping/restaurants/Clean.csv', './Scrapping/activities/Clean.csv', './Scrapping/activities/activitis_sans_doublons.csv']

# Clé d'API OpenCage Data
api_key = '6748e70e5b8344639705ca7125622a68'

# Chemin du fichier de sortie
output_file = 'resultats_geocodage.csv'

addresses = []
geocoding_results = []

# Fonction pour géocoder une adresse
def geocode_address(address):
    encoded_address = address.replace(" ", "+")
    url = f'https://api.opencagedata.com/geocode/v1/json?q={encoded_address}&key={api_key}'

    try:
        response = requests.get(url)
        data = response.json()
        if 'results' in data and len(data['results']) > 0:
            result = data['results'][0]
            coordinates = result['geometry']
            return coordinates
        else:
            return None
    except Exception as e:
        return str(e)

# Parcourir les fichiers CSV et collecter les adresses
for file in files_csv:
    with open(file, 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            address = row['address']
            if address.strip():
                addresses.append(address)
                geocoding_results.append(geocode_address(address))

# Créer un fichier CSV avec les résultats
with open(output_file, 'w', newline='') as csv_file:
    fieldnames = ['Address', 'Geocode']
    csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    csv_writer.writeheader()
    
    for i in range(len(addresses)):
        address = addresses[i]
        geocode = geocoding_results[i]
        csv_writer.writerow({'Address': address, 'Geocode': json.dumps(geocode) if geocode else 'Non géocodé'})

print('Résultats de géocodage écrits dans le fichier CSV :', output_file)