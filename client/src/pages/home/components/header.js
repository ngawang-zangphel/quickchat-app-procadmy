import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ socket }) {
    
    const { user } = useSelector(state => state.usersReducer);

    const navigate = useNavigate();

    function getFullName() {
        let fname = user?.firstname.toUpperCase();
        let lname = user?.lastname.toUpperCase();
        return fname + ' ' + lname;
    }

    function getInitials() {
        let f = user?.firstname.toUpperCase()?.[0];
        let l = user?.lastname.toUpperCase()?.[0];
        return f + ' ' + l;
    }

    const logout = () => {
        localStorage.removeItem('token');
        socket.emit('user-offline', user?._id);
        navigate('/login');
    }

    return (
        <div className="app-header">
            <div className="app-logo">
                <i className="fa fa-comments" aria-label="true"></i>
                Quick Chat
            </div>
            <div className="app-user-profile">
                {
                    user?.profilePic && <img 
                        src={user?.profilePic}
                        alt="profile-pic"
                        onClick={() => navigate('./profile') }
                        className="logged-user-profile-pic"
                    />
                }
                {
                    !user?.profilePic && <div className="logged-user-profile-pic"
                    onClick={() => navigate('./profile') }
                    >{ getInitials() }</div>
                }
                <div className="logged-user-name">{ getFullName() }</div>
                <button className="logout-button"
                    onClick={logout}
                >
                    <i className="fa fa-power-off"></i>
                </button>
            </div>
        </div>
    )
};

export default Header;