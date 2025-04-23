export default function handler(req, res) {
    const data = require('../../../data.json');
    
    const directorsWithMovies = data.directors.map(director => {
      const movies = data.movies.filter(movie => movie.directorId === director.id);
      return {
        ...director,
        movies
      };
    });
  
    res.status(200).json(directorsWithMovies);
  }