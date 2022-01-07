import Head from "next/head";
import Link from "next/link";
import styles from "./main-header.module.css";

const Layout = () => {
  return (
    <header className={styles.header}>
      <Head>
        <title>Calendar Events</title>
      </Head>
      <div className={styles.logo}>
        <Link href="/">NEXTevents</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/events"> All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Layout;
