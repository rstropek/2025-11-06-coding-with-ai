import styles from './Card.module.css';

interface CardProps {
  title: string;
  category: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Card({ title, category, description, imageSrc, imageAlt }: CardProps) {
  return (
    <div className={styles.card}>
      {imageSrc && (
        <div className={styles.imageContainer}>
          <img src={imageSrc} alt={imageAlt || title} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button className={styles.primaryButton}>Mehr erfahren</button>
          <div className={styles.secondaryActions}>
            <a href="#" className={styles.link}>Shop</a>
            <a href="#" className={styles.link}>Downloads</a>
          </div>
        </div>
      </div>
    </div>
  );
}
