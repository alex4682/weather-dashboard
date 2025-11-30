import logo from '../../img/logo.png';
import userPhoto from '../../img/user-photo.png';
import './Header.scss';
import { SignInModal } from "./Modal.jsx";
import { UnLogIn } from './UnLogIn.jsx';
import { useState, useEffect } from "react";

export const Header = ({isLoggined, setIsLoggined}) => {
    const api = "https://6922ebe409df4a492323b3f6.mockapi.io/weather/users";
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [unloginactive, setUnloginactive] = useState(false);
    useEffect(() => {
        try {
            const registeredUser = localStorage.getItem('registeredUser');
            if (registeredUser) {
                const user = JSON.parse(registeredUser);
                setUsername(user || '');
                setIsLoggined(true);
            }
        } catch {}
    }, []);

    return (
        <header className="header container">
            <div className="nav">
                <img src={logo} alt="logo" />
                <ul className="nav-list">
                    <li className="nav-item"><a href="#">Who are we</a></li>
                    <li className="nav-item"><a href="#">Contacts</a></li>
                    <li className="nav-item"><a href="#">Menu</a></li>
                </ul>
            </div>
            <div className="sign-in">
                {isLoggined ? <> <button className='sign-in-btn' onClick={()=>{setUnloginactive(true)}}>Unlog in</button> <p className='username'>{username}</p></> :
                    <button className="sign-in-btn" onClick={() => setIsActive(true)}>Sign Up</button>
                }
                <img src={userPhoto} alt="User profile" />
            </div>
            <SignInModal isActive={isActive} isLoggined={isLoggined} setIsActive={setIsActive} setIsLoggined={setIsLoggined} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} />
            <UnLogIn isActive={unloginactive} setIsActive={setUnloginactive} setUsername={setUsername}/>
        </header>
    )
}