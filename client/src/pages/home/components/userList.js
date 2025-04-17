import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { createNewChat } from "../../../apiCalls/chat";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../../../redux/userSlice";
import moment from "moment";
import store from '../../../redux/store';

function UserList({ searchKey, socket }) {
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

    const isLastMessageTimeStamp = (userId) => {
        const chat = allChats.find(chat => chat.members.map(m => m._id).includes(userId));
        if (!chat || !chat?.lastMessage) {
            return "";
        } else {
            return moment(chat?.lastMessage?.createdAt).format('hh:mm A');
        }
    }

    const getLastMessage = ( userId ) => {
        const chat = allChats.find(chat => chat.members.map(m => m._id).includes(userId));
        if (!chat || !chat?.lastMessage) {
            return "";
        } else {
            const msgPrefix = chat?.lastMessage?.sender === currentUser._id ? "You: " : "";
            return msgPrefix + chat?.lastMessage?.text?.substring(0, 25);
        }
    } 

    function formatName(user) {
        let fname = user?.firstname.at(0).toUpperCase() + user?.firstname.slice(1).toLowerCase();
        let lname = user?.lastname.at(0).toUpperCase() + user?.lastname.slice(1).toLowerCase();
        return fname + ' ' + lname;
    }

    const getUnreadMessageCount = (userId) => {
        const chat = allChats.find(chat =>  chat.members.map(m => m._id).includes(userId) );
        if (chat && chat.unreadMessageCount && chat.lastMessage.sender !== currentUser._id) {
            return <div className='unread-message-counter'> {chat.unreadMessageCount} </div>;

        } else {
            return "";
        }
    }

    function getData() {
        if (searchKey === "") {
            return allChats;
        } else {
            return allUsers.filter(user => {
                return user.firstname.toLowerCase().includes(searchKey.toLowerCase()) || 
                user.lastname.toLowerCase().includes(searchKey.toLowerCase());
            })
        }
    }

    //Load once only
    useEffect(() => {
        socket.off('receive-message').on('receive-message', (message) => {
            console.log('hit', message)
            const selectedChat = store.getState().usersReducer.selectedChat;
            let allChats = store.getState().usersReducer.allChats;

            //If selectedChatId is not equal to the received chat data
            if (selectedChat?._id !== message?.chatId) {
                //update the allChats array with the new message
                const updatedChats = allChats.map(chat => {
                    if (chat?._id === message.chatId) {
                        return {
                            ...chat,
                            unreadMessageCount: (chat?.unreadMessageCount || 0) + 1,
                            lastMessage: message
                        }
                    };
                    return chat;
                });
                allChats = updatedChats;
            }

            //1. FIND THE LASTEST CHAT
            const latestChat = allChats.find(chat => chat._id === message.chatId);

            //2. GET ALL OTHER CHATS
            const otherChats = allChats.filter(chat => chat._id !== message.chatId);

            //3. CREATE A NEW ARRAY LATEST CHAT ON TOP AND THEN OTHER CHATS
            allChats = [latestChat, ...otherChats];

            dispatch(setAllChats(allChats));
        });
    }, []);

    return (
        getData()?.map(obj => {
            let user = obj;
            //if it contains members array means it is of chat object else it is users object
            if (obj.members) {
                user = obj.members.find(mem => mem._id !== currentUser?._id);
            };
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
                                    { formatName(user) }
                                </div>
                                <div className='user-display-email'>{getLastMessage(user._id) || user.email }
                                </div>
                            </div>
                            <div>
                                { getUnreadMessageCount(user._id) }
                                <div className='last-message-timestamp'>
                                    { isLastMessageTimeStamp(user._id) }
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