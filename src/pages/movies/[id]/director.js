import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../../styles/DirectorDetails.module.css';

export default function DirectorDetails({ director, movies }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{director.name}</h1>
      <p className={styles.biography}>{director.biography}</p>
      
      <h2>Movies Directed</h2>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      
      <Link href={`/movies/${router.query.id}`} className={styles.backLink}>
        ← Back to Movie
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
    fallback: true,
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
  const movies = data.movies.filter((m) => m.directorId === director.id);

  return {
    props: {
      director,
      movies,
    },
    revalidate: 60,
  };
}