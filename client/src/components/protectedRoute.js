import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../apiCalls/users";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";

function ProtectedRoute({children}) {

    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const getLoggedInUser = async () => {
        try {
            dispatch(showLoader());
            const response = await getLoggedUser();
            dispatch(hideLoader());
            
            if (response.success) {
                setUser(response?.user);
            } else {
                navigate('./login');
            }
        } catch(error) {
            dispatch(hideLoader());
            navigate('./login');
        }
    };

    //Each time our app is refreshed, check if there is authentication token stored in the localstorage.
    useEffect(() => {
        //If no authentication stored in localStorage, then simply navigate user to loginPage. 
        // if found then write logic to fetch current user details
        if (localStorage.getItem('token')) {
            //write logic to get the details of current user
            getLoggedInUser();
        } else {
            navigate('/login');
        }
    }, []);

    // If not navigating then this children where in this case "home" component will be rendered
    return (<div>
        <p> Name: { user?.firstname + ' ' + user?.lastname }</p>
        <p>Email: { user?.email }</p>
        <br/>
        <br/>
        { children }
    </div>);
}

export default ProtectedRoute;