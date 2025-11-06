'use client';

import Link from 'next/link';
import NotificationBell from './NotificationBell';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <span>LOGO</span>
          </div>
          <div className={styles.separator}></div>
          <nav className={styles.nav}>
            <Link href="/schalung">Schalung & Gerüst</Link>
            <Link href="/projekte">Projekte</Link>
          </nav>
        </div>
        <div className={styles.rightSection}>
          <NotificationBell />
        </div>
      </div>
    </header>
  );
}
