
import { useContext, useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import { UserContext } from './contexts/UserContext';
import GameList from './components/GameList/GameList';
import * as gameService from './services/gameService';
import GameDetails from './components/GameDetails/GameDetails';
import GameForm from './components/GameForm/GameForm';


const App = () => {
  const { user } = useContext(UserContext);
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllGames = async () => {
      const gamesData = await gameService.index();
      setGames(gamesData);
    };
    if (user) fetchAllGames();
  }, [user]);

  const handleAddGame= async (gameFormData) => {
    const newGame = await gameService.create(gameFormData);
    setGames([newGame, ...games]);
    navigate('/games');
  };

const handleDeleteGame = async (gameId) => {
    const deletedGame = await gameService.deleteGame(gameId);
    setGames(games.filter((game) => game._id !== deletedGame._id));
    navigate('/games');
  };

  const handleUpdateGame = async (gameId, gameFormData) => {
    const updatedGame = await gameService.update(gameId, gameFormData);
    setGames(games.map((game) => (gameId === game._id ? updatedGame : game)));
    navigate(`/games/${gameId}`);
  };

  const handleDeleteReview = async (gameId, reviewId) => {
    const deletedReview = await gameService.deleteReview(gameId, reviewId);
    setReviews(reviews.filter((review) => review._id !== deletedReview._id));
    navigate(`/games/${gameId}`);
  };

  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing /> } />
        {user ? (
          <>
          <Route path='/games' element={<GameList games={games} />} />
          <Route 
              path='/games/:gameId'
              element={<GameDetails />}
            />
            <Route path='/games/new' element={<GameForm handleAddGame={handleAddGame} />} />
          </>
          ) : (
        <>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        </>
          )}
      </Routes>
    </>
  );
};

export default App;

