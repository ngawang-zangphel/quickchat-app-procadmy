import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({children}) {

    const navigate = useNavigate();

    //Each time our app is refreshed, check if there is authentication token stored in the localstorage.

    useEffect(() => {
        //If no authentication stored in localStorage, then simply navigate user to loginPage. 
        // if found then write logic to fetch current user details
        if (localStorage.getItem('token')) {
            //write logic to get the details of current user
        } else {
            navigate('/login');
        }
    });

    // If not navigating then this children where in this case "home" component will be rendered
    return (<div>
        { children }
    </div>);
}

export default ProtectedRoute;