import logo from '../../img/logo.png';
import userPhoto from '../../img/user-photo.png';

export const Header = () => {
    return (
        <header className="header">
            <div className="nav">
                <img src={logo} alt="logo" />
                <ul className="nav-list">
                    <li className="nav-item"><a href="#">Who are we</a></li>
                    <li className="nav-item"><a href="#">Contacts</a></li>
                    <li className="nav-item"><a href="#">Menu</a></li>
                </ul>
            </div>
            <div className="sign-in">
                <button className="sign-in-btn">Sign Up</button>
                <img src={userPhoto} alt="user" />
            </div>
        </header>
    )
}