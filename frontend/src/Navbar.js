import './styles/Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Flight Search Website</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/log-in" style={{ 
          color: 'white', 
          backgroundColor: '#0056b3',
          borderRadius: '8px' 
        }}>Log-in</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;