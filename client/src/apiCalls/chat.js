import { axiosInstance } from "./index";

export const getAllChats = async () => {
    try {
       const response = await axiosInstance.get('api/chat/get-all-chats');
       
       return response.data;

    } catch(error) {
        return error;
    }
}

//Members: array that will store the userID of the currenly loggedIn user 
// and the one that currently loggedIN user is going to start the chat
export const createNewChat = async ( members ) => {
    try {
       const response = await axiosInstance.post('api/chat/create-new-chat', 
            {
                members
            }
       );
       return response.data;

    } catch(error) {
        return error;
    }
}