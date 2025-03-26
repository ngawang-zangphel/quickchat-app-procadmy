import { useDispatch, useSelector } from "react-redux";
import { createNewMessage } from "../../../apiCalls/message";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";

function ChatArea() {

    const dispatch = useDispatch();
    const { selectedChat, user } = useSelector(state => state.usersReducer);
    const selectedUser = selectedChat.members.find(u => u._id !== user._id);
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        try {
            const newMessage = {
                chatId: selectedChat._id,
                sender: user._id,
                text: message
            };
            dispatch(showLoader());
            const response  = await createNewMessage(newMessage);
            dispatch(hideLoader());
            if (response.success) {
                setMessage('');
            }
        } catch (error) {
            dispatch(hideLoader());
            toast.error(error.message);
        }
    }

    return <> {selectedChat && 
        <div className="app-chat-area">
            <div className="app-chat-area-header">
                { selectedUser.firstname + ' ' + selectedUser.lastname }
            </div>
            <div className="main-chat-area">
                CHAT AREA
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