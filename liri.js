// Key & Call for spotify
require("dotenv").config();
var keys = require("./key");
var Spotify = require('node-spotify-api');
// Call for omdb/bands in town
var request = require("request");
// Call for moment.js
var moment = require('moment');
// Call for Filesystem
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
// User input
var input = process.argv[2];
var search = process.argv[3];
search == undefined ? search == "undefined" : search.toString().trim();

function liri (){
  switch(input){
    case "spotify-this-song":
      songSearch();
      keepTrack();
    break;
    case "concert-this":
      concertSearch();
      keepTrack();
    break;
    case "movie-this":
      movieSearch();
      keepTrack();
    break;
    case "do-what-it-says":
      textfile();
      keepTrack();
    break;
  }
}

// Spotify Call Back
function songSearch (){
  // Search for The Sign if no song is entered
  var search = process.argv[3];
  if (search == undefined){
    var search = "The Sign";
  }
  // Calling for a song by track name
  spotify.search({ type: 'track', query: search, limit: 1  }, function(err, data) {
    // Logging Error if something goes wrong
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // Logging Artist, Song, Album, & A Song Preview
    console.log(JSON.stringify("Artist Name: " + data.tracks.items[0].album.artists[0].name)); 
    console.log(JSON.stringify("Song Name: " + data.tracks.items[0].name)); 
    console.log(JSON.stringify("Album Name: " + data.tracks.items[0].album.name)); 
    console.log(JSON.stringify("Song Preview: " + data.tracks.items[0].preview_url)); 
  });
};

// Bands In Town Call Back
function concertSearch (){
  // If an Artist is not entered, Tell user to enter an Arist
  if(search === undefined){
    return console.log("Please Enter an Artist!")
  }
  // Calling for Closest Concert Date
  var url = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
  request(url, function(err, response, body){
    // Logging Error if something goes wrong
    if(err){
      return console.log(err)
    }
    // Logging Venue, Location, & Date
    console.log("Venue: " + JSON.parse(body)[0].venue.name);
    console.log("Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region);
    console.log("Date: " + moment(JSON.parse(body)[0].datetime).format('MMMM Do YYYY, h:mm a'));
  })
};

// OMDB Call Back
function movieSearch (){
  // Search for Mr. Nobody if no movie is entered
  var search = process.argv[3];
  if (search === undefined){
    var search = "Mr. Nobody";
  }
  // Calling for movie || tv series || episode by Title
  var url = 'http://www.omdbapi.com/?t=' + search +'&apikey=trilogy&y=&plot=long&tomatoes=true&r=json';
  request(url, function(err, response, body){
    // Logging error if something goes wrong
    if(err){
      return console.log(err)
    }
    // Logging Show/Movie Title, Year, IMDB Rating, RT Rating, Actors, Language, Country, & Plot
    console.log("Title: " + JSON.parse(body)["Title"]);
    console.log("Year: " + JSON.parse(body)["Year"]);
    console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
    console.log("Actors: " + JSON.parse(body)["Actors"]);
    console.log("Language: " + JSON.parse(body)["Language"]);
    console.log("Country: " + JSON.parse(body)["Country"]);
    console.log("Plot: " + JSON.parse(body)["Plot"]);
    });
};

// Text File Call Back
function textfile (){
  fs.readFile("random.txt", "utf8", function(err, data){
    // Logging Error if something goes wrong
    if (err){
      return console.log(err);
    }
    // Making Text File Into an Array 
    var dataArr = data.split(",");
    input = dataArr[0];
    process.argv[3] = dataArr[1];

    // Running arguements through the switch
    liri();
  });
};

// Bonus Logging info to log.txt
function keepTrack (){
  if (search == undefined || search == "undefined"){
    return console.log("No search term has been entered!")
    process.exit();
  }
  else{
    fs.appendFile("log.txt", search + ',', function(err, data){
      
      if (err){
        return console.log(err);
      }
      else {
        console.log("=======================");
        console.log("Search has been logged!");
        console.log("=======================");
      }
    })
  };
  fs.readFile("log.txt", "utf8", function(err, data){
    // Logging Error if something goes wrong
    if (err){
      return console.log(err);
    }
    // Making Text File Into an Array 
    var dataArr = data.split(',');
    console.log(dataArr);
  });
};

liri();
