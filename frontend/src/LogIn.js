import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { server_log_in_url } from './flaskServerURLs';
import './styles/LogIn.css'

const LogIn = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleClick = () => (e) => {
        e.preventDefault();
        setIsPending(true)
        const loginDetails = { username, password }
        fetch(server_log_in_url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginDetails)
        })
            .then((response) => {
     
                if (response.status === 408) {
                    throw Error('Wrong username');
                }
                else if (response.status === 409) {
                    throw Error('Wrong password');
                }
                else if (!response.ok) {
                    throw Error('could not fetch the data');
                }
                return response.json();
            })
            .then((data) => {
                onLogin(data)
                setSuccess(true);
                setIsPending(false)
            })
            .catch(err => {
                setErrMsg(err.message)
            })
    }
    return(
        <div className="login-container">
            <h2>Login</h2>
            <form >
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        required
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleClick()} type="submit">Login</button>
            </form>

            <div className="pending and errors">
                {isPending && !errMsg && <div>Loading...</div>}
                <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                {success ? <Redirect to="/" /> : null}
            </div>
            <div className="links">
                <p>
                    <Link to="/sign-up">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LogIn;
