import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title = 'Movie House' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Movie database app" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}