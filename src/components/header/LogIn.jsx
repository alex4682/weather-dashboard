import './Header.scss'
import { useState } from "react";
export const LogIn = ({ isActive = false, setIsActive }) => {
    const api = "https://6922ebe409df4a492323b3f6.mockapi.io/weather/users";
    const [emailQ, setEmailQ] = useState('');
    const [passwordQ, setPasswordQ] = useState('');
    const [error, setError] = useState('');
    const handleClose = () => {
        try { if (setIsActive) setIsActive(false); } catch { }
        document.querySelector(".modal-backdrop").classList.add("active")
    };
    return (
        <div className={`modal-backdrop ${isActive ? 'active' : ''}`} onClick={handleClose}>
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Log in</h2>
                <form action="" className='login-form' onSubmit={(e) => {
                    e.preventDefault();
                    fetch(api).then(res =>{
                        if (!res.ok) throw new Error('Failed to load users');
                        return res.json();
                    }).then(users =>{
                        const email = String(emailQ).trim();
                        const password = String(passwordQ);
                        const exists = users.find(u => String(u.email).toLowerCase() === email.toLowerCase() && String(u.password) === password);
                        if (exists) {
                            localStorage.setItem('registeredUser', JSON.stringify(exists.username));
                            handleClose();
                            window.location.reload();
                        } else {
                            setError('User with this email don`t exist or password is incorrect');
                        }
                    })
                }}>
                    <div className="modal-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required onChange={(e) => { setEmailQ(e.target.value) }} />
                    </div>
                    <div className="modal-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required onChange={(e) => { setPasswordQ(e.target.value) }} />
                    </div>
                    <button type="submit" className=''>Log In</button>
                </form>
            </div>

        </div>
    );
}