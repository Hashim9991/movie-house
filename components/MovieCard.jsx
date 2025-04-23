import Link from 'next/link';
import styles from '../styles/MovieCard.module.css';

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movies/${movie.id}`} className={styles.card}>
      <img 
        src={movie.image || '/images/placeholder.jpg'} 
        alt={movie.title}
        className={styles.poster}
      />
      <div className={styles.info}>
        <h3>{movie.title}</h3>
        <p>⭐ {movie.rating}</p>
      </div>
    </Link>
  );
}