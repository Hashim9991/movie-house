export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  export function filterMovies(movies, genreId) {
    return genreId === 'all' 
      ? movies 
      : movies.filter(movie => movie.genreId === genreId);
  }