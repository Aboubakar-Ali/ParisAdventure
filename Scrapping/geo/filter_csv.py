import pandas as pd

input_file = 'resultats_geocodage.csv'
output_file = 'resultats_geocodage_filtre.csv'

# Lire le fichier CSV en utilisant pandas
df = pd.read_csv(input_file, encoding='utf-8')

# Filtrer les lignes de la colonne 'Address' qui commencent et se terminent par des guillemets
df = df[~df['Geocode'].str.contains('Non g�ocod�')]
df = df[~df['Address'].str.contains('Tout afficher')]

# Sauvegarder le résultat dans un nouveau fichier CSV
df.to_csv(output_file, index=False, encoding='utf-8')