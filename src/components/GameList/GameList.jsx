// src/components/GameList/GameList.jsx
import { Link } from 'react-router';
import { useParams } from 'react-router';
import styles from './GameList.module.css';

const GameList = (props) => {
  return (
    <main className={styles.container}>
      {props.games.map((game) => (
        <Link key={game._id} to={`/games/${game._id}`}>
          <article>
            <header>
              <h2>{game.title}</h2>
              <img src={game.image} alt={game.title} />
              <p>
                {`${game.author?.username || "Unknown Author"} posted on
                ${new Date(game.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{game.comment}</p>
          </article>
        </Link>
      ))}
    </main>
  );

};

export default GameList;
