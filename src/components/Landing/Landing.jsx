// src/components/Landing.jsx
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <main className={styles.container}>
      <h1>Hello, welcome to Old - School Hangout</h1>
      <p>
        <a href="/sign-up" className={styles.link}>Sign up</a>  or 
        <a href="/sign-in" className={styles.link}>Sign in</a> to add games and reviews!
      </p>
    </main>
  );
};

export default Landing;

