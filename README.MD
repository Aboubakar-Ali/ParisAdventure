# ParisProject

![image](/img.png)

# Table of content

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Compiling](#compiling)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This project helps you chose an itinerary for your trip to Paris, it will give you the best itinerary based on the time you want to spend in Paris and the places you want to visit.
<br>
It leverages the scraping of data from TripAdvisor and the Google Maps API to give you the best itinerary.

## Installation
Make sure you have installed **typescript** on your system and **npm**, then head over to ```/API``` of the project and type ```npm install```
<br>
You **need** to create a .env file and add the mongodb tokens in ```/API```
<br><br>
If you have any problems with the installation, you can open an issue in this repository.

## Usage
In ```/API``` run ```nodemon index.ts``` to run the project !
<br>
Then head over to ```/WebApp``` and open the html file in your browser.

## Compiling
In ```/API``` run ```tsc --outDir ./dist``` to compile the API, the compiled files will be in the dist folder.

## Contributing
If you want to contribute to this project you can fork this repository and make a pull request with your changes.
Anyone is welcome to contribute to this project.

## License
This project is under the MIT license.
