import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css'
import LogIn from './LogIn'
import UserFavoriteList from "./UserFavoriteList"
import SignUp from './SignUp';
import { useState } from "react";

function App() {

  const [userInfo, setUserInfo] = useState();

  const handleLogin = (userData) => {
    setUserInfo(userData.userinfo);
  }

  const handleLogout = () => {
    setUserInfo(null);
  }

  return (
    <Router>
      <div className="App">
        <Navbar userInfo={userInfo} onLogout={handleLogout} />
        <div className="content">
          <Switch>
            <Route exact path="/" render={() => <Home userInfo={userInfo} />} />
            <Route exact path="/log-in" render={() => <LogIn onLogin={handleLogin} />} />
            <Route exact path="/favorites" render={() => <UserFavoriteList userInfo={userInfo} />} />
            <Route exact path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
