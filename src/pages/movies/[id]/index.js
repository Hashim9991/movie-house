import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../../styles/MovieDetails.module.css';

export default function MovieDetails({ movie, director, genre }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{movie.title}</h1>
      <p className={styles.description}>{movie.description}</p>
      <div className={styles.details}>
        <p><strong>Release Year:</strong> {movie.releaseYear}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Genre:</strong> {genre.name}</p>
        <p>
          <strong>Director:</strong> 
          <Link href={`/movies/${movie.id}/director`}>
            {director.name}
          </Link>
        </p>
      </div>
      <Link href="/movies" className={styles.backLink}>
        ← Back to Movies
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  const data = require('../../../data.json');
  const paths = data.movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: true, // Enable on-demand generation for new movies
  };
}

export async function getStaticProps({ params }) {
  const data = require('../../../data.json');
  const movie = data.movies.find((m) => m.id === params.id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  const director = data.directors.find((d) => d.id === movie.directorId);
  const genre = data.genres.find((g) => g.id === movie.genreId);

  return {
    props: {
      movie,
      director,
      genre,
    },
    revalidate: 60, // ISR: regenerate every 60 seconds if needed
  };
}