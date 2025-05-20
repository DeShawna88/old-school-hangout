import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as gameService from '../../services/gameService';
import ReviewForm from '../ReviewForm/ReviewForm';
import { UserContext } from '../../contexts/UserContext';
// import styles from './GameDetails.module.css';


const GameDetails = (props) => {
  const { gameId } = useParams();
  const { user } = useContext(UserContext);
  // console.log('gameId', gameId);
  const [game, setGame] = useState('');
  


  useEffect(() => {
    const fetchGame = async () => {
      const gameData = await gameService.show(gameId);
      setGame(gameData);
    };
    fetchGame();
  }, [gameId]);

  // Verify the game state is set correctly:
  console.log('game state:', game);

  const handleAddReview = async (reviewFormData) => {
    const newReview = await gameService.createReview(gameId, reviewFormData);
    setGame(prevGame => ({
      ...prevGame,
      reviews: [...prevGame.reviews, newReview],
    }));
  };

  const handleDeleteReview = async (gameId, reviewId) => {
    const deletedReview = await gameService.deleteReview(gameId, reviewId);
    setGame(prevGame => ({
      ...prevGame,
      reviews: prevGame.reviews.filter((review) => review._id !== reviewId),
    }));
  };

  
  if (!game) return <main>Loading...</main>;
  return (
    <main>
      <section>
        <header>
          <p>{game.genres.toUpperCase()}</p>
          <h1>{game.title}</h1>
          <img src={game.image} alt={game.title} />
          <div>
          <p>
            {`${game.author.username} posted on
            ${new Date(game.createdAt).toLocaleDateString()}`}
          </p>
          {game.author._id === user._id && (
            <>
              <Link to={`/games/${gameId}/edit`}>Edit</Link>
              <button onClick={() => props.handleDeleteGame(gameId)}>
                Delete
              </button>
            </>
          )}
          </div>
        </header>
        <p>{game.comment}</p>
      </section>
      <section>
        <h2>Reviews</h2>
        <ReviewForm handleAddReview={handleAddReview} />
        {!game.reviews.length && <p>There are no reviews.</p>}

        {game.reviews.map((review) => (
          <article key={review._id}>
            <header>
              <div>
              <p>
                {`${review.author.username} posted on
                ${new Date(review.createdAt).toLocaleDateString()}`}
              </p>
              {game.author._id === user._id && (
                <><Link to={`/games/${gameId}/reviews/${review._id}/edit`}>Edit</Link>
                  <button onClick={() => handleDeleteReview(game._id, review._id)}>Delete</button>
                </>
              )}
              </div>
            </header>
            <p>{review.comment}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default GameDetails;