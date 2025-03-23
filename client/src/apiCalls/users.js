import { axiosInstance } from "./index";

export const getLoggedUser = async () => {
    try {
        //This is a protected API which can be only accessed by 
        //loggedIn or authenticated user
        // we need to send token along with this api but not to worry as we are already doing this in our index.js file.
        const response = await axiosInstance.get('/api/user/get-logged-user');
        return response.data;
    } catch (error) {
        return error;
    }
}