import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Movies.module.css';

export default function MoviesPage({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies = selectedGenre === 'all' 
    ? movies 
    : movies.filter(movie => movie.genreId === selectedGenre);

  return (
    <div className={styles.container}>
      <h1>All Movies</h1>
      <div className={styles.filterContainer}>
        <label htmlFor="genre-filter">Filter by Genre:</label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={styles.select}
        >
          <option value="all">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.movieGrid}>
        {filteredMovies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <Link href={`/movies/${movie.id}`}>
              <h2>{movie.title}</h2>
              <p>Rating: {movie.rating}</p>
              <p>Year: {movie.releaseYear}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = require('../../data.json');
  return {
    props: {
      movies: data.movies,
      genres: data.genres,
    },
    revalidate: 60, // ISR: regenerate every 60 seconds if needed
  };
}