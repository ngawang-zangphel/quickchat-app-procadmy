import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { createNewChat } from "../../../apiCalls/chat";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../../../redux/userSlice";

function UserList({ searchKey }) {

    //In All Chats, you get all the chats of that current user.
    //user state: provide alias name
    const { allUsers, allChats, user: currentUser, selectedChat } = useSelector(state => state.usersReducer);

    const dispatch = useDispatch();

    const startNewChat = async (searchedUserId) => {
        try {
            dispatch(showLoader());
            const response = await createNewChat([currentUser._id, searchedUserId]);
            dispatch(hideLoader());

            if (response.success) {
                toast.success(response.message);
                const newChat = response.data;
                const updatedChat = [...allChats, newChat];
                dispatch(setAllChats(updatedChat));
                dispatch(setSelectedChat(newChat));
            }
        } catch (error) {
            toast.error(error.message);
            dispatch(hideLoader());
        }   
    }

    const openChat = (selectedUserId) => {
        const chat = allChats.find( chat => 
            chat.members.map(member => member._id).includes(currentUser._id) && 
            chat.members.map(member => member._id).includes(selectedUserId)
        );
        if (chat) {
            dispatch(setSelectedChat(chat));
        }
    }

    const IsSelectedChat = (user) =>  {
        if (selectedChat) {
            return selectedChat.members.map(m => m._id).includes(user._id);
        };
        return false;
    }


    return (
        allUsers
        ?.filter(user => {
            //SearchedUser and User with chat messages
            return (
                (user.firstname.toLowerCase().includes(searchKey.toLowerCase()) || 
                user.lastname.toLowerCase().includes(searchKey.toLowerCase())) && searchKey) || (allChats.some(chat => chat.members.map(member => member._id).includes(user._id))) ;
        })
        ?.map(user => {
            return (
                <div className='user-search-filter' onClick={() => openChat(user._id)} key={user._id}>
                    <div className={IsSelectedChat(user) ? "selected-user" : "filtered-user" }>
                        <div className='filter-user-display'>
                            {user.profilePic && <img src={UserList.profilePic} alt='Profile Pic' class="user-profile-image"></img> }
                        { !user.profilePic && <div className={IsSelectedChat(user) ? "user-selected-avatar" :  'user-default-avatar'}>
                                { 
                                user.firstname.charAt(0).toUpperCase() + 
                                user.lastname.charAt(0).toUpperCase() }
                            </div>}
                            <div className='filter-user-details'>
                                <div className='user-display-name'>
                                    { user.firstname + ' ' + user.lastname }
                                </div>
                                <div className='user-display-email'>{ user.email }
                                </div>
                            </div>
                            {
                                !allChats.find(chat => chat.members.map(member => member._id).includes(user._id)) &&
                                <div className='user-start-chat'>
                                    <button className='user-start-chat-btn'
                                        onClick={() => startNewChat(user._id)}
                                    >Start Chat</button>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            )
        })

    )
}


export default UserList;