import './styles/Navbar.css'
import { Link } from "react-router-dom";

const Navbar = ({ userInfo, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="headline">Flight Search Website</Link>
      <div className="links">

        {userInfo ? (

          <div className="user-info">
            <Link to="/favorites">Favorites</Link>

            <button onClick={onLogout} style={{
              color: 'white',
              backgroundColor: '#0056b3',
              borderRadius: '8px'
            }}>Logout</button>

          </div>
        ) : (
          <div className="geustInfo">
            <Link to="/log-in" style={{
              color: 'white',
              backgroundColor: '#0056b3',
              borderRadius: '8px'
            }}>Log-in</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;