import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    
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

    return (
        <div className="app-header">
            <div className="app-logo">
                <i className="fa fa-comments" aria-label="true"></i>
                Quick Chat
            </div>
            <div className="app-user-profile">
                <div className="logged-user-name">{ getFullName() }</div>
                <div className="logged-user-profile-pic"
                    onClick={() => navigate('./profile') }
                >{ getInitials() }</div>
            </div>
        </div>
    )
};

export default Header;