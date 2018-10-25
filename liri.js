require("dotenv").config();

var keys = require("./key");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

spotify
  .request('https://api.spotify.com/v1')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
   
//   spotify
//     .search({ type: 'hello', query: 'All the Small Things' })
//     .then(function(response) {
//       console.log(response);
//     })
//     .catch(function(err) {
//       console.log(err);
//     });

 
// spotify.search({ type: 'blink 182', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });