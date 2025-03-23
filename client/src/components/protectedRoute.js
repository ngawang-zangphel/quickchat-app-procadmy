import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, getAllUsers } from "../apiCalls/users";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import { toast } from "react-hot-toast";
import { setAllUsers, setUser } from "../redux/userSlice";

function ProtectedRoute({children}) {

    const { user } = useSelector(state => state.usersReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const getLoggedInUser = async () => {
        try {
            dispatch(showLoader());
            const response = await getLoggedUser();
            dispatch(hideLoader());
            
            if (response.success) {
                dispatch(setUser(response?.user));
            } else {
                toast.error(response.message)
                navigate('./login');
            }
        } catch(error) {
            dispatch(hideLoader());
            navigate('./login');
        }
    };

    const getAllUsersFromDb = async () => {
        try {
            dispatch(showLoader());
            const response = await getAllUsers();
            dispatch(hideLoader());
            
            if (response.success) {
                dispatch(setAllUsers(response?.user));
            } else {
                toast.error(response.message)
                navigate('./login');
            }
        } catch(error) {
            dispatch(hideLoader());
            navigate('./login');
        }
    }

    //Each time our app is refreshed, check if there is authentication token stored in the localstorage.
    useEffect(() => {
        //If no authentication stored in localStorage, then simply navigate user to loginPage. 
        // if found then write logic to fetch current user details
        if (localStorage.getItem('token')) {
            //write logic to get the details of current user
            getLoggedInUser();
            getAllUsersFromDb();
        } else {
            navigate('/login');
        }
    }, []);

    // If not navigating then this children where in this case "home" component will be rendered
    return (<div>
        { children }
    </div>);
}

export default ProtectedRoute;