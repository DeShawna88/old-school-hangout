
import { useContext } from 'react';
import { Link } from "react-router";
import { UserContext } from '../../contexts/UserContext';
import styles from './NavBar.module.css';


const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
  };

  return (
    <nav className={styles.container}>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/games'>GAMES</Link></li>
          <li><Link to='/games/new'>NEW GAME</Link></li>
          <li><Link to='/' onClick={handleSignOut} >SIGN OUT</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/sign-in'>SIGN IN</Link></li>
          <li><Link to="/sign-up">SIGN UP</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
