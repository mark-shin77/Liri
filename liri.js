// API Key & call for spotify
require("dotenv").config();
var keys = require("./key");
var Spotify = require('node-spotify-api');
// API call for omdb/bands in town
var request = require("request");
// API call for moment.js
var moment = require('moment');


var spotify = new Spotify(keys.spotify);
var input = process.argv[2];
var search = process.argv[3];

switch(input){
  case "spotify-this-song":
    spotify.search({ type: 'track', query: search, limit: 1  }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      if (search === ""){
        search = "The Sign";
      }
        console.log(JSON.stringify("Artist Name: " + data.tracks.items[0].album.artists[0].name)); 
    console.log(JSON.stringify("Song Name: " + data.tracks.items[0].name)); 
    console.log(JSON.stringify("Album Name: " + data.tracks.items[0].album.name)); 
    console.log(JSON.stringify("Song Preview: " + data.tracks.items[0].preview_url)); 
    });
  break;
  case "concert-this":
    var url = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
    request(url, function(err, response, body){
      if(err){
        return console.log(err)
      }
      console.log("Venue: " + JSON.parse(body)[0].venue.name);
      console.log("Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region);
      console.log("Date: " + moment(JSON.parse(body)[0].datetime).format('MMMM Do YYYY, h:mm a'));
    })
  break;
  case "movie-this": 
    var url = 'http://www.omdbapi.com/?t=' + search +'&apikey=trilogy&y=&plot=long&tomatoes=true&r=json';
    request(url, function(err, response ,body){
      if(err){
        return console.log(err)
      }
      console.log("Title: " + JSON.parse(body)["Title"]);
      console.log("Year: " + JSON.parse(body)["Year"]);
      console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
      console.log("Country: " + JSON.parse(body)["Country"]);
      console.log("Language: " + JSON.parse(body)["Language"]);
      console.log("Plot: " + JSON.parse(body)["Plot"]);
      console.log("Actors: " + JSON.parse(body)["Actors"]);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
      });
}
