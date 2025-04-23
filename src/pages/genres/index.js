import Link from 'next/link';
import styles from '../../styles/Genres.module.css';

export default function GenresPage({ genres }) {
  return (
    <div className={styles.container}>
      <h1>Browse Genres</h1>
      <div className={styles.genreGrid}>
        {genres.map((genre) => (
          <Link key={genre.id} href={`/genres/${genre.id}`}>
            <div className={styles.genreCard}>
              <h2>{genre.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = require('../../data.json');
  return {
    props: {
      genres: data.genres,
    },
  };
}