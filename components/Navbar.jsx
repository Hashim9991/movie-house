import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>Movie House</Link>
      <div className={styles.links}>
        <Link href="/movies">Movies</Link>
        <Link href="/genres">Genres</Link>
        <Link href="/directors">Directors</Link>
      </div>
    </nav>
  );
}