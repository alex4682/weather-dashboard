import "./Header.scss";
export const UnLogIn = ({isActive=false,setIsActive, setUsername}) => {
const handleClose = () => {
        try { if (setIsActive) setIsActive(false); } catch {}
    };
    return (
        <div className={`modal-backdrop ${isActive ? 'active' : ''}`}  onClick={handleClose}>
            <div className="modal-unlogin" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Are you sure you want to unlog in?</h2>
                <div className="unlogin-modal-form-wrap">
                    <button className="modal-btn-yes" onClick={()=>{
                        localStorage.removeItem('registeredUser');
                        window.location.reload();
                        setUsername('');
                    }}>Yes</button>
                    <button className="modal-btn-no" onClick={()=>{
                        setIsActive(false);
                    }}>No</button>
                </div>
            </div>
        </div>
    )
}