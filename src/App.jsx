
import { useContext, useState, useEffect } from 'react';
import {Routes, Route} from 'react-router';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import { UserContext } from './contexts/UserContext';
import GameList from './components/GameList/GameList';
import * as gameService from './services/gameService';
import GameDetails from './components/GameDetails/GameDetails';


const App = () => {
  const { user } = useContext(UserContext);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchAllGames = async () => {
      const gamesData = await gameService.index();
      setGames(gamesData);
    };
    if (user) fetchAllGames();
  }, [user]);


  
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
            <Route path='/games/new' element={<h1>New Game</h1>} />
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

