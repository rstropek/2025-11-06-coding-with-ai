import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Card from '@/components/Card';
import styles from './page.module.css';

export default function Home() {
  const breadcrumbItems = [
    { label: 'Startseite', href: '/' },
    { label: 'Schalung', href: '/schalung' },
    { label: 'Systemkomponenten Schalung' },
  ];

  return (
    <div className={styles.page}>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Schalungen</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum 
            orci id ultricies tempor. Integer auctor quam ut tellus dapibus viverra. 
            Phasellus quis orci sed ipsum sodales aliquam sed nec nibh. Ut odio tellus, 
            pharetra eu tincidunt sit amet, maximus eu odio. Proin id mollis turpis. 
            Duis iaculis faucibus elit ac hendrerit. Nunc at leo mattis, tempus sapien vel, 
            gravida enim. Sed sit amet neque condimentum nibh mattis porttitor vel ut lectus. 
            Integer sagittis, arcu in auctor gravida, neque nibh commodo lorem, non tincidunt 
            dui dolor in magna. Donec vitae odio tempor, blandit magna id, pretium felis.
          </p>
        </section>

        <section className={styles.searchSection}>
          <h2>Platzhalter für Suchfunktion</h2>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Name des Produktes/Service (z.B. Framax Xlife)"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>Suchen</button>
          </div>
        </section>

        <section className={styles.results}>
          <div className={styles.cardGrid}>
            <Card
              title="Dreischichtplatten"
              category="Systemkomponenten"
              description="Doka-Dreischichtplatten bieten ein hervorragendes Preis-Leistungs-Verhältnis bei besonders konstanter Anwendung."
            />
            <Card
              title="Mehrschichtplatten"
              category="Systemkomponenten"
              description="Doka-Mehrschichtplatten finden in zahlreichen Doka-Schalungssystemen Anwendung."
            />
            <Card
              title="Verbundplatten"
              category="Systemkomponenten"
              description="Unsere hochwertigen Verbundplatten sind speziell für die Anwendung in Doka-Schalungssystemen konzipiert."
            />
          </div>
        </section>
      </main>
    </div>
  );
}
