# Liri - The Node.js Application!
### Short Video Presentation
- https://drive.google.com/file/d/1k5uhH-XykfK9HlcrbRCW-fvxW9Vu8p43/view

### Requirements

- Make a Node.js app which outputs information depending on user input from the command line.
- Integrate BandsInTown, Spotify, and OMDb APIs via the appropriate NPM modules.
- Use API calls and parse through returned JSON objects, outputting them in a specified format. 
- Read commands and queries from random.txt file

### Bonus
- Log queries searched into log.txt file

### Technologies Used

- Node.js
- JavaScript
- Bands in Town API (via Bands in Town npm module)
- Spotify API (via spotify npm module)
- OMDb API (via request npm module)

### Code Explanation

- Authentication keys for Spotify are stored in env file which is stored in our .gitignore. The stored keys are called from our "key.js" file and exported to our "liri.js" file.

- What our app does depends on what the user types, and there are 5 main functions: 
   * spotify-this-song : To search a song through Spotify API using song name. 
   * concert-this : To search the next concert date through Bands In Town API using artist name.
   * movie-this : To look up a movie, series, or episode information through OMDB API using the title of show.
   * do-what-it-says : To read the command and queries from our random.txt file.
   * To log all of the songs, shows, and artists searched for using Liri.
   
- From Spotify Liri will inform us of the **Artist(s), Song Name, Album Name, and a Preview Link.**

- From Bands In Town Liri will inform us of the **Concert Venue, Location, and Date** of the next scheduled concert.

- From OMDB Liri will inform us of the **Title, Year, OMDB Rating, Rotten Tomatoes Rating, Actors, Language, Country, and Plot** of what is searched. 
- The program also reads from a file called "random.txt" and executes the command and query found there using string and array methods
Appropriate comments and error-checking has been added.
