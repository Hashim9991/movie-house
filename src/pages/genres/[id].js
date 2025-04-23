import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../../styles/GenreDetails.module.css';

export default function GenreDetails({ genre, movies }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{genre.name} Movies</h1>
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <Link href={`/movies/${movie.id}`}>
              <h2>{movie.title}</h2>
              <p>Rating: {movie.rating}</p>
              <p>Year: {movie.releaseYear}</p>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/genres" className={styles.backLink}>
        ← Back to Genres
      </Link>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const data = require('../../../data.json');
  const genre = data.genres.find((g) => g.id === params.id);

  if (!genre) {
    return {
      notFound: true,
    };
  }

  const movies = data.movies.filter((m) => m.genreId === params.id);

  return {
    props: {
      genre,
      movies,
    },
  };
}