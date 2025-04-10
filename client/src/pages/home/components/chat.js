import { useDispatch, useSelector } from "react-redux";
import { createNewMessage, getAllMessages } from "../../../apiCalls/message";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import moment from "moment";
import { clearUnreadMessageCount } from '../../../apiCalls/chat';
import store from './../../../redux/store';

function ChatArea({ socket }) {

    const dispatch = useDispatch();
    const { selectedChat, user, allChats } = useSelector(state => state.usersReducer);
    const selectedUser = selectedChat.members.find(u => u._id !== user._id);
    const [message, setMessage] = useState('');
    const [allMessgaes, setAllMessages] = useState([]);

    const sendMessage = async () => {
        try {
            const newMessage = {
                chatId: selectedChat._id,
                sender: user._id,
                text: message
            };

            //Event Data: data we send here should match the message document in our collection
            socket.emit('send-message', {
                ...newMessage, 
                members: selectedChat.members.map(m => m._id),
                read: false,
                createdAt: moment().format('DD-MM-YYYY hh:mm:ss')
            });

            const response  = await createNewMessage(newMessage);
            if (response.success) {
                setMessage('');
            }

        } catch (error) {
            dispatch(hideLoader());
            toast.error(error.message);
        }
    }

    const getMessages = async () => {
        try {
            dispatch(showLoader());
            const response  = await getAllMessages(selectedChat._id);
            dispatch(hideLoader());

            if (response.success) {
                setAllMessages(response.data);
            }
        } catch (error) {
            dispatch(hideLoader());
            toast.error(error.message);
        }
    }

    const clearUnreadMessages = async () => {
        try {
            dispatch(showLoader());
            const response  = await clearUnreadMessageCount(selectedChat._id);
            dispatch(hideLoader());

            if (response.success) {
                allChats.map(chat => {
                    if (chat._id === selectedChat._id) {
                        return response.data;
                    }
                    return chat;
                });
            }
        } catch (error) {
            dispatch(hideLoader());
            toast.error(error.message);
        }
    }

    const formatTime = (timestamp) => {
        const now = moment();
        //from current time substract moment(timestamp) and result in days
        const diff = now.diff(moment(timestamp), 'days');
        if (diff < 1) {
            return `Today ${moment(timestamp).format(`hh:mm A`)}`;
        } 
        else if (diff === 1) {
            return `Yesterday ${moment(timestamp).format(`hh:mm A`)}`
        } else {
            return `${moment(timestamp).format(`MMM D, hh:mm A`)}`;
        }
    }

    function formatName(user) {
        let fname = user?.firstname.at(0).toUpperCase() + user?.firstname.slice(1).toLowerCase();
        let lname = user?.lastname.at(0).toUpperCase() + user?.lastname.slice(1).toLowerCase();
        return fname + ' ' + lname;
    }

    useEffect(() => {
        getMessages();
        if (selectedChat?.lastMessage?.sender !== user._id) {
            clearUnreadMessages();
        };

        //listen to message
        //off(): Remove any event listener of the same name
        socket.off('receive-message').on('receive-message', (data) => {
            //Set this all if the selectedChat id is equal to received one
            const selectedChat = store.getState().usersReducer.selectedChat;
            if (selectedChat._id === data.chatId) {            
                //Thats why the data structure should match
                setAllMessages(prevmsg => [...prevmsg, data]);
            }
        })
    }, [selectedChat]);

    //Automatically move the scroll to bottom to see latest message
    useEffect(() => {
        const msgContainer = document.getElementById('main-chat-area');
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }, [allMessgaes])

    return <> {selectedChat && 
        <div className="app-chat-area">
            <div className="app-chat-area-header">
                { formatName(selectedUser) }
            </div>
            <div className="main-chat-area" id="main-chat-area">
                {
                    allMessgaes.map(msg => {
                        const isCurrentUserSender = msg.sender === user._id;
                        return <div className="message-container" style={ isCurrentUserSender ? {
                            justifyContent: "end"
                        }: {justifyContent: "start"}}>
                            <div>
                                <div className={isCurrentUserSender ? "send-message" : "received-message"}>
                                    { msg.text }
                                </div>
                                <div className="messafe-timestamp" style={isCurrentUserSender ? 
                                    { float: 'right'}: { float: 'left' }}>
                                    { formatTime(msg.createdAt) } {
                                        isCurrentUserSender && msg.read && 
                                        <i className="fa fa-check-circle" aria-hidden="true" style={{color: '#e74c3c'}} > </i>
                                    }
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="send-message-div">
                    <input 
                        type="text" className="send-message-input" placeholder="Type a message" 
                        value={message}
                        onChange={(event) => {setMessage(event.target.value)}}
                    />
                    <button 
                        className="fa fa-paper-plane send-message-btn" aria-hidden="true"
                        onClick={ sendMessage }
                    ></button>
                
            </div>
        </div>
    }</>;
};

export default ChatArea;