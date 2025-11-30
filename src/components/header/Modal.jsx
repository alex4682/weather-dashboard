import "./Header.scss";
import { useState } from "react";
import { LogIn } from "./LogIn.jsx";


export const SignInModal = ({ isActive, isLoggined, setIsLoggined, setIsActive, setUsername, setEmail, setPassword }) => {
    const api = "https://6922ebe409df4a492323b3f6.mockapi.io/weather/users";
    const [emailQ, setEmailQ] = useState('');
    const [passwordQ, setPasswordQ] = useState('');
    const [usernameQ, setUsernameQ] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loginActive, setLoginActive] = useState(false);
    const handleClose = () => {
        try { if (setIsActive) setIsActive(false); } catch { }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = String(emailQ).trim();
        const password = String(passwordQ);
        const username = String(usernameQ).trim();
        setLoading(true);
        try {
            const res = await fetch(api);
            if (!res.ok) throw new Error('Failed to load users');
            const users = await res.json();
            const exists = users.find(u => String(u.email).toLowerCase() === email.toLowerCase());
            if (exists) {
                setError('User with this email already exists');
                return;
            }

            const createRes = await fetch(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username })
            });
            localStorage.setItem('registeredUser', JSON.stringify(username));
            if (!createRes.ok) throw new Error('Failed to create user');
            try { if (setEmail) setEmail(email); } catch { }
            try { if (setPassword) setPassword(password); } catch { }
            try { if (setUsername) setUsername(username); } catch { }
            try { if (setIsLoggined) setIsLoggined(true); } catch { }
            handleClose();
        } catch (err) {
            console.error(err);
            setError(err?.message || 'Sign up failed');
        } finally {
            setLoading(false);
        }
    };

    if (!isActive) return null;

    return (
        <>
            <div className={`modal-backdrop ${isActive ? 'active' : ''}`} onClick={handleClose}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <h2 className="modal-title">Sign up</h2>
                    {error && <div className="modal-error" role="alert">{error}</div>}
                    <form action="" className="modal-form" onSubmit={handleSubmit}>
                        <div className="signin-modal-form-wrap">
                            <label htmlFor="signup-username">Username</label>
                            <input id="signup-username" value={usernameQ} type="text" placeholder="Username" onChange={(e) => setUsernameQ(e.target.value)} required />
                        </div>
                        <div className="signin-modal-form-wrap">
                            <label htmlFor="signup-email">E-mail</label>
                            <input id="signup-email" value={emailQ} type="email" placeholder="E-mail" onChange={(e) => setEmailQ(e.target.value)} required />
                        </div>
                        <div className="signin-modal-form-wrap">
                            <label htmlFor="signup-password">Password</label>
                            <input id="signup-password" value={passwordQ} type="password" placeholder="Password" onChange={(e) => setPasswordQ(e.target.value)} required />
                        </div>
                        <button type="submit" disabled={loading}>{loading ? 'Signing...' : 'Sign Up'}</button>
                    </form>
                    <p className="log-in">Already have an account? <span onClick={() => { 
                        setLoginActive(true);
                        document.querySelector(".modal-backdrop").classList.remove("active")
                    }}>Log in</span></p>
                </div>
            </div>
            <LogIn isActive={loginActive} setIsActive={setLoginActive}/>
        </>
    )
}