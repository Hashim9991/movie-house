import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import styles from '../styles/Home.module.css';

export default function Home({ trendingMovies }) {
  const router = useRouter();

  const browseGenres = () => {
    router.push('/genres');
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Welcome to Movie House</h1>
        <h2>Trending Movies</h2>
        <div className={styles.movieGrid}>
          {trendingMovies.map((movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <Link href={`/movies/${movie.id}`}>
                <h3>{movie.title}</h3>
                <p>Rating: {movie.rating}</p>
                <p>{movie.releaseYear}</p>
              </Link>
            </div>
          ))}
        </div>
        <button onClick={browseGenres} className={styles.button}>
          Browse Genres
        </button>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = require('../data.json');
  // Get top 3 rated movies as trending
  const trendingMovies = data.movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return {
    props: {
      trendingMovies,
    },
    revalidate: 60, // ISR: regenerate every 60 seconds if needed
  };
}

<div className={styles.container}>
  <main className={styles.main}>
    <h1 className={styles.title}>Welcome to Movie House</h1>
    <h2 className={styles.trendingTitle}>Trending Movies</h2>
    <div className={styles.movieGrid}>
      {trendingMovies.map((movie) => (
        <div key={movie.id} className={styles.movieCard}>
          {/* ... */}
        </div>
      ))}
    </div>
    <button className={styles.button}>Browse Genres</button>
  </main>
</div>