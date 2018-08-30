require("dotenv").config();
var keys = require('./keys.js');

// console.log(keys)


var inquirer = require('inquirer');

inquirer
    .prompt([

        {
            type: "checkbox",
            name: "question1",
            message: "Please choose One.",
            choices: ['Songs', 'Concerts', 'Movie'],
        }
    ]).then(function (response) {
        var answer = response.question1.join('')
    
        if (answer === 'Songs') {
            runSpotify();
        } else if (answer === 'Concerts') {
            runBandsintown();
        } else if (answer === 'Movie') {
            runMovie()
        }
    })


// ++++++++++++++++++BANDSINTOWN+++++++++++++++++++++++++++++

function runBandsintown() {

    var bandsintown = require('bandsintown')(keys.bandsintown.bandsintownApi);

    inquirer
        .prompt([

            {
                type: "input",
                name: "bandName",
                message: "Which band?"
            }
        ]).then(function (artist) {
            bands = artist.bandName;

            bandsintown
                .getArtistEventList(bands)
                .then(function (events) {
                    for (i = 0; i < events.length; i++) {

                        console.log('Artist Name: ' + bands)
                        console.log('Venue Name: ' + events[i].venue.name)
                        console.log('Venue Location: ' + events[i].formatted_location)
                        console.log('Date of Event: ' + events[i].formatted_datetime)
                        console.log('\n')
                    }

                });
        })
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++++SPOTIFY++++++++++++++++++++++++

function runSpotify() {

    var Spotify = require('node-spotify-api');

    inquirer
        .prompt([

            {
                type: "input",
                name: "song",
                message: "What song?"
            }
        ]).then(function (response) {
            var song = response.song;
            if (response.song === '' || !response.song) {
                song = "The Sign";
            }
            var spotify = require('node-spotify-api');

            var spotify = new Spotify({
                id: keys.spotify.spotifyApi,
                secret: keys.spotify.spotifyApiSecret
            });

            spotify.search({ type: 'track', query: song }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log('\n')
                console.log('Name of Song: ' + song);
                console.log('Artist Name: ' + data.tracks.items[0].artists[0].name);
                console.log('Album Name: ' + data.tracks.items[0].album.name);
                console.log('Song Link: ' + data.tracks.items[0].artists[0].href);
                console.log('\n')

            });
        })

}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++ OMDB +++++++++++++++++++++++++++++++


var request = require('request');

function runMovie() {
    inquirer
        .prompt([

            {
                type: "input",
                name: "movieName",
                message: "Which movie?"
            }
        ]).then(function (userInput) {
            var urlHit =
                "http://www.omdbapi.com/?t=" + userInput.movieName + "&y=&plot=full&tomatoes=true&apikey=" + keys.omdb.omdbApi;

            var movieName = userInput.movieName;

            if (movieName === '' || !movieName) {
                movieName = "Mr. Nobody";
            }

            request(urlHit, function (error, response, body) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
                var newBody = JSON.parse(body)

                console.log('\n')
                console.log("Title: " + newBody.Title + '\n');
                console.log("Release Date: " + newBody.Released + '\n');
                console.log('IMDB Rating: ' + newBody.imdbRating + '\n');
                console.log('Rotten Tomatoes Rating: ' + newBody.Ratings[1].Value + '\n');
                console.log('Country of Production: ' + newBody.Country + '\n');
                console.log('Plot: ' + newBody.Plot + '\n');
                console.log('Actors: ' + newBody.Actors + '\n');

            });
        })
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
