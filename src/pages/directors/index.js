import useSWR from 'swr';
import Link from 'next/link';
import styles from '../../styles/Directors.module.css';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DirectorsPage() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div>Failed to load directors</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>Directors</h1>
      <div className={styles.directorGrid}>
        {data.map((director) => (
          <div key={director.id} className={styles.directorCard}>
            <h2>{director.name}</h2>
            <p>{director.biography}</p>
            <h3>Movies:</h3>
            <ul>
              {director.movies.map((movie) => (
                <li key={movie.id}>
                  <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}